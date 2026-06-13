import { createContext, useContext, useState, ReactNode } from 'react';

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  category: string;
  comments: Comment[];
  image: string;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development with AI',
    summary: 'Discover how AI is shaping the way we build interfaces and structure our code.',
    content: 'Long form content about AI in web development... The integration of AI into our workflows is no longer just a luxury, it is becoming a standard. Developers are finding ways to automate boilerplate code, optimize performance, and even generate UI components directly from text descriptions. As we move forward, the skill set of a developer will shift from writing code to orchestrating AI models and understanding system architecture.',
    date: 'Oct 28, 2023',
    author: 'Admin',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
    comments: [
      { id: 'c1', author: 'John Doe', content: 'Great insights!', date: 'Oct 29, 2023' }
    ]
  },
  {
    id: '2',
    title: '10 Essential Tailwind CSS Patterns',
    summary: 'Learn the most effective utility class combinations for modern UI design.',
    content: 'Tailwind CSS has revolutionized styling by providing a robust set of utility classes. To truly master Tailwind, you need to understand design patterns rather than just memorizing classes. 1. The Holy Grail Layout using flex. 2. Perfect centering with grid. 3. Aspect ratio containers for media. 4. Responsive typography scaling. 5. Custom gradient text effects...',
    date: 'Nov 02, 2023',
    author: 'Admin',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '3',
    title: 'Why Dark Mode is More Than Just a Theme',
    summary: 'The accessibility and aesthetic benefits of implementing dark mode in your apps.',
    content: 'Dark mode started as a developer preference but has quickly become a mainstream requirement. It reduces eye strain in low-light environments and can save battery life on OLED screens. However, designing a great dark mode is more than just inverting colors. It requires careful consideration of contrast ratios, elevation using shades of gray, and desaturating primary colors to avoid them overpowering the interface.',
    date: 'Nov 15, 2023',
    author: 'Admin',
    category: 'UX/UI',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '4',
    title: 'Building Scalable APIs with Node.js',
    summary: 'Best practices for structuring your Express/Node.js applications for scale.',
    content: 'When building APIs, architecture matters. Separating routes, controllers, and services allows for cleaner testing and maintainability. Using a layered architecture pattern... ',
    date: 'Dec 05, 2023',
    author: 'Admin',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '5',
    title: 'Mastering React Server Components',
    summary: 'An deep dive into the new paradigm of building React applications with server components.',
    content: 'React Server Components represent a fundamental shift in how we build React applications. By executing rendering strictly on the server, we can reduce bundle sizes and improve data fetching patterns...',
    date: 'Dec 12, 2023',
    author: 'Jane Smith',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '6',
    title: 'The Ultimate Guide to PostgreSQL Performance',
    summary: 'Indexing strategies, query optimization, and connection pooling techniques for Postgres.',
    content: 'Database performance is often the bottleneck of real-world applications. By understanding how to properly index your tables and analyze your query plans using EXPLAIN ANALYZE...',
    date: 'Jan 04, 2024',
    author: 'Michael Chen',
    category: 'Database',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '7',
    title: 'Securing Your Next.js Application',
    summary: 'Essential security measures every Next.js developer must know to protect user data.',
    content: 'Security should never be an afterthought. In this article, we cover the top vulnerabilities in Next.js applications, including CSRF, XSS, and proper session management practices...',
    date: 'Jan 18, 2024',
    author: 'Sarah Johnson',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '8',
    title: 'Introduction to GraphQL',
    summary: 'A beginner-friendly guide to querying your data with GraphQL and Apollo.',
    content: 'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a complete and understandable description of the data in your API...',
    date: 'Feb 10, 2024',
    author: 'Admin',
    category: 'Backend',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '9',
    title: 'CSS Grid vs Flexbox',
    summary: 'When to use which layout system in modern web design and how they complement each other.',
    content: 'CSS Grid and Flexbox are powerful layout modules in CSS. While Flexbox excels at 1D layouts (rows or columns), Grid is designed for 2D layouts. Understanding when to use each is key to building responsive designs efficiently...',
    date: 'Feb 18, 2024',
    author: 'Admin',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=600&auto=format&fit=crop',
    comments: []
  },
  {
    id: '10',
    title: 'State Management in 2024',
    summary: 'Comparing Redux, Zustand, Jotai, and native Context for React applications.',
    content: 'The React ecosystem has seen a cambrian explosion of state management libraries. While Redux remains popular, newer libraries like Zustand and Jotai offer simpler APIs and smaller bundle sizes...',
    date: 'Mar 01, 2024',
    author: 'Jane Smith',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop',
    comments: []
  }
];

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  addComment: (postId: string, comment: Comment) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const addPost = (post: BlogPost) => {
    setPosts([post, ...posts]);
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  }

  const addComment = (postId: string, comment: Comment) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, comment] };
      }
      return p;
    }));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost, addComment }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
