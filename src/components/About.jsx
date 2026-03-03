import React, { useState, useTransition, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TabButton from "./TabButton";
import profileImage from "../assets/warrior.png"; // adjust path

import {
  SiCplusplus, SiC, SiJavascript, SiPython,
  SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress,
  SiPostgresql, SiMysql,
  SiGit, SiGithub, SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// ---------------- TAB DATA ----------------

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="space-y-4 text-left">

        {/* Languages */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Languages</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <SiCplusplus />,  label: "C++" },
              { icon: <SiC />,          label: "C" },
              { icon: <SiJavascript />, label: "JavaScript" },
              { icon: <FaJava />,       label: "Java" },
              { icon: <SiPython />,     label: "Python" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-purple-500/50 transition">
                <span className="text-purple-400 text-base">{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Frontend */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Frontend</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <SiReact />,       label: "React.js" },
              { icon: <SiTailwindcss />, label: "Tailwind CSS" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-purple-500/50 transition">
                <span className="text-purple-400 text-base">{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Backend</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <SiNodedotjs />, label: "Node.js" },
              { icon: <SiExpress />,   label: "Express.js" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-purple-500/50 transition">
                <span className="text-purple-400 text-base">{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Databases</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <SiPostgresql />, label: "PostgreSQL" },
              { icon: <SiMysql />,      label: "MySQL" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-purple-500/50 transition">
                <span className="text-purple-400 text-base">{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Tools</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <SiGit />,     label: "Git" },
              { icon: <SiGithub />,  label: "GitHub" },
              { icon: <SiPostman />, label: "Postman" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-purple-500/50 transition">
                <span className="text-purple-400 text-base">{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Core CS */}
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Core CS</p>
          <div className="flex flex-wrap gap-2">
            {["DSA", "OOP", "DBMS", "OS", "CN", "LLD"].map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc list-inside text-left space-y-3 text-gray-300">
        <li>
          <span className="font-semibold text-white">B.Tech CSE</span> — Graphic Era University, Dehradun
          <div className="text-sm text-gray-400">2023 – 2027 | CGPA: 8.43</div>
        </li>
        <li><span className="font-semibold text-white">Class XII</span> — 86.4%</li>
        <li><span className="font-semibold text-white">Class X</span> — 90.2%</li>
      </ul>
    ),
  },
  {
    title: "Achievements",
    id: "achievements",
    content: (
      <ul className="list-disc list-inside text-left space-y-3 text-gray-300">
        <li><span className="font-semibold text-white">Solved over 1000 problems on LeetCode</span></li>
        <li><span className="font-semibold text-white">Guardian at LeetCode</span> — Max Rating: 2126</li>
        <li><span className="font-semibold text-white">3 Star at CodeChef</span> — Max Rating: 1700</li>
        <li><span className="font-semibold text-white">AWS Cloud Practitioner</span> — 2025</li>
      </ul>
    ),
  },
];

// ---------------- COMPONENT ----------------

const About = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-600 opacity-15 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-40"></div>
            <img
              src={profileImage}
              alt="About"
              className="relative rounded-2xl shadow-2xl"
              style={{ width: "100%", maxWidth: "460px", height: "500px", objectFit: "cover" }}
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1"
        >
          <h2 className="text-4xl text-left font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-gray-300 leading-relaxed text-left">
            I am a Computer Science and Engineering student at Graphic Era University, Dehradun, with a strong foundation in Data Structures, Algorithms, and system design, consistently building optimized solutions.
          </p>

          <p className="text-gray-300 leading-relaxed text-left mt-4">
            I have hands-on experience building full-stack applications using React, TailwindCSS, Node.js, Express, Supabase, and modern JavaScript frameworks, along with strong proficiency in C++, Python, and database management.
          </p>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("achievements")}
              active={tab === "achievements"}
            >
              Achievements & Certifications
            </TabButton>
          </div>

          {/* TAB CONTENT */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 min-h-[200px]"
          >
            {TAB_DATA.find((t) => t.id === tab).content}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

