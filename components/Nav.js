// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from 'react-icons/hi2';

// nav data
export const navData = [
  { name: 'home', path: '/', icon: <HiHome /> },
  { name: 'about', path: '/about', icon: <HiUser /> },
  // { name: 'services', path: '/services', icon: <HiRectangleGroup /> },
  { name: 'work', path: '/work', icon: <HiViewColumns /> },
  
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];

// next link
import Link from 'next/link';

// next router
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav className='flex flex-row items-center justify-center gap-y-1 absolute  left-1/2 bottom-0 sm:bottom-7 transform -translate-x-1/2 z-50 w-full xl:max-w-sm'>
      {/* inner */}
      <div
        className='flex w-full xl:flex-row items-center justify-between xl:space-between gap-y-1 px-16 md:px-4 xl:px-10 h-[80px] xl:h-max py-4 border-t border-white/10 md:bg-white/5
      backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full '
      >
        {navData.map((link, index) => {
          return (
            <Link
              className={`${
                link.path === pathname && 'text-accent'
              } relative flex items-center group hover:text-accent transition-all duration-300`}
              href={link.path}
              key={index}
            >
              {/* tooltip */}
              <div className='absolute  right-0 bottom-[50px] hidden xl:group-hover:flex' >
                <div className='  relative flex text-[#b3b3b3] items-center p-[6px] '>
                  <div className='text-[14px] leading-none font-semibold capitalize'>
                    {link.name}
                  </div>
                 
                </div>
              </div>
              {/* icon */}
              <div>{link.icon}</div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
