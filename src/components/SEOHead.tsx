import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: string;
}

export default function SEOHead({
  title = "Themavia | Premium Digital Marketplace",
  description = "Discover premium templates, bundles, and resources for modern creators at Themavia.",
  keywords = "templates, development, design, ui kits, bundles",
  author = "Themavia",
  ogImage = "https://themavia.com/og-image.jpg",
  ogUrl = "https://themavia.com",
  type = "website",
  jsonLd
}: SEOHeadProps) {
  const fullTitle = title.includes("Themavia") ? title : `${title} | Themavia`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Themavia" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {jsonLd}
        </script>
      )}
    </Helmet>
  );
}
