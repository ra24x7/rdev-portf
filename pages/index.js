// next image
import Image from 'next/image';
import Typewriter from 'typewriter-effect';



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

  SiTypescript,
  SiNextdotjs,

} from 'react-icons/si';

const iconNames = [
  <FaFigma key="figma"/> ,
  <FaHtml5 key="html5" />,
  <FaCss3 key="css3" />,
  <FaJs key="js" />,
  // <SiTypescript key="typescript" />,
  <FaReact key="react" />,
  <SiNextdotjs key="nextjs" />,
  
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
                  strings: ['Designer', 'Developer'],
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
            Designer & Web Developer

          </motion.h3>

          
          <motion.p
            variants={fadeIn('down', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'
          >
             <br />Hello, I am Rajat, a passionate and experienced web developer and designer from India. I blend code and creativity to craft extraordinary digital experiences. Let us create the future of the web together.
              {/* Im a bookworm, constantly hungry for new knowledge, 
              and I find peace in the tunes of music.  */}
              Dont hesitate to get in touch!
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
