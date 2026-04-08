// next image
import Image from 'next/image';
import Typewriter from 'typewriter-effect';

// icons
import {
  FaPython,
  FaDocker,
  FaNodeJs,
  FaReact,
  FaAws,
} from 'react-icons/fa';

import {
  SiTypescript,
  SiNextdotjs,
  SiFastapi,
  SiMicrosoftazure,
} from 'react-icons/si';

const iconNames = [
  <FaPython key="python" />,
  <SiTypescript key="typescript" />,
  <SiFastapi key="fastapi" />,
  <FaNodeJs key="nodejs" />,
  <FaReact key="react" />,
  <SiNextdotjs key="nextjs" />,
  <FaDocker key="docker" />,
  <SiMicrosoftazure key="azure" />,
  <FaAws key="aws" />,
];

// components
import ParticlesContainer from '../components/ParticlesContainer';
import Eye from '../components/Eye'
import ProjectsBtn from '../components/ProjectsBtn';

// framer motion
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../variants';
import { list } from 'postcss';





const Home = () => {
  return (
    <div className='bg-primary/60 h-full'>
      {/* text */}
      <div className='w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10'>
        <div className='text-center flex flex-col justify-center  xl:text-left h-full container mx-auto'>
          {/* title */}
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h1'
          >
            {/* Hi ! I am {' '} */}

            
            <span className='text-accent'  >
              <Typewriter
                options={{
                  strings: ['AI Engineer', 'Backend Developer'],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 100,
                }}
              />
            </span>
          </motion.h1>

          <motion.h3
            variants={fadeIn('down', 0.3)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='text-xl'
          >
            AI Software Engineer

          </motion.h3>


          <motion.p
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'
          >
            <br />Hi, I am Rajat — an AI Software Engineer with 3+ years of experience building LLM systems, RAG pipelines, and scalable backend infrastructure. I specialize in agentic AI workflows, cloud-native backends on Azure and AWS, and full-stack development. Don&apos;t hesitate to get in touch!
          </motion.p>

          {/* btn */}
          
          <div className='flex justify-center xl:hidden relative mx-auto xl:mx-0 mb-10 xl:mb-16 '>
            <ProjectsBtn />
           
          </div>

          <motion.div
            variants={fadeIn('down', 0.5)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='hidden xl:flex mb-16'
          >
            <ProjectsBtn /> 
            

          </motion.div>

          <motion.div
            variants={fadeIn('down', 0.5)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10'
          >
            
            <div className='flex gap-x-8 mx-auto xl:mx-0 mb-10 mt-5 xl:mb-16'>

            {iconNames?.map((icon, itemIndex) => {
            return  <div className='text-2xl opacity-[50%] hover:opacity-[100%]' key={itemIndex}>{icon}</div> 
              })}
              
            </div>
          
    
        </motion.div>

          <div className= "hidden xl:block">
           <Eye/>
          </div>

       
           
        </div>
        

       
    </div>
    </div>
  );
};

export default Home;
