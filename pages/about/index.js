import React, { useState } from 'react';

//  about data
export const aboutData = [
  {
    title: 'Skills',
    info: [
      {
        title: 'Languages',
        icons: ['Python•', 'JavaScript•', 'TypeScript•', 'SQL•'],
      },
      {
        title: 'AI / LLM',
        icons: ['LangGraph•', 'RAG•', 'Azure OpenAI•', 'pgvector•', 'LlamaParse•', 'Cohere•'],
      },
      {
        title: 'Backend',
        icons: ['FastAPI•', 'Node.js•', 'GraphQL•', 'Redis Streams•', 'SQLAlchemy•'],
      },
      {
        title: 'Cloud & DevOps',
        icons: ['Azure•', 'AWS•', 'Docker•', 'KEDA•', 'GitHub Actions•'],
      },
      {
        title: 'Databases',
        icons: ['PostgreSQL•', 'MongoDB•', 'DynamoDB•', 'Redis•', 'Milvus•', 'OpenSearch•'],
      },
      {
        title: 'Frontend',
        icons: ['Next.js•', 'React•', 'Redux Toolkit•', 'TanStack Query•', 'Tailwind CSS•'],
      },
    ],
  },

  {
    title: 'Experience',
    info: [
      {
        title: 'AI Software Engineer',
        company: 'MAindTec GmbH — Remote, Germany',
        stage: 'Mar 2025 – Present',
      },
      {
        title: 'Fullstack Engineer',
        company: 'Phalano Job — Kathmandu, Nepal',
        stage: 'Aug 2023 – Feb 2025',
      },
      {
        title: 'Web Developer',
        company: 'We Solve Digital — Remote, India',
        stage: 'Jan 2023 – Jun 2023',
      },
    ],
  },

  {
    title: 'Education',
    info: [
      {
        title: 'MBA in Finance',
        company: 'DMS, PUMBA — Pune',
        stage: '2018 – 2020',
      },
      {
        title: 'B.Tech in Computer Science & Engineering',
        company: 'NIT Bhopal',
        stage: '2014 – 2018',
      },
    ],
  },
];


// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

// counter
import CountUp from 'react-countup';

const About = () => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
    <div className='h-full bg-primary/60 py-32 text-center xl:text-left overflow-hidden z-0'>
      
      <div className='container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 mb-[150px]'>
        {/* text */}
        <div className='flex-1 flex flex-col justify-center'>
          <motion.h2
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2'
          >
            About <span className='text-accent'>Me.</span> 
          </motion.h2>

          <motion.p
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'
          >
            AI Software Engineer with 3+ years of experience building LLM systems, RAG pipelines, and scalable backend infrastructure. I specialize in agentic AI workflows with LangGraph, cloud-native backends on Azure and AWS, and full-stack development. When I&apos;m not at the computer, I&apos;m reading classics or psychology books, or travelling somewhere new.


          </motion.p>
          {/* counters */}
          <motion.div
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
          >
            

          </motion.div>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col w-full xl:max-w-[48%] h-[480px]'
        >
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'
                  }  cursor-pointer capitalize xl:text-lg relative  after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>

          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start overflow-y-auto scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent flex-1'>
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  // className='flex-1 flex flex-col md:flex-col md:items-left max-w-max gap-x-2 text-white/60'
                  className='flex flex-col items-start w-[400px] border border-white/10 px-8 py-3 opacity-[85%] rounded-[15px] bg-[#1a1a1a] transition-all duration-300 group'
                >
                  {/* title */}
                  <div className=' text-[16px] text-white/100 font-light md:mb-0'>{item.title} </div>
                  
                  <div className='text-[14px]   font-light text-white/60 '>{item.company}</div>
                  <div className='text-[12px]   font-light text-white/40 '>{item.stage}</div>
                  
                  {item.icons?.length > 0 && (
                    <div className='flex flex-wrap gap-x-1 gap-y-1 pt-2'>
                      {item.icons.map((icon, itemIndex) => (
                        <span key={itemIndex} className='text-white/60 text-xs font-medium whitespace-nowrap'>{icon}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
