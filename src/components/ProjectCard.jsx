import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ image, title, description, githubLink, liveLink, tags }) => {
  return (
    <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="relative group rounded-2xl overflow-hidden bg-gray-900 shadow-xl
            border border-purple-500/30
            hover:border-purple-500/80
            hover:shadow-[0_0_25px_rgba(168,85,247,0.4),0_0_60px_rgba(236,72,153,0.2)]
            transition-all duration-300"
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 border border-white/30 text-white text-sm font-medium backdrop-blur hover:bg-white/20 transition"
            >
              GitHub
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-3">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>

        {/* Bottom links */}
        <div className="flex gap-4 pt-2">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition underline underline-offset-2"
            >
              GitHub ↗
            </a>
          )}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition underline underline-offset-2"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;