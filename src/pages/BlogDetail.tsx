import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBlog, Comment } from '../components/BlogContext';
import { MessageSquare, Send, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { posts, addComment } = useBlog();
  const [newComment, setNewComment] = useState('');

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-app-bg text-app-primary">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-slate-500">Post not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    const authorName = user?.name || user?.email?.split('@')[0] || 'User';

    const comment: Comment = {
      id: Math.random().toString(),
      author: authorName,
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    addComment(post.id, comment);
    setNewComment('');
  };

  return (
    <div className="bg-transparent min-h-[calc(100vh-80px)] transition-colors duration-300 pb-20">
      <SEOHead title={post.title} description={post.summary} />
      <Navbar />
      <div className="max-w-3xl mx-auto pt-6 px-4 sm:px-6">
        
        <button 
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        <div className="relative flex flex-col">
          <div className="h-64 sm:h-[450px] shrink-0 relative rounded-[2rem] overflow-hidden mb-10 shadow-sm">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/20"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{post.category}</span>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">{post.title}</h1>
                <p className="text-white/70 text-sm font-bold">{post.date} • By {post.author}</p>
            </div>
          </div>

          <div className="flex-grow">
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-lg">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph}</p>
              ))}
            </div>

            {/* Comments Section */}
            <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-indigo-500" />
                Comments ({post.comments.length})
              </h3>
              
              <div className="flex flex-col gap-6 mb-10">
                {post.comments.length === 0 ? (
                  <p className="text-slate-500 text-sm italic">No comments yet. Be the first!</p>
                ) : (
                  post.comments.map(comment => (
                    <div key={comment.id} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-900 dark:text-white">{comment.author}</span>
                        <span className="text-sm text-slate-400 font-medium">{comment.date}</span>
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment */}
              {isAuthenticated ? (
                <form onSubmit={handleAddComment} className="flex flex-col gap-4">
                  <label className="text-base font-bold text-slate-700 dark:text-slate-300">Join the discussion</label>
                  <div className="relative">
                    <textarea 
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 pr-16 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none text-base font-medium"
                    ></textarea>
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="absolute right-4 bottom-4 p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-sm"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Share your thoughts with the community.</p>
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors w-full sm:w-auto text-center shrink-0">Sign In to Comment</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
