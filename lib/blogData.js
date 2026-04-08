export const blogs = [
  {
    slug: 'hybrid-rag-pipeline',
    title: 'Building a Hybrid RAG Pipeline with BM25, pgvector & Cohere Reranking',
    date: 'March 2025',
    tags: ['RAG', 'LLM', 'pgvector', 'Cohere'],
    description:
      'A deep dive into combining sparse and dense retrieval with cross-encoder reranking to build a production-grade RAG system.',
    content: [
      {
        type: 'paragraph',
        text: 'When I started building the retrieval layer for MAiQ — our multi-tenant AI SaaS — I quickly realized that naive vector search alone was not going to cut it. Dense retrieval misses exact keyword matches. Sparse retrieval misses semantic similarity. The answer was a hybrid pipeline that combines both, then uses a cross-encoder reranker to pick the best results.',
      },
      {
        type: 'heading',
        text: 'Why Hybrid Retrieval?',
      },
      {
        type: 'paragraph',
        text: 'Dense retrieval (embeddings + cosine similarity) is great for semantic understanding — "cheap flight" matches "budget airline". But it struggles with exact terms like product codes, acronyms, or proper nouns. BM25 (sparse retrieval) is the opposite — it excels at keyword matching but has no concept of meaning.',
      },
      {
        type: 'paragraph',
        text: 'Hybrid search runs both in parallel and merges the results. The merge strategy matters: we used Reciprocal Rank Fusion (RRF), which is a simple, parameter-free formula that works well in practice.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `def reciprocal_rank_fusion(results_list: list[list[str]], k: int = 60) -> list[str]:
    scores: dict[str, float] = {}
    for results in results_list:
        for rank, doc_id in enumerate(results):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
    return sorted(scores, key=scores.get, reverse=True)`,
      },
      {
        type: 'heading',
        text: 'Dense Retrieval with pgvector',
      },
      {
        type: 'paragraph',
        text: 'We used PostgreSQL + pgvector instead of a dedicated vector DB like Milvus or Pinecone. The reason: we already had multi-schema PostgreSQL for multi-tenancy, and pgvector let us keep everything in one place — document metadata, chunk text, and embeddings — with full ACID guarantees.',
      },
      {
        type: 'code',
        lang: 'sql',
        text: `CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_text  TEXT NOT NULL,
    embedding   VECTOR(1536),
    metadata    JSONB
);

CREATE INDEX ON document_chunks
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);`,
      },
      {
        type: 'paragraph',
        text: 'We generated embeddings using Azure OpenAI\'s text-embedding-ada-002 model. Each chunk was 512 tokens with a 64-token overlap to preserve context across boundaries.',
      },
      {
        type: 'heading',
        text: 'Sparse Retrieval with BM25',
      },
      {
        type: 'paragraph',
        text: 'We used the rank_bm25 Python library for in-process BM25 scoring. The BM25 index was built per-tenant on document ingestion and cached in Redis. On query time, we retrieved the top-50 BM25 candidates and top-50 vector candidates, then merged them.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `from rank_bm25 import BM25Okapi

class BM25Retriever:
    def __init__(self, chunks: list[str]):
        tokenized = [doc.lower().split() for doc in chunks]
        self.bm25 = BM25Okapi(tokenized)
        self.chunks = chunks

    def retrieve(self, query: str, top_k: int = 50) -> list[int]:
        tokenized_query = query.lower().split()
        scores = self.bm25.get_scores(tokenized_query)
        return sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:top_k]`,
      },
      {
        type: 'heading',
        text: 'PDF Extraction with LlamaParse',
      },
      {
        type: 'paragraph',
        text: 'Raw PDFs are notoriously hard to chunk well — tables, headers, and multi-column layouts destroy naive text extraction. We used LlamaParse to convert PDFs to clean Markdown before chunking. It handles tables as Markdown tables, preserves heading hierarchy, and significantly improves chunk quality for downstream retrieval.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `from llama_parse import LlamaParse

parser = LlamaParse(result_type="markdown")

async def extract_pdf(file_path: str) -> str:
    documents = await parser.aload_data(file_path)
    return "\\n\\n".join(doc.text for doc in documents)`,
      },
      {
        type: 'heading',
        text: 'Reranking with Cohere',
      },
      {
        type: 'paragraph',
        text: 'After merging BM25 + vector results (top ~30 candidates), we ran Cohere\'s rerank-english-v3.0 model. A cross-encoder reads the query and each candidate chunk together — this is much more accurate than embedding similarity but too slow to run over the whole corpus. The two-stage approach (cheap retrieval first, expensive reranking second) gives you the best of both worlds.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `import cohere

co = cohere.Client(api_key=settings.COHERE_API_KEY)

def rerank(query: str, candidates: list[str], top_n: int = 5) -> list[str]:
    response = co.rerank(
        model="rerank-english-v3.0",
        query=query,
        documents=candidates,
        top_n=top_n,
    )
    return [candidates[r.index] for r in response.results]`,
      },
      {
        type: 'heading',
        text: 'Results',
      },
      {
        type: 'paragraph',
        text: 'Compared to pure vector search, the hybrid pipeline with reranking improved retrieval precision on our internal eval set by ~34%. The biggest gains came on queries with specific technical terms and on multi-document corpora where a single embedding space was not expressive enough. LlamaParse also reduced "garbage chunk" rate from PDF ingestion by roughly 60% compared to PyPDF2.',
      },
    ],
  },

  {
    slug: 'langgraph-agentic-workflows',
    title: 'Agentic Workflows with LangGraph: Tool Calling & Persistent Checkpointing',
    date: 'February 2025',
    tags: ['LangGraph', 'AI Agents', 'FastAPI'],
    description:
      'How we architected multi-step agentic workflows using LangGraph with tool-calling, cost tracking, and state persistence.',
    content: [
      {
        type: 'paragraph',
        text: 'At MAindTec, the core of our AI product is a multi-step agent that can reason, use tools, search the web, query documents, and track its own token costs — all in a single conversation turn. We built this using LangGraph, and this post covers the key architectural decisions.',
      },
      {
        type: 'heading',
        text: 'Why LangGraph over Plain LangChain?',
      },
      {
        type: 'paragraph',
        text: 'LangChain chains are linear. Real agent workflows are not — they branch, loop, retry, and pause for human approval. LangGraph models the agent as a directed graph of nodes (processing steps) and edges (transitions). This makes complex control flow explicit and easy to reason about.',
      },
      {
        type: 'paragraph',
        text: 'The killer feature for us was persistent checkpointing: LangGraph can serialize the full graph state to a database after every node execution. If a request times out or fails, the agent can resume from the last checkpoint rather than starting over.',
      },
      {
        type: 'heading',
        text: 'Graph Structure',
      },
      {
        type: 'paragraph',
        text: 'Our agent graph has four main nodes: a router that classifies intent, a RAG node that queries the document store, a web search node, and a response synthesizer. Edges are conditional — the router decides which node fires next based on the query type.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `from langgraph.graph import StateGraph, END
from langgraph.checkpoint.postgres import PostgresSaver
from typing import TypedDict, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    intent: str
    retrieved_docs: list[str]
    total_tokens: int
    total_cost_usd: float

def build_graph(checkpointer: PostgresSaver) -> StateGraph:
    graph = StateGraph(AgentState)

    graph.add_node("router", route_intent)
    graph.add_node("rag", rag_retrieval)
    graph.add_node("web_search", web_search)
    graph.add_node("synthesizer", synthesize_response)

    graph.set_entry_point("router")
    graph.add_conditional_edges("router", decide_next_node, {
        "rag": "rag",
        "web": "web_search",
        "direct": "synthesizer",
    })
    graph.add_edge("rag", "synthesizer")
    graph.add_edge("web_search", "synthesizer")
    graph.add_edge("synthesizer", END)

    return graph.compile(checkpointer=checkpointer)`,
      },
      {
        type: 'heading',
        text: 'Persistent Checkpointing with PostgreSQL',
      },
      {
        type: 'paragraph',
        text: 'LangGraph ships with a PostgresSaver that writes checkpoints to a Postgres table. We use the same multi-schema database that stores tenant data — each tenant\'s agent runs are isolated by schema. This gives us full conversation history, retry capability, and an audit trail for every agent decision.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
import psycopg

async def get_checkpointer(tenant_schema: str):
    conn = await psycopg.AsyncConnection.connect(
        settings.DATABASE_URL,
        options=f"-c search_path={tenant_schema}"
    )
    checkpointer = AsyncPostgresSaver(conn)
    await checkpointer.setup()
    return checkpointer`,
      },
      {
        type: 'heading',
        text: 'Tool Calling',
      },
      {
        type: 'paragraph',
        text: 'Each tool is a Python function decorated with @tool. LangGraph passes the tool schemas to the LLM and routes tool call results back into the graph automatically. We built tools for: document RAG, web search (via Tavily), code execution, and calculator.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `from langchain_core.tools import tool

@tool
async def search_documents(query: str, top_k: int = 5) -> str:
    """Search the tenant's uploaded documents for relevant information."""
    chunks = await hybrid_rag_search(query, top_k=top_k)
    return "\\n\\n".join(chunks)

@tool
async def web_search(query: str) -> str:
    """Search the web for up-to-date information."""
    from tavily import TavilyClient
    client = TavilyClient(api_key=settings.TAVILY_API_KEY)
    results = client.search(query, max_results=5)
    return "\\n".join(r["content"] for r in results["results"])`,
      },
      {
        type: 'heading',
        text: 'Token Cost Tracking',
      },
      {
        type: 'paragraph',
        text: 'Every LLM call in the graph updates the AgentState with token usage and estimated cost. We map model names to per-token pricing and accumulate costs across all nodes. At the end of the run, the total is written to the billing ledger and deducted from the tenant\'s credit balance.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `COST_PER_TOKEN = {
    "gpt-4o": {"input": 5.00 / 1_000_000, "output": 15.00 / 1_000_000},
    "gpt-4o-mini": {"input": 0.15 / 1_000_000, "output": 0.60 / 1_000_000},
}

def calculate_cost(model: str, usage: dict) -> float:
    pricing = COST_PER_TOKEN.get(model, COST_PER_TOKEN["gpt-4o-mini"])
    return (
        usage["prompt_tokens"] * pricing["input"]
        + usage["completion_tokens"] * pricing["output"]
    )`,
      },
      {
        type: 'heading',
        text: 'Key Takeaways',
      },
      {
        type: 'paragraph',
        text: 'LangGraph is the right abstraction for production agents. The graph model forces you to be explicit about control flow, checkpointing gives you durability for free, and the tool-calling integration with Azure OpenAI is seamless. The main gotcha: streaming responses through the graph adds complexity — plan for it from day one rather than retrofitting.',
      },
    ],
  },

  {
    slug: 'azure-multitenant-saas',
    title: 'Multi-Tenant SaaS on Azure: From VNet to Multi-Schema PostgreSQL',
    date: 'January 2025',
    tags: ['Azure', 'DevOps', 'PostgreSQL', 'IaC'],
    description:
      'Lessons learned deploying an EU-compliant multi-tenant AI SaaS — private VNets, managed identities, Key Vault, and Bicep IaC.',
    content: [
      {
        type: 'paragraph',
        text: 'Building MAiQ on Azure meant dealing with EU data residency requirements, multi-tenant isolation, and the operational complexity of a distributed AI system — all at once. This post covers the infrastructure decisions that shaped the architecture.',
      },
      {
        type: 'heading',
        text: 'Multi-Tenancy Strategy: Schema-per-Tenant',
      },
      {
        type: 'paragraph',
        text: 'We chose schema-per-tenant isolation in a single PostgreSQL instance over separate databases or row-level isolation. It gives strong logical separation without the operational overhead of managing hundreds of databases, and PostgreSQL\'s search_path makes routing transparent at the connection level.',
      },
      {
        type: 'code',
        lang: 'python',
        text: `from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from contextlib import asynccontextmanager

@asynccontextmanager
async def tenant_session(tenant_schema: str):
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession)

    async with async_session() as session:
        # Set search_path to isolate tenant data
        await session.execute(
            text(f"SET search_path TO {tenant_schema}, public")
        )
        yield session`,
      },
      {
        type: 'paragraph',
        text: 'Tenant schema creation and migration runs on every new signup via an async background task. We use Alembic with a custom env.py that iterates over all tenant schemas and applies pending migrations.',
      },
      {
        type: 'heading',
        text: 'Azure Container Apps with Private VNet',
      },
      {
        type: 'paragraph',
        text: 'All services run as Azure Container Apps (ACA) inside a private VNet. The VNet has two subnets: one for ACA infrastructure and one for private endpoints (PostgreSQL, Redis, Blob Storage, Key Vault). Nothing is exposed to the public internet except through the ACA ingress, which terminates TLS.',
      },
      {
        type: 'code',
        lang: 'bicep',
        text: `resource containerAppEnv 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: 'maiq-env-\${environment}'
  location: location
  properties: {
    vnetConfiguration: {
      infrastructureSubnetId: infraSubnet.id
      internal: false
    }
    workloadProfiles: [
      {
        name: 'Consumption'
        workloadProfileType: 'Consumption'
      }
    ]
  }
}`,
      },
      {
        type: 'heading',
        text: 'Managed Identities & Key Vault',
      },
      {
        type: 'paragraph',
        text: 'No secrets are stored as environment variables. Every service has a system-assigned managed identity, and all secrets — database passwords, API keys, storage connection strings — live in Azure Key Vault. Container Apps pulls secrets from Key Vault at startup via Key Vault references.',
      },
      {
        type: 'code',
        lang: 'bicep',
        text: `resource keyVaultAccess 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(keyVault.id, containerApp.id, 'KeyVaultSecretsUser')
  scope: keyVault
  properties: {
    roleDefinitionId: subscriptionResourceId(
      'Microsoft.Authorization/roleDefinitions',
      '4633458b-17de-408a-b874-0445c86b69e6' // Key Vault Secrets User
    )
    principalId: containerApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}`,
      },
      {
        type: 'heading',
        text: 'Async Backend with Redis Streams & KEDA',
      },
      {
        type: 'paragraph',
        text: 'Long-running AI tasks (document ingestion, vectorization, billing reconciliation) are queued via Redis Streams. Worker Container Apps process these streams asynchronously. KEDA (Kubernetes Event-Driven Autoscaling) scales workers up and down based on stream lag — zero workers at idle, scaling out instantly under load.',
      },
      {
        type: 'code',
        lang: 'bicep',
        text: `resource workerScaleRule 'Microsoft.App/containerApps@2023-05-01' = {
  properties: {
    template: {
      scale: {
        minReplicas: 0
        maxReplicas: 10
        rules: [
          {
            name: 'redis-stream-scaler'
            custom: {
              type: 'redis-streams'
              metadata: {
                address: redisHost
                stream: 'ingestion-jobs'
                pendingEntriesCount: '5'
              }
            }
          }
        ]
      }
    }
  }
}`,
      },
      {
        type: 'heading',
        text: 'CI/CD with GitHub Actions',
      },
      {
        type: 'paragraph',
        text: 'Every push to main triggers a GitHub Actions pipeline that builds Docker images, pushes to Azure Container Registry (ACR), and deploys to Container Apps via az containerapp update. Staging and production are separate Container App Environments in separate resource groups. Bicep IaC handles all infrastructure — no manual portal clicks.',
      },
      {
        type: 'code',
        lang: 'yaml',
        text: `- name: Deploy to Azure Container Apps
  run: |
    az containerapp update \\
      --name maiq-api \\
      --resource-group rg-maiq-\${{ env.ENVIRONMENT }} \\
      --image \${{ env.ACR_LOGIN_SERVER }}/maiq-api:\${{ github.sha }}
  env:
    ENVIRONMENT: \${{ github.ref == 'refs/heads/main' && 'prod' || 'staging' }}`,
      },
      {
        type: 'heading',
        text: 'EU Compliance Considerations',
      },
      {
        type: 'paragraph',
        text: 'All resources are deployed to West Europe (Amsterdam). Azure OpenAI endpoints are also in West Europe to keep data processing within the EU. We use Azure Policy to deny creation of resources outside approved regions. PostgreSQL uses customer-managed encryption keys stored in Key Vault. Blob Storage has versioning and soft delete enabled for data recovery requirements under GDPR.',
      },
    ],
  },
];
