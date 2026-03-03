import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Contacts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen bg-black text-white flex py-20 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-purple-600 opacity-30 blur-[120px] rounded-full"></div>
      <div className="absolute right-0 top-0 w-80 h-80 bg-pink-600 opacity-15 blur-[120px] rounded-full"></div>

      <div className="w-full flex flex-col md:flex-row gap-16 relative z-10 px-6 md:px-16 lg:px-24 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400 max-w-md leading-relaxed">
            I'm currently looking for new opportunities, my inbox is always open.
            Whether you have a question or just want to say hi, I'll try my best
            to get back to you!
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4">
            <a
              href="https://github.com/AshirwadKumar950"
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ashirwad-kumar-9784292b8"
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://leetcode.com/u/ashirwadkumar950/"
              className="text-gray-400 hover:text-white text-2xl transition"
            >
              <SiLeetcode />
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1"
        >
          <form
            action="https://formspree.io/f/mlgwyzyg"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label className="block mb-2 text-gray-300">Your email</label>
              <input
                type="email"
                name="email"
                placeholder="you@gmail.com"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Just saying hi"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300">Message</label>
              <textarea
                rows="5"
                name="message"
                placeholder="Let's talk about..."
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition"
            >
              Send Message
            </button>

            {/* Redirect back to your site after submission */}
            <input type="hidden" name="_next" value="https://ashirwadsportfolio.netlify.app/" />
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contacts;