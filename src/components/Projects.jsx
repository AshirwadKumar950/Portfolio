import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import clubManager from "../assets/clubManager.png";
import cityMatch from "../assets/cityMatch.png";
import smartEcom from "../assets/ecommerceWeb.png";
import cervicalCancer from "../assets/cervicalCancer.jpeg";


const PROJECTS = [
  {
    title: "Club Activity Management System",
    description:
      "A flask based full stack web application that allows students to create and manage clubs, events, and memberships. It features role-based access control for admins, club leaders, and members.",
    image: clubManager, // replace with: interviewX
    githubLink: "https://github.com/AshirwadKumar950/ClubActivityManager", 
    liveLink: "",   
    tags: ["JavaScript", "Flask", "MySQL", "Python"],
  },
  {
    title: "Smart Relocation Assistant",
    description:
      "Smart Relocation Assistant is an intelligent platform that helps users find the best areas to move to based on factors like budget, safety, job opportunities, amenities, and lifestyle preferences.",
    image: cityMatch, // replace with: blogify
    githubLink: "https://github.com/AshirwadKumar950/CityMatch", // update link
    liveLink: "",
    tags: ["React", "Node", "Express", "PostgreSQL", "JWT", "Leaflet.js"],
  },
  {
    title: "Smart Ecommerce Analytics",
    description:
      "Smart Ecommerce Analytics is a data-driven platform that analyzes sales, customer behavior, and product performance to generate actionable business insights. It uses statistical analysis and visualization techniques to help businesses optimize pricing, inventory, and marketing strategies for maximum revenue growth.",
    image: smartEcom,
    githubLink: "https://github.com/AshirwadKumar950/SmartEcommerseDB", // update link
    liveLink: "",
    tags: ["JavaScript", "Flask", "Python", "MySQL", "Data Visualization", "Machine Leaning(K Means Clustering)"],
  },
  {
    title: "Cervical Cancer Prediction", // rename as needed
    description:
      "Cervical Cancer Prediction is a machine learning project that analyzes patient health and clinical data to predict the risk of cervical cancer at an early stage. It applies data preprocessing, feature selection, and classification algorithms to assist in faster diagnosis.",
    image: cervicalCancer,
    githubLink: "https://github.com/AshirwadKumar950/CervicalCancerPrediction",
    liveLink: "",
    tags: ["Python", "Machine Learning(XGBoost, Random Forest, Logistic Regression and Decision Trees)", "Data Analysis", "Scikit-learn", "Pandas"],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black text-white py-20 px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600 opacity-20 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-pink-600 opacity-15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          My Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mb-14 max-w-xl mx-auto"
        >
          A collection of things I've built — from full-stack apps to AI-powered tools.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;