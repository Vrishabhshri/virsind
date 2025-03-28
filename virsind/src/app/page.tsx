"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from 'react';
import { Typewriter } from 'nextjs-simple-typewriter'
import { FaInstagram, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';

export default function Home() {

  const sectionRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const transitionCSS = "opacity-0 transition-all duration-1000";

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0")

        }

      });

    },

    { threshold: 0.2 }

    );

    const currentSections = sectionRefs.current;

    currentSections.forEach((section) => {

      if (section) observer.observe(section);

    });

    return () => {

      currentSections.forEach((section) => {

        if (section) observer.unobserve(section);

      })

    }

  }, []);

  useEffect(() => {

    setTimeout(() => {

      setIsLoading(false);

    }, 1000);

  }, []);

  return (
    <div className="bg-black
                    min-w-screen min-h-screen
                    flex flex-col justify-start items-center">

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 tv-effect">
          <div className=""></div>
        </div>
      )}

      <div className={`transition-all duration-1000 ${isLoading ? "opacity-0" : "opacity-1"} w-full`}>

        {/* NavBar */}
        <nav className="flex justify-center items-center p-4 bg-black">
          <a href="https://www.instagram.com/vrishabhmusic" target="_blank" rel="noopener noreferrer"
          className='mx-4 text-white hover:text-[rgb(222, 48, 138)] transition-all duration-300 transform hover:scale-125'>
            <FaInstagram size={24}/>
          </a>
          <a href="https://www.youtube.com/@vrishabh6755" target="_blank" rel="noopener noreferrer"
          className='mx-4 text-white hover:text-[rgb(235,51,61)] transition-all duration-300 transform hover:scale-125'>
            <FaYoutube size={24}/>
          </a>
          <a href="https://open.spotify.com/artist/0xoYV7eUNlToK31Se7wCrx?si=dETKHb4tTRipvS_Y9mEZQQ" target="_blank" rel="noopener noreferrer"
          className='mx-4 text-white hover:text-[rgb(101,212,110)] transition-all duration-300 transform hover:scale-125'>
            <FaSpotify size={24}/>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer"
          className='mx-4 text-white hover:text-[rgb(230,64,71)] transition-all duration-300 transform hover:scale-125'>
            <FaApple size={24}/>
          </a>
        </nav>

        {/* Image header */}
        <div className={`w-full h-[400px] ${transitionCSS}`} ref={(el) => {sectionRefs.current[0] = el}}>
          <Image
            src="/images/Mind.jpg"
            width={500}
            height={500}
            alt="Mind album cover"
            className={`w-full h-full object-cover object-center`}
          />
          <div className="relative inset-0 flex justify-center items-center -mt-60">

            <h1 className="text-white text-7xl font-bold">

              {!isLoading && <Typewriter
                words={["Vir Sind"]}
                loop={1}
                cursorStyle=''
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
                onLoopDone={() => setShowCursor(false)}
                cursor={showCursor}
              />}

            </h1>

          </div>
          
        </div>

        {/* YouTube Video and album image */}
        <div 
          className={`mt-10 
                      w-full
                      flex flex-row justify-center items-center gap-20`}
        >

          <iframe
            src="https://www.youtube.com/embed/BLOmDRPJIik?si=8gQEMG3vgEifKkMs&autoplay=1&mute=1&cc_load_policy=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className={`w-1/2 aspect-video rounded-2xl overflow-hidden ${transitionCSS}`}
            ref={(el) => {sectionRefs.current[1] = el}}
          ></iframe>

          <div className="flex flex-col justify-center items-center gap-4">

            <a href="https://open.spotify.com/track/0C7NMGfUl0tSp2fSOvPT9g?si=c321d5f58adc4b3f" target="_blank" rel="noopener noreferrer"
              className={`${transitionCSS} transition-all duration-700 transform hover:scale-105`}
              ref={(el) => {sectionRefs.current[2] = el}}
            >
              <Image
                src="/images/Mind.jpg"
                width={200}
                height={200}
                alt="Mind album cover"
                className={`rounded-2xl object-cover`}
              />
            </a>

            <p className="text-white">Mind out.</p>

          </div>

        </div>

        {/* About us */}
        <div 
          className={`text-black 
                        ${transitionCSS}
                        w-full mt-10
                        bg-[rgb(77,156,185)]
                        flex justify-center items-center`}
          ref={(el) => {sectionRefs.current[3] = el}}
        >

          <p className="w-3/5 py-5">

            An emerging force in R&B, Vir Sind carves his own lane with hypnotic melodies and lush Rhodes textures, 
            weaving a sonic journey that carries his story like a midnight train through an endless dream.
            
          </p>

        </div>

      </div>

    </div>
  );
}
