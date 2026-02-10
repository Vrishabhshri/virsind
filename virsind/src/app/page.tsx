"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Typewriter } from 'nextjs-simple-typewriter'
import { FaInstagram, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
import { createConnection } from "@/lib/connections";
import { FirebaseError } from "firebase/app";

export default function Home() {

  const sectionRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const newID = () => Math.random().toString(36).slice(2, 9);
  const [connectionText, setConnectionText] = useState('');
  const [instaHandle, setInstaHandle] = useState('@');
  const [email, setEmail] = useState('');
  const connectionsIntro = `I want to hear from you!
                            Whether you have any suggestions or comments or just want to talk
                            feel free to leave something below! (Please leave a contact if you wish
                            to be contacted. I have no way of reaching out if you don't. Thanks!)`

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

  const onSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    uploadConnection();
    setConnectionText("");
    setInstaHandle("@");
    setEmail("");

  }

  const uploadConnection = useCallback(async () => {

    if (connectionText === '') {

      alert("Comments can't be empty. Please say something, anything, everything.");
      return;

    }

    try {

      const createdAt = new Date().toISOString();
      const id = newID();
      await createConnection(id, { connectionID: id, text: connectionText, createdAt, instagram: instaHandle, email, reviewed: false });

      alert("Uploaded successfully")

    }
    catch(err: unknown) {
      if (err instanceof FirebaseError) {
        console.error("Firebase error:", err.code, err.message);
      } else {
        console.error("Unknown error:", err);
      alert("There was an error processing your connection request");
  }
    }
    

  }, [connectionText, instaHandle, email]);

  const connectionInstaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value;

    if (!value.startsWith("@")) {
      value = "@" + value.replace(/@/g, "");
    }

    setInstaHandle(value);

  }

  useEffect(() => {

    setTimeout(() => {

      setIsLoading(false);

    }, 1000);

  }, []);

  return (
    <div className="bg-black
                    w-screen h-screen
                    flex flex-col justify-start items-center">

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 tv-effect">
          <div className=""></div>
        </div>
      )}

      <div className={`transition-all duration-1000 ${isLoading ? "opacity-0" : "opacity-1"} w-full`}>

        {/* NavBar */}
        <nav className="flex justify-center items-center p-4 bg-black">
          <a href="https://www.instagram.com/virsindofficial" target="_blank" rel="noopener noreferrer"
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
          <a href="https://music.apple.com/us/artist/vir-sind/1794861294" target="_blank" rel="noopener noreferrer"
          className='mx-4 text-white hover:text-[rgb(230,64,71)] transition-all duration-300 transform hover:scale-125'>
            <FaApple size={24}/>
          </a>
        </nav>

        {/* Image header */}
        <div className={`w-full h-[400px] ${transitionCSS}`} ref={(el) => {sectionRefs.current[0] = el}}>
          <Image
            src="/images/VirSind.jpeg"
            width={500}
            height={500}
            alt="Vir sind cover"
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

        {/* YouTube Video */}
        <div 
          className={`mt-10 
                      w-full
                      flex flex-row justify-center items-center gap-20`}
        >

          <iframe
            src="https://www.youtube.com/embed/rV_G5tjZZVc?si=bzTlKeuNYHCvetXi&autoplay=1&mute=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className={`w-full md:w-2/3 aspect-video rounded-2xl overflow-hidden ${transitionCSS}`}
            ref={(el) => {sectionRefs.current[1] = el}}
          ></iframe>

        </div>

        {/* More album covers grid */}
        <div 
          id="album-grid-covers-container"
          className={`mt-20 
                      w-full
                      flex flex-col md:flex-row justify-center items-center gap-20`}
        >

          <div className="flex flex-col justify-center items-center gap-4">

            <a href="https://open.spotify.com/album/1dTxVY7fckyXEaEMMII1Yl?si=tmtKZCE0R8yUOyWr5KFeng" target="_blank" rel="noopener noreferrer"
              className={`${transitionCSS} transition-all duration-700 transform hover:scale-105`}
              ref={(el) => {sectionRefs.current[2] = el}}
            >
              <Image
                src="/images/Bittersweet-Demos-EP.jpg"
                width={200}
                height={200}
                alt="Bittersweet Demos EP album cover"
                className={`rounded-2xl object-cover`}
              />
            </a>

            <p className="text-white">Bittersweet Demos EP Out!</p>

          </div>

        </div>

        {/* Connections Area */}
        <div className="w-full flex flex-col items-center mt-10 p-10 text-center">

            <span className="w-2/3 text-white mb-4 text-lg">{connectionsIntro}</span>

            <form className="flex flex-col gap-8 w-2/3
                              bg-black"
              onSubmit={onSubmit}
            >
              {/* Message Box */}
              <textarea
                value={connectionText}
                onChange={(e) => setConnectionText(e.target.value)}
                placeholder="Enter something, anything, everything..."
                className="bg-white text-black border border-4 border-[rgb(77,156,185)]
                            min-h-[100px] resize-y rounded-lg p-2"
              />

              {/* Instagram Handle */}
              <div className="flex flex-col text-left">

                <span className="text-white">Instagram Handle (Optional)</span>
                <input
                  type="text"
                  value={instaHandle}
                  onChange={connectionInstaHandler}
                  className="bg-white text-black border border-4 border-[rgba(77,156,185)]
                              rounded-lg p-2"
                />

              </div>

              {/* Email Handle */}
              <div className="flex flex-col text-left">

                <span className="text-white">Email (Optional)</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black border border-4 border-[rgba(77,156,185)]
                              rounded-lg p-2"
                />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[rgb(77,156,185)] p-2 rounded-lg cursor-pointer hover:bg-[rgb(111,213,249)]"
              >
                Submit
              </button>
            </form>

        </div>

        {/* About us */}
        <div 
          className={`text-black 
                        ${transitionCSS}
                        w-full mt-10
                        bg-[rgb(77,156,185)]
                        flex justify-center items-center`}
          ref={(el) => {sectionRefs.current[6] = el}}
        >

          <p className="w-3/5 py-5">

            An emerging force in R&B and Indie, Vir Sind.
            {/* carves his own lane with hypnotic melodies and lush Rhodes textures, 
            weaving a sonic journey that carries his story like a midnight train through an endless dream. */}
            
          </p>

        </div>

      </div>

    </div>
  );
}
