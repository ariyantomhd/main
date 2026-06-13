import { Link } from 'react-router-dom';
import { BlogPost } from '../BlogContext';
import { Clock } from 'lucide-react';

export default function BlogHero({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length < 3) return null;
  const mainPost = posts[0];
  const sidePost1 = posts[1];
  const sidePost2 = posts[2];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
      {/* Main Post (Left) */}
      <Link 
        to={`/blog/${mainPost.id}`} 
        className="lg:col-span-2 relative rounded-2xl overflow-hidden group h-[400px] lg:h-[500px]"
      >
        <img 
          src={mainPost.image} 
          alt={mainPost.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full">
          <span className="bg-yellow-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
            {mainPost.category}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
            {mainPost.title}
          </h2>
          <p className="text-white/80 text-sm line-clamp-2 pr-8">{mainPost.summary}</p>
        </div>
      </Link>

      {/* Side Posts (Right) */}
      <div className="flex flex-col gap-4 lg:gap-6 lg:h-[500px]">
        {/* Top Side Post */}
        <Link 
          to={`/blog/${sidePost1.id}`} 
          className="relative rounded-2xl overflow-hidden group flex-1 h-[200px] lg:h-auto"
        >
          <img 
            src={sidePost1.image} 
            alt={sidePost1.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-5 w-full">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2">
              {sidePost1.title}
            </h3>
            <div className="flex items-center text-white/70 text-xs font-medium gap-1">
              <Clock className="w-3 h-3" />
              {sidePost1.date}
            </div>
          </div>
        </Link>
        
        {/* Bottom Side Post */}
        <Link 
          to={`/blog/${sidePost2.id}`} 
          className="relative rounded-2xl overflow-hidden group flex-1 h-[200px] lg:h-auto"
        >
          <img 
            src={sidePost2.image} 
            alt={sidePost2.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-5 w-full">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2">
              {sidePost2.title}
            </h3>
            <div className="flex items-center text-white/70 text-xs font-medium gap-1">
              <Clock className="w-3 h-3" />
              Sponsored by {sidePost2.author}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
