import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import { blogs } from '../../lib/blogData';
import { HiArrowRight } from 'react-icons/hi2';

const Blogs = () => {
  return (
    <div className='h-full bg-primary/60 py-32 text-center xl:text-left overflow-y-auto z-0'>
      <div className='container mx-auto h-full flex flex-col mb-[100px]'>
        <motion.h2
          variants={fadeIn('down', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='h2 mb-2'
        >
          My <span className='text-accent'>Blog.</span>
        </motion.h2>

        <motion.p
          variants={fadeIn('down', 0.3)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='max-w-[500px] mx-auto xl:mx-0 mb-10 text-white/60'
        >
          Thoughts on AI engineering, backend architecture, and cloud infrastructure.
        </motion.p>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='flex flex-col gap-y-6'
        >
          {blogs.map((blog, index) => (
            <Link key={index} href={`/blogs/${blog.slug}`}>
              <div className='border border-white/10 rounded-[15px] px-8 py-6 bg-[#1a1a1a] opacity-90 hover:border-accent/50 hover:bg-[#1f1f1f] transition-all duration-300 cursor-pointer group'>
                <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-y-2 mb-3'>
                  <h3 className='text-white text-[17px] font-medium group-hover:text-accent transition-colors duration-200'>
                    {blog.title}
                  </h3>
                  <div className='flex items-center gap-x-3 shrink-0'>
                    <span className='text-white/40 text-sm'>{blog.date}</span>
                    <HiArrowRight className='text-white/30 group-hover:text-accent transition-colors duration-200' />
                  </div>
                </div>
                <p className='text-white/60 text-sm mb-4'>{blog.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className='text-xs text-accent border border-accent/30 rounded-full px-3 py-1'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blogs;
