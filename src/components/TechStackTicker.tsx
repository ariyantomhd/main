import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TechLogo {
  id: string;
  name: string;
  url: string;
}

const DEFAULT_LOGOS = [
  { name: "PHP", url: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "Laravel", url: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "WordPress", url: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "Flutter", url: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Vue.js", url: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
  { name: "Next.js", url: "https://cdn.simpleicons.org/nextdotjs/black" },
  { name: "Tailwind CSS", url: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Node.js", url: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Python", url: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Figma", url: "https://cdn.simpleicons.org/figma/F24E1E" },
];

export default function TechStackTicker() {
  const [logos, setLogos] = useState<TechLogo[]>([]);

  useEffect(() => {
    setLogos(DEFAULT_LOGOS.map((l, i) => ({ id: i.toString(), ...l })));
  }, []);

  // Duplicate logos for seamless loop
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <div className="bg-app-bg py-8 overflow-hidden relative group transition-colors duration-300">
      <motion.div 
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {displayLogos.map((logo, index) => (
          <div 
            key={`${logo.id}-${index}`} 
            className="flex items-center gap-3 transition-all duration-300 cursor-default hover:scale-110 opacity-70 hover:opacity-100"
          >
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="h-6 w-auto object-contain dark:invert"
              referrerPolicy="no-referrer"
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-app-primary">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
