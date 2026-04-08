// framer motion
import { motion } from 'framer-motion';

const Transition = () => {
  return (
    <motion.div
      className='fixed inset-0 bg-[#0f0f0f] pointer-events-none z-40'
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } }}
      exit={{ opacity: 1, transition: { duration: 0.4, ease: 'easeIn' } }}
    />
  );
};

export default Transition;
