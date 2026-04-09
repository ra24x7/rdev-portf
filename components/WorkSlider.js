// work slider data
export const workSlider = {
  slides: [
    {
      images: [
        {
          title: 'MAiQ — AI SaaS Platform',
          path: '/maiq-thumb.png',
          videoPath: '/maiq-demo-clip.webm',
          description: 'Multi-tenant AI SaaS with LangGraph agents, hybrid RAG pipeline, and Azure cloud infrastructure.',
          stack: ['Python', 'FastAPI', 'LangGraph', 'pgvector', 'Azure', 'PostgreSQL', 'Redis'],
          url: 'https://maiq.maindtec.ai/',
        },
      ],
    },
    {
      images: [
        {
          title: 'Phalano Job — Hiring Platform',
          path: '/phalano-thumb.png',
          description: 'Distributed GraphQL job platform on AWS with AI-powered candidate matching via OpenSearch.',
          stack: ['Node.js', 'GraphQL', 'Apollo Federation', 'AWS', 'OpenSearch', 'DynamoDB'],
          url: 'https://www.phalanojob.com',
        },
      ],
    },
  ],
};

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

// icons
import { BsArrowRight } from 'react-icons/bs';
// next image
import Image from 'next/image';
// next link
import Link from 'next/link';

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className='h-[480px] sm:h-[480px]'
    >
      {workSlider.slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <div className='grid grid-cols-1 grid-rows-1 gap-6 cursor-pointer'>
              {slide.images.map((image, index) => {
                const CardWrapper = image.url
                  ? ({ children }) => <Link href={image.url} target='_blank' rel='noopener noreferrer' className='block'>{children}</Link>
                  : ({ children }) => <>{children}</>;

                return (
                  <CardWrapper key={index}>
                    <div
                      className='relative rounded-lg overflow-hidden flex flex-col items-center justify-center group cursor-pointer'
                    >
                      <div className='flex flex-col items-center justify-center relative overflow-hidden group'>
                        {/* image or video */}
                        {image.videoPath ? (
                          <video
                            src={image.videoPath}
                            width={800}
                            height={400}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className='w-full h-auto'
                          />
                        ) : (
                          <Image src={image.path} width={800} height={400} alt='' />
                        )}
                        {/* overlay gradient */}
                        <div className='absolute inset-0 bg-gradient-to-l from-transparent via-[#5b34d2] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700'></div>
                        {/* overlay content */}
                        <div className='absolute inset-0 flex flex-col items-center justify-center px-8 opacity-0 group-hover:opacity-100 transition-all duration-300 gap-y-3'>
                          <div className='flex items-center gap-x-2 text-[15px] font-semibold tracking-[0.1em] text-center'>
                            <span>{image.title}</span>
                            <BsArrowRight />
                          </div>
                          <p className='text-[12px] text-white/80 text-center max-w-[360px]'>
                            {image.description}
                          </p>
                          <div className='flex flex-wrap justify-center gap-2'>
                            {image.stack?.map((item, itemIndex) => (
                              <span key={itemIndex} className='rounded-full bg-black/40 border border-white/20 px-3 py-1 text-[11px] font-medium text-white'>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
         
          </SwiperSlide>
          
        );
      })}
    </Swiper>
  );
};

export default WorkSlider;
