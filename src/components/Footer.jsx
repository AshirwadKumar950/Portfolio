import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const LINKS = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

const SOCIALS = [
  { icon: <FaGithub />,   href: "https://github.com/AshirwadKumar950" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/ashirwad-kumar-9784292b8" },
  { icon: <SiLeetcode />, href: "https://leetcode.com/u/ashirwadkumar950/" },
];

const handleScroll = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleScroll(e, "#hero")}
          className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Ashirwad.dev
        </a>

        {/* Nav links */}
        <ul className="flex gap-6 text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social icons */}
        <div className="flex gap-5 text-xl">
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Ashirwad Kumar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;