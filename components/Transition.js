// framer motion
import { motion } from 'framer-motion';


const Transition = () => {
  return (
    <>
      <motion.div
        className='fixed top-0 left-0 w-full h-screen bg-[#0f0f0f] transition-transform origin-bottom'
       
        initial={{scaleY: 0}}
        animate= {{scaleY: 0}}
        exit={{scaleY: 1}}
      ></motion.div>

      <motion.div
        className='fixed top-0 left-0 w-full h-screen bg-[#0f0f0f] transition-transform origin-top'
        initial={{scaleY: 1}}
        animate= {{scaleY: 0}}
        exit={{scaleY: 1}}
      ></motion.div>

    </>
  );
};

export default Transition;
