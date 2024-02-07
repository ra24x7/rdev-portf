// work slider data
export const workSlider = {
  slides: [
   
    {
      images: [
        {
          title: 'E-COMMERCE WEBSITE',
          path: '/thumb1.jpg',
          stack: ["ReactJs", "Nodejs","MongoDb",]
        },

      ],
    },

    {
      images: [
        {
          title: 'FOOD ORDER APP',
          path: '/thumb4.jpg',
          stack: ["ReactJs", "Nodejs","MongoDb"]
        }
      
      ],
    },

    {
      images: [
        {
          title: 'CHATGPT APP',
          path: '/thumb4.jpg',
          stack: ["ReactJs", "Nodejs","MongoDb"]
        }
      
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
                return (
                  <div
                    className='relative rounded-lg overflow-hidden flex flex-col items-center justify-center group'
                    key={index}
                  >
                    <div className='flex flex-col items-center justify-center relative overflow-hidden group'>
                      {/* image */}
                      <Image src={image.path} width={800} height={400} alt='' />
                      {/* overlay gradient */}
                      <div className='absolute inset-0 bg-gradient-to-l from-transparent via-[#5b34d2] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700'></div>
                      {/* title */}
                      <div className='absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-[120px] transition-all duration-300'>
                        <div className='flex items-center gap-x-2 text-[13px] tracking-[0.2em]'>
                          {/* title part 1 */}
                          <div className='delay-100'>{image.title}</div>
                          
                         
                          {/* icon */}
                          <div className='text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200'>
                            <BsArrowRight />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className='  delay-150 flex items-center gap-x-4 absolute translate-y-full  group-hover:xl:-translate-y-1 transition-all duration-300 opacity-0 group-hover:opacity-80'>
                    {/* Tech Stacks */}
                    {image.stack?.map((item, itemIndex) => {
                      return <div key = {itemIndex} className='  flex items-center rounded-full bg-[#1a1a1a] my-3  px-4 py-2 text-xs font-medium   text-white'>{item}</div>;
                    })}
                  </div>
                  </div>
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
