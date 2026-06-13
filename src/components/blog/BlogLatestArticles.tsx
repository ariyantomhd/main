import { Link } from 'react-router-dom';
import { BlogPost } from '../BlogContext';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogLatestArticlesProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  title?: string;
}

export default function BlogLatestArticles({ posts, currentPage, totalPages, onPageChange, title = "Latest Articles" }: BlogLatestArticlesProps) {
  if (!posts || posts.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">{title}</h2>
        <div className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800/50 p-8 rounded-2xl text-center text-slate-500">
          No articles found for this category.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to={`/blog/${post.id}`} 
            className="group relative h-full cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            {/* Gradient Glow (Shadow) */}
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            
            {/* Padding container for gradient border */}
            <div className="relative h-full p-[2px] rounded-[2rem] bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-[#0B1120] group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-orange-500 transition-colors duration-500">
              
              {/* Actual Card Content */}
              <div className="relative flex flex-col bg-white dark:bg-[#0B1120] rounded-[calc(2rem-2px)] overflow-hidden p-4 h-full">

                <div className="relative rounded-2xl overflow-hidden h-48 mb-4 z-20">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                 <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                   {post.category}
                 </span>
                 <div className="flex items-center text-white text-xs font-medium gap-1 drop-shadow-md">
                   <Clock className="w-3 h-3" />
                   {post.date}
                 </div>
              </div>
            </div>
            
            <div className="flex flex-col flex-grow px-2 z-20">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                {post.summary}
              </p>
            </div>
            </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
