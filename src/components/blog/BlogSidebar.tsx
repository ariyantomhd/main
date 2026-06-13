import { Link } from 'react-router-dom';
import { BlogPost } from '../BlogContext';

interface BlogSidebarProps {
  categories: { name: string; count: number }[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  recentPosts: BlogPost[];
}

export default function BlogSidebar({ categories, selectedCategory, onSelectCategory, recentPosts }: BlogSidebarProps) {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Categories Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          Categories
        </h3>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full flex items-center justify-between py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat.name 
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold' 
                    : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'
                }`}
              >
                <span>{cat.name}</span>
                {cat.name !== 'All' && (
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* New/Recent Articles Widget */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          New Articles
        </h3>
        <div className="flex flex-col gap-4">
          {recentPosts.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
