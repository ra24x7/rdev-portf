import React, { useState } from 'react';

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from 'react-icons/si';

//  about data
export const aboutData = [
  {
    title: 'Skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          'HTML•',
         'CSS•',
          'JAVASCRIPT•',
          'REACT.JS•',
          'NEXT.JS•',
      
        
        ],
      },
      {
        title: 'Design',
        icons: ['UI/UX', 'Figma', 'Illustrator'],
      },

      {
        title: 'Digital Marketing',
        icons: ['SEO', 'Social Media', 'Email Marketing'],
      },

     
    ],
  },
 
  {
    title: 'experience',
    info: [
      {
        title: 'Design Head & Web Developer',
        company: 'We Solve Digital',
        stage: '2022 - 2023',
      },
      {
        title: 'UI/UX Designer',
        company: 'Phalano Job',
        stage: '2022 - 2023',
      },
      {
        title: 'Freelance Web Developer',
        company: 'Freelance',
        stage: '2019 - Present',
      },
    ],
  },

  {
    title: 'Education',
    info: [

      {
        title: 'MBA -Finance',
        company: 'Department of Management Sciences (PUMBA)',
        stage: 'INDIA'
      },

      {
        title: 'B.Tech - Computer Science',
        company: 'Maulana Azad National Institute of Technology',
        stage: 'INDIA'
      },

      
      
     
    ],
  },
  {
  title: 'Certificates',
  info: [

    {
      title: 'MBA -Finance - DMS, Pune',
      stage: '2020',
    },

    {
      title: 'B.Tech - Computer Science - NIT, Bhopal',
      stage: '2018',
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
    <div className='h-full bg-primary/30 py-32 text-center xl:text-left overflow-y-auto z-0 '>
      
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
            Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and Ive had the privilege of building software for an advertising agency, a start-up, a student-led design studio, and a huge corporation. When Im not at the computer, Im usually rock climbing, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds


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
          className='flex flex-col w-full xl:max-w-[48%] h-[400px]'
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

          <div className='py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start'>
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  // className='flex-1 flex flex-col md:flex-col md:items-left max-w-max gap-x-2 text-white/60'
                  className='flex-1 flex flex-col md:flex-col md:items-left w-[400px] gap-x-2  border border-white/10  px-8 py-3 opacity-[85%] rounded-[15px] bg-[#1a1a1a]  transition-all duration-300  overflow-hidden group'
                >
                  {/* title */}
                  <div className=' text-[16px] text-white/100 font-light md:mb-0'>{item.title} </div>
                  
                  <div className='text-[14px]   font-light text-white/60 '>{item.company}</div>
                  <div className='text-[12px]   font-light text-white/40 '>{item.stage}</div>
                  
                  <div className=' flex   py-2 overflow-hidden group'>
                    {/* icons */}
                    {item.icons?.map((icon, itemIndex) => {
                      return <div key = {itemIndex} className='text-white/60  px-1  text-xs font-medium  ' >{icon}</div>;
                    })}
                  </div>
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
