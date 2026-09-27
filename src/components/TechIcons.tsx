import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const TechIcons: Record<string, React.FC<IconProps>> = {
  // Android Icon (Simple Icons Official SVG)
  'ANDROID': ({ className = "w-3 h-3", size = 12 }) => (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993s-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.2433 13.8533 7.8508 12 7.8508s-3.5902.3925-5.1368 1.0989L4.8409 5.4467a.4161.4161 0 0 0-.5676-.1521.416.416 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589.008 18.72h23.984c-.3352-4.0611-2.6809-7.5333-6.1095-9.3986"/>
    </svg>
  ),

  // Next.js
  'NEXT.JS': ({ className = "w-3 h-3", size = 12 }) => (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
    </svg>
  ),
  
  // React
  'REACT': ({ className = "w-3 h-3", size = 12 }) => (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm0 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-13.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
    </svg>
  ),

  // Tailwind CSS
  'TAILWIND': ({ className = "w-3 h-3", size = 12 }) => (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  ),

  // Flutter
  'FLUTTER': ({ className = "w-3 h-3", size = 12 }) => (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.314 0 2.3 12 6 15.7 21.684.013h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.469-6.47 6.47-6.458h-7.373z"/>
    </svg>
  ),

  // Laravel
  'LARAVEL': ({ className = "w-3 h-3", size = 12 }) => (
    <svg role="img" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.384 1.258a1 1 0 0 0-.583.25L1.5 7.15a1 1 0 0 0-.293.708v8.284a1 1 0 0 0 .293.708l6.301 5.642a1 1 0 0 0 1.332 0l6.301-5.642a1 1 0 0 0 .293-.708V7.858a1 1 0 0 0-.293-.708L9.133 1.508a1 1 0 0 0-.749-.25z"/>
    </svg>
  ),
};

// Helper Komponen Universal untuk merender ikon berdasarkan string name
export function TechIcon({ name, size = 11, className = '' }: { name?: string; size?: number; className?: string }) {
  if (!name) return null;

  const key = name.toUpperCase().trim();
  
  // Cari ikon yang cocok berdasarkan kata kunci (contoh: "Android App" -> match "ANDROID")
  const matchedKey = Object.keys(TechIcons).find((k) => key.includes(k));
  const IconComponent = matchedKey ? TechIcons[matchedKey] : null;

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
}