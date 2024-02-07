
import { useState, useEffect, useRef } from "react";

const Eye = () => {
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

  const eyeLeft = useRef();

  const handleMouseMove = (event) => {
    setMouseCoordinates({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateTranslation = () => {
    if (!eyeLeft.current) return "translate(0px, 0px)";

    const eyeCenterX = eyeLeft.current.getBoundingClientRect().left + eyeLeft.current.clientWidth / 2;
    const eyeCenterY = eyeLeft.current.getBoundingClientRect().top + eyeLeft.current.clientHeight / 2;

    const deltaX = mouseCoordinates.x - eyeCenterX;
    const deltaY = mouseCoordinates.y - eyeCenterY;

    return `translate(${deltaX / 40}px, ${deltaY / 60}px)`;
  };

  return (
    <div className=" animate-vblink absolute flex items-center justify-center h-screen top-[-8px] right-[26%]">
      <div className="bg-[white] w-[200px] h-[200px] border rotate-45 mx-auto my-0 rounded-[100%_10px] border-solid border-[white] "
      ></div>

      <div
        className=" w-[114px] h-[114px] bg-[url('/bg-eye.png')] absolute mx-auto my-0 rounded-[50%] flex items-center justify-center "
        ref={eyeLeft}
        style={{ transform: calculateTranslation() }}
       
        
      >
        <div className="opacity-100 w-[60px] h-[60px] bg-[black] rounded-[50%]"
         
        >
                <div  className=" animate-vmove opacity-50 w-3 h-3 bg-[white]  rounded-[50%] "
      
      
      
      ></div>

        </div>
      </div>
    </div>
  );
};

export default Eye;
