import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash, Eye, Settings as SettingsIcon, Save, Loader2 } from "lucide-react";
import { adminServices } from "../../services/admin.services";
import { BlogPost } from "../../components/BlogContext";

export default function AdminBlog() {
  const [activeTab, setActiveTab] = useState<'Articles' | 'AdSettings'>('Articles');
  
  // Articles State
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", status: "published" as 'draft' | 'published' });

  // Ad Settings State
  const [adSettings, setAdSettings] = useState({
    isActive: true,
    htmlContent: '<a href="https://example.com" target="_blank">\n  <img \n    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop" \n    alt="Advertisement" \n    className="ad-image"\n  />\n  <div className="ad-overlay">\n    <p>Your Ad Here</p>\n  </div>\n</a>',
    cssContent: '.ad-image {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  opacity: 0.6;\n}\n.ad-overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ad-overlay p {\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}',
    width: '100%',
    height: '120px'
  });
  const [isSavingAd, setIsSavingAd] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [postsData, settingsData] = await Promise.all([
        adminServices.getPosts().catch(() => []),
        adminServices.getSettings().catch(() => ({}))
      ]);
      
      setPosts(Array.isArray(postsData) ? postsData : []);
      
      if (settingsData && settingsData.blogAdBanner) {
         setAdSettings({ ...adSettings, ...settingsData.blogAdBanner });
      }
    } catch (err) {
      console.warn("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const postData = {
      title: newPost.title,
      summary: newPost.content.substring(0, 150) + '...',
      content: newPost.content,
      status: newPost.status,
      category: 'Announcements',
      author: 'Admin'
    };

    try {
      await adminServices.createPost(postData);
      setIsAddingPost(false);
      setNewPost({ title: "", content: "", status: "published" });
      await fetchData();
    } catch(err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await adminServices.deletePost(id);
      await fetchData();
    } catch(err) {
      console.error(err);
    }
  };

  const handleSaveAdSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAd(true);
    setSaveSuccess(false);
    try {
       await adminServices.updateSettings({ blogAdBanner: adSettings });
       setSaveSuccess(true);
       setTimeout(() => setSaveSuccess(false), 3000);
    } catch(err) {
       console.error("Failed to save ad settings", err);
    } finally {
       setIsSavingAd(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-app-primary">Blog Manager</h1>
          <p className="text-sm font-medium text-app-secondary mt-2">Manage your articles and blog settings.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-app-bg border border-app-border p-1">
          <button 
            onClick={() => setActiveTab('Articles')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'Articles' ? 'bg-app-surface text-app-primary shadow-sm border border-app-border' : 'text-app-secondary hover:text-app-primary'}`}
          >
            Articles
          </button>
          <button 
            onClick={() => setActiveTab('AdSettings')}
            className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${activeTab === 'AdSettings' ? 'bg-app-surface text-app-primary shadow-sm border border-app-border' : 'text-app-secondary hover:text-app-primary'}`}
          >
            <SettingsIcon size={14} />
            Ad Settings
          </button>
        </div>
      </div>

      {activeTab === 'Articles' ? (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsAddingPost(true)}
              className="bg-app-primary text-app-surface px-6 py-3 font-black uppercase text-xs tracking-widest hover:opacity-90 flex items-center gap-2"
            >
              <Plus size={16} />
              New Article
            </button>
          </div>

          {isAddingPost && (
            <div className="bg-app-surface border border-app-border p-6 shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary mb-6 border-b border-app-border pb-4">Create New Article</h2>
              <form onSubmit={handleAddPost} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Title</label>
                  <input 
                    type="text" 
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Content</label>
                  <textarea 
                    rows={8}
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-medium outline-none focus:border-app-primary resize-y"
                    required
                  ></textarea>
                </div>
                <div className="flex gap-4 border-t border-app-border pt-6">
                  <button 
                    type="button"
                    onClick={() => setIsAddingPost(false)}
                    className="px-6 py-3 border-2 border-app-border font-black uppercase text-xs tracking-widest text-app-secondary hover:text-app-primary hover:border-app-primary"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-app-primary text-app-surface px-8 py-3 font-black uppercase text-xs tracking-widest hover:opacity-90"
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Post List */}
          <div className="bg-app-surface border border-app-border overflow-hidden">
            <div className="p-4 border-b border-app-border flex justify-between items-center bg-app-bg/50">
              <div className="relative w-64">
                <input 
                  type="text" 
                  placeholder="SEARCH ARTICLES..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-app-surface border border-app-border pl-10 pr-4 py-2 text-xs font-black outline-none focus:border-app-primary placeholder:text-[10px] placeholder:tracking-widest"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-app-secondary" size={14} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-app-bg text-[10px] font-black uppercase tracking-[0.2em] text-app-secondary border-b border-app-border">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-border font-medium">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-app-secondary font-black uppercase tracking-widest text-xs">
                        Loading articles...
                      </td>
                    </tr>
                  ) : posts.filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                    posts.filter(p => p.title?.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
                      <tr key={post.id} className="hover:bg-app-bg/50 transition-colors">
                        <td className="px-6 py-4 text-app-primary font-black uppercase text-xs">
                          {post.title}
                          <div className="text-[10px] tracking-widest text-app-secondary mt-1">
                            {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Draft'} • {post.category || 'Uncategorized'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-[#10B981]/10 text-[#10B981]`}
                          >
                            <Eye size={12} />
                            Published
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-app-bg text-app-secondary transition-colors" title="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-app-danger/10 text-app-danger transition-colors" title="Delete">
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-app-secondary font-black uppercase tracking-widest text-xs">
                        No articles found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveAdSettings} className="bg-app-surface border border-app-border p-8 rounded-none shadow-sm space-y-8">
          <div className="flex justify-between items-center border-b border-app-border pb-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-app-secondary">Ad Banner Configuration</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-[10px] font-black uppercase tracking-widest text-app-secondary">Status</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={adSettings.isActive}
                  onChange={(e) => setAdSettings({...adSettings, isActive: e.target.checked})}
                />
                <div className={`w-10 h-5 transition-colors ${adSettings.isActive ? 'bg-app-primary' : 'bg-app-border'}`}>
                  <div className={`absolute left-1 top-1 w-3 h-3 bg-app-surface transition-transform ${adSettings.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Width</label>
              <input 
                type="text" 
                value={adSettings.width}
                onChange={(e) => setAdSettings({...adSettings, width: e.target.value})}
                placeholder="e.g. 100%, 728px, max-w-4xl"
                className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-primary transition-colors"
                required
              />
              <p className="text-[10px] font-medium text-app-secondary">Standard widths: 100%, 728px, 970px.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Height</label>
              <input 
                type="text" 
                value={adSettings.height}
                onChange={(e) => setAdSettings({...adSettings, height: e.target.value})}
                placeholder="e.g. 90px, 120px, 250px"
                className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-bold outline-none focus:border-app-primary transition-colors"
                required
              />
              <p className="text-[10px] font-medium text-app-secondary">Standard heights: 90px, 120px, 250px, auto.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Raw HTML Code</label>
            <textarea 
              rows={8}
              value={adSettings.htmlContent}
              onChange={(e) => setAdSettings({...adSettings, htmlContent: e.target.value})}
              placeholder="<div><img src='...' /></div>"
              className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-mono outline-none focus:border-app-primary transition-colors resize-y whitespace-pre"
              required
            ></textarea>
            <p className="text-[10px] font-medium text-app-secondary">Write or paste pure HTML code. This will be rendered directly inside the banner wrapper.</p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-app-secondary opacity-60">Custom CSS Code</label>
            <textarea 
              rows={8}
              value={adSettings.cssContent}
              onChange={(e) => setAdSettings({...adSettings, cssContent: e.target.value})}
              placeholder=".banner-wrapper { ... }"
              className="w-full bg-app-bg border-2 border-app-border px-4 py-3 text-sm font-mono outline-none focus:border-app-primary transition-colors resize-y whitespace-pre"
            ></textarea>
            <p className="text-[10px] font-medium text-app-secondary">Optional. Scoped CSS for elements written in the HTML above.</p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button 
              type="submit"
              disabled={isSavingAd}
              className="flex items-center gap-3 bg-app-primary text-app-surface px-8 py-4 rounded-none font-black uppercase text-xs tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSavingAd ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSavingAd ? 'Saving...' : 'Save Configuration'}
            </button>
            {saveSuccess && (
              <span className="text-[10px] font-black uppercase tracking-widest text-app-success">Saved Successfully!</span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
