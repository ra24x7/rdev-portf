// links
import Link from 'next/link';

// icons
import { RiGithubLine, RiLinkedinLine, RiTwitterLine } from 'react-icons/ri';
import { FaGoodreads } from 'react-icons/fa6';

const socials = [
  { icon: <RiGithubLine />, href: 'https://github.com/ra24x7' },
  { icon: <RiLinkedinLine />, href: 'https://www.linkedin.com/in/rajagrwl' },
  { icon: <RiTwitterLine />, href: 'https://x.com/__rajatagrawal' },
  { icon: <FaGoodreads />, href: 'https://www.goodreads.com/rajagrwal' },
];

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-lg'>
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.href || '#'}
          target={social.href ? '_blank' : undefined}
          rel='noopener noreferrer'
          className='hover:text-accent transition-all duration-300'
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
