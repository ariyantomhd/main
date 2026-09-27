// src/app/blog/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Share2, Sparkles, Bookmark, MessageSquare, Send } from 'lucide-react';

const articlesData: Record<string, {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  author: string;
  content: string[];
}> = {
  '1': {
    id: '1',
    title: 'Building Scalable APIs with Node.js',
    category: 'Backend',
    categoryColor: 'bg-indigo-100 text-indigo-700',
    date: 'Dec 05, 2023',
    author: 'Admin Themavia',
    content: [
      'Building robust and scalable APIs is a foundational requirement for modern web and mobile applications.',
      'In this article, we explore best practices for structuring your Express and Node.js applications.'
    ]
  },
  '2': {
    id: '2',
    title: 'Mastering React Server Components',
    category: 'Frontend',
    categoryColor: 'bg-blue-100 text-blue-700',
    date: 'Dec 10, 2023',
    author: 'Admin Themavia',
    content: [
      'React Server Components (RSC) represent a paradigm shift in how we build user interfaces.'
    ]
  },
  '3': {
    id: '3',
    title: 'The Ultimate Guide to PostgreSQL Performance',
    category: 'Database',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    date: 'Nov 18, 2023',
    author: 'Admin Themavia',
    content: [
      'Database performance can make or break an application.'
    ]
  },
  '4': {
    id: '4',
    title: 'Securing Your Next.js Application',
    category: 'Security',
    categoryColor: 'bg-amber-100 text-amber-700',
    date: 'Nov 25, 2023',
    author: 'Admin Themavia',
    content: [
      'Security should never be an afterthought.'
    ]
  }
};

interface Comment {
  name: string;
  text: string;
  date: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  // State untuk interaksi Share & Comments
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { name: 'Rizky Developer', text: 'Artikel yang sangat bermanfaat dan mudah dipahami!', date: 'A day ago' },
    { name: 'Sarah Ananda', text: 'Ditunggu kelanjutan tutorial bagian keduanya kak.', date: '2 hours ago' }
  ]);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Cari artikel berdasarkan ID dari URL
  const article = (id && articlesData[id]) ? articlesData[id] : {
    id: id || '1',
    title: 'Detail Artikel Pilihan Themavia',
    category: 'Technology',
    categoryColor: 'bg-amber-100 text-amber-800',
    date: 'Dec 12, 2023',
    author: 'Admin Themavia',
    content: [
      'Halaman detail ini berhasil diakses melalui dynamic routing Next.js.',
      'Konten artikel lengkap akan dimuat di sini berdasarkan ID yang dikirimkan dari halaman utama.'
    ]
  };

  // Fungsi Share Artikel
  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: `Baca artikel menarik: ${article.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Fungsi Kirim Komentar
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      name: authorName,
      text: commentText,
      date: 'Just now'
    };

    setComments([newComment, ...comments]);
    setAuthorName('');
    setCommentText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <div className="bg-indigo-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
        <span>UPDATE: Welcome to our new blog format! We’ll be posting regular updates and tutorials.</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Artikel Header */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-md text-xs font-extrabold uppercase ${article.categoryColor}`}>
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
            <span>Written by <strong className="text-slate-900">{article.author}</strong></span>
            <div className="flex items-center gap-3 relative">
              <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                <Bookmark className="w-4 h-4" /> Save
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-1 hover:text-indigo-600 transition-colors relative"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
              {copied && (
                <span className="absolute -top-8 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md animate-fade-in">
                  Link copied!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-64 sm:h-96 bg-slate-900 rounded-3xl mb-8 relative overflow-hidden flex items-center justify-center text-slate-500 font-bold shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 opacity-90"></div>
          <span className="relative z-10 text-slate-400 text-sm tracking-wide">ARTICLE HERO IMAGE (ID: {id})</span>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base mb-10">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Thank you for reading!</span>
            <Link href="/blog" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
              &larr; Explore more articles
            </Link>
          </div>
        </div>

        {/* ================= SECTION KOMENTAR ================= */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Discussion ({comments.length})
            </h3>
          </div>

          {/* Form Tambah Komentar */}
          <form onSubmit={handleAddComment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input 
                type="text" 
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name..."
                required
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Comment</label>
              <textarea 
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your thoughts about this article..."
                required
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </form>

          {/* List Komentar */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {comments.map((cmt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{cmt.name}</span>
                  <span className="text-[10px] text-slate-400">{cmt.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cmt.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}