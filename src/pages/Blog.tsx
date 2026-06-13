import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBlog, BlogPost } from '../components/BlogContext';
import { Megaphone, X, Plus } from 'lucide-react';
import BlogHero from '../components/blog/BlogHero';
import BlogAdBanner from '../components/blog/BlogAdBanner';
import BlogLatestArticles from '../components/blog/BlogLatestArticles';
import BlogSidebar from '../components/blog/BlogSidebar';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Blog() {
  const { user, isAuthenticated } = useAuth();
  const { posts, addPost } = useBlog();
  
  // Admin state
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Blog list state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const isAdmin = isAuthenticated && (user?.email === 'admin@example.com' || user?.email === 'ariyantomhd88@gmail.com');

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const post: BlogPost = {
      id: Math.random().toString(),
      title: newPostTitle,
      summary: newPostContent.substring(0, 150) + '...',
      content: newPostContent,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: 'Admin',
      category: 'Announcements',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop',
      comments: []
    };

    addPost(post);
    setIsAddingPost(false);
    setNewPostTitle('');
    setNewPostContent('');
  };

  // Derive structural data for the view
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    const result = [{ name: 'All', count: posts.length }];
    Object.entries(counts).forEach(([name, count]) => {
      result.push({ name, count });
    });
    return result;
  }, [posts]);

  // If a category is selected, do we show hero? Let's hide hero if category != 'All'
  const isFiltering = selectedCategory !== 'All';

  // For "All" view, the top 3 go to Hero. The rest are lists.
  // For filtered view, we just list all matching, paginated.
  const applicablePosts = isFiltering 
    ? posts.filter(p => p.category === selectedCategory) 
    : posts.slice(3); // skip first 3 for the lists if viewing 'All'

  const totalPages = Math.ceil(applicablePosts.length / postsPerPage);
  const paginatedPosts = applicablePosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1); // reset to first page on category change
  };

  return (
    <div className="bg-app-bg min-h-[calc(100vh-80px)] transition-colors duration-300 flex flex-col font-sans">
      <SEOHead title="Blog" description="Latest updates and tutorials" />
      <Navbar />
      
      {/* Banner */}
      <div className="bg-indigo-600 text-white py-3 px-4 relative overflow-hidden flex items-center justify-center gap-3">
        <Megaphone className="w-5 h-5 text-indigo-300" />
        <p className="text-sm font-semibold tracking-wide">
          <span className="font-black text-indigo-200 uppercase mr-2">Update</span>
          Welcome to our new blog format! We'll be posting regular updates and tutorials.
        </p>
      </div>

      <main className="flex-1 max-w-[1440px] w-[95%] mx-auto p-4 sm:p-6 lg:p-8 mt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-[#0F1035] dark:text-white tracking-tight uppercase">Themavia Blog</h1>
          </div>
          {isAdmin && (
            <button 
              onClick={() => setIsAddingPost(true)}
              className="bg-[#0F1035] dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Post
            </button>
          )}
        </div>

        {/* Admin Add Post Modal */}
        {isAddingPost && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h2 className="text-xl font-black text-slate-900 dark:text-white">Create New Post</h2>
                 <button onClick={() => setIsAddingPost(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
                   <X className="w-5 h-5" />
                 </button>
               </div>
               <form onSubmit={handleAddPost} className="p-6 flex flex-col gap-4">
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Title</label>
                   <input type="text" value={newPostTitle} onChange={e=>setNewPostTitle(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500" required />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Content</label>
                   <textarea rows={6} value={newPostContent} onChange={e=>setNewPostContent(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none" required></textarea>
                 </div>
                 <div className="flex justify-end mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                   <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md">
                     Publish Post
                   </button>
                 </div>
               </form>
            </div>
          </div>
        )}

        {!isFiltering && <BlogHero posts={posts} />}
        {!isFiltering && <BlogAdBanner />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <BlogLatestArticles 
              posts={paginatedPosts} 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              title={isFiltering ? `Articles in "${selectedCategory}"` : "Latest Articles"}
            />
          </div>
          <div className="lg:col-span-1 flex flex-col gap-8">
            <BlogSidebar 
              categories={categoryCounts}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              recentPosts={posts.slice(0, 5)} // Always show top 5 globally
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
