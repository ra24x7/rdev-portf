// next image
import Image from 'next/image';

import { BsArrowRight } from 'react-icons/bs';

// next link
import Link from 'next/link';

// icons
import { HiArrowRight } from 'react-icons/hi2';

const ProjectsBtn = () => {
  return (
    <div className='mx-auto xl:mx-0 z-10 flex flex-row gap-4' >
      <Link
        href={'/work'}>

<button className='btn rounded-full border border-white/50 max-w-[170px] px-8 max-h-10  transition-all duration-300 flex items-center justify-center overflow-hidden group'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                My Works
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
      </Link>

      <Link
        href={'/contact'}>

<button className='btn rounded-full border border-white/50 max-w-[170px] px-8 max-h-10 transition-all duration-300 flex items-center justify-center overflow-hidden group'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Contact Me
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
      </Link>




    </div>
  );
};

export default ProjectsBtn;
