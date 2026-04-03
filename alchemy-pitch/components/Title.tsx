"use client";

import React, { useRef } from "react";
import gsap from "gsap";

const HeroAlchemy: React.FC = () => {
  const text = "alchemy";
  const lettersRef = useRef<HTMLSpanElement[]>([]);

const handleEnter = (index: number) => {
  const letter = lettersRef.current[index];
  if (!letter) return;

  gsap.killTweensOf(letter);

  gsap.to(letter, {
    keyframes: [
      {
        y: 4,              // very slight push down
        scaleY: 0.94,      // tiny squash
        scaleX: 1.04,
        duration: 0.1,
        ease: "power1.out",
      },
      {
        y: -8,             // gentle lift
        scaleY: 1.04,      // slight stretch
        scaleX: 0.97,
        color: "#ff6a00",
        duration: 0.22,
        ease: "back.out(1.6)", // softer bounce
      },
      {
        y: 0,              // settle
        scaleX: 1,
        scaleY: 1,
        duration: 0.18,
        ease: "power2.out",
      },
    ],
  });
};

const handleLeave = (index: number) => {
  const letter = lettersRef.current[index];
  if (!letter) return;

  gsap.killTweensOf(letter);

  gsap.to(letter, {
    y: 0,
    scaleX: 1,
    scaleY: 1,
    color: "#3f3f3f",
    duration: 0.2,
    ease: "power2.out",
  });
};

  return (
    <section className="w-full h-screen bg-[#e9e9e9] flex flex-col justify-between pt-10 pb-12 overflow-hidden">
      
      {/* TITLE */}
      <div className="w-full flex justify-center mt-10">
        <h1 className="font-poppins font-[600] text-[22vw] leading-[0.75] tracking-[-0.06em] whitespace-nowrap flex">
          
          {text.split("").map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) lettersRef.current[index] = el;
              }}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
              className="inline-block text-[#3f3f3f] cursor-default"
            >
              {letter}
            </span>
          ))}

        </h1>
      </div>

      {/* TEXT CONTENT */}
      <div className="pl-24 pr-16 mb-10 max-w-none font-myfont">
        
        <p className="text-[28px] leading-[1.35] text-[#3f3f3f] font-[700]">
          Transmuting into Transcendence.
        </p>

        <p className="text-[28px] leading-[1.35] text-[#3f3f3f] font-[700] mt-1 whitespace-nowrap">
          Turning data into destiny, one click at a time.
        </p>

        <button className="mt-3 flex items-center gap-3 text-[17px] font-[500] text-[#3f3f3f] hover:opacity-70 transition">
          <span className="w-[10px] h-[10px] bg-[#ff6a00] inline-block"></span>
          Discover More
        </button>
      </div>
    </section>
  );
};

export default HeroAlchemy;