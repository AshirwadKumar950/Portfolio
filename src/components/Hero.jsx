import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profileImage from "../assets/mysnappic.jpeg";

const ROLES = ["Ashirwad Kumar", "Full Stack Developer", "Problem Solver", "Coder"];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = ROLES[currentRole];

    let timeout;

    if (!isDeleting && charIndex <= fullText.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 80);
    } else if (!isDeleting && charIndex > fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, 45);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setCharIndex(0);
      setCurrentRole((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole]);

  return (
    <section className="min-h-screen bg-black text-white flex items-center px-6 py-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600 opacity-15 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 relative z-10">

        {/* LEFT — Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-5xl md:text-6xl text-left font-extrabold leading-tight">
            Hello, I'm
          </h1>

          {/* Typing text */}
          <h2 className="text-4xl md:text-5xl text-left font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent min-h-[60px]">
            {displayed}
            <span className="animate-pulse text-pink-400">|</span>
          </h2>

          <p className="text-gray-400 max-w-lg text-left leading-relaxed text-lg">
            Full-Stack Developer and competitive programmer with strong DSA
            fundamentals, experienced in building scalable web applications
            and AI-powered products using modern tech stacks.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-2 flex-wrap">
            <a
            //   href="mailto:ashirwadkumar950@gmail.com"
            //   className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg shadow-purple-500/30"
            href="#contact"
            onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg shadow-purple-500/30"
            >
            
              Hire Me
            </a>
            <a
              href="AshirwadResume.pdf"
              download
              className="px-8 py-3 rounded-full font-semibold text-white border-2 border-purple-500 hover:bg-purple-500/10 transition"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* RIGHT — Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full md:w-auto flex justify-center"
        >
          <div className="relative w-full max-w-[580px]">
            {/* Glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-md opacity-50"></div>
            <img
              src={profileImage}
              alt="Profile"
              className="relative rounded-3xl object-cover shadow-2xl w-full"
              style={{ width: "380px", height: "420px", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;