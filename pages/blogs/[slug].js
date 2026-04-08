import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { blogs } from '../../lib/blogData';
import { HiArrowLeft } from 'react-icons/hi2';

export async function getStaticPaths() {
  return {
    paths: blogs.map((b) => ({ params: { slug: b.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug) || null;
  return { props: { blog } };
}

const BlogPost = ({ blog }) => {
  if (!blog) return null;

  return (
    <div className='h-full bg-primary/60 py-32 overflow-y-auto z-0'>
      <div className='container mx-auto max-w-[780px] mb-[100px]'>
        {/* back link */}
        <motion.div
          variants={fadeIn('down', 0.1)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='mb-8'
        >
          <Link
            href='/blogs'
            className='inline-flex items-center gap-x-2 text-white/50 hover:text-accent transition-colors duration-200 text-sm'
          >
            <HiArrowLeft />
            Back to blogs
          </Link>
        </motion.div>

        {/* header */}
        <motion.div
          variants={fadeIn('down', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='mb-10'
        >
          <div className='flex flex-wrap gap-2 mb-4'>
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className='text-xs text-accent border border-accent/30 rounded-full px-3 py-1'
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className='text-2xl xl:text-3xl font-semibold text-white leading-snug mb-3'>
            {blog.title}
          </h1>
          <p className='text-white/40 text-sm'>{blog.date}</p>
        </motion.div>

        {/* content */}
        <motion.div
          variants={fadeIn('up', 0.3)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col gap-y-6'
        >
          {blog.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2 key={i} className='text-xl font-semibold text-white mt-4'>
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'paragraph') {
              return (
                <p key={i} className='text-white/70 leading-relaxed'>
                  {block.text}
                </p>
              );
            }
            if (block.type === 'code') {
              return (
                <div key={i} className='rounded-[12px] overflow-hidden border border-white/10'>
                  <div className='flex items-center justify-between bg-white/5 px-4 py-2'>
                    <span className='text-white/40 text-xs font-mono'>{block.lang}</span>
                  </div>
                  <pre className='bg-[#111111] px-5 py-4 overflow-x-auto text-sm font-mono text-white/80 leading-relaxed'>
                    <code>{block.text}</code>
                  </pre>
                </div>
              );
            }
            return null;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
