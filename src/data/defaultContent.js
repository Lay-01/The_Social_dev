export const DEFAULT_SITE_CONTENT = {
  contactEmail: "the.social.dev12@gmail.com",
  socialLinks: [
    { id: 'soc-1', name: 'Instagram', icon: 'ri-instagram-line', url: 'https://www.instagram.com/thesocialdev' }
  ],
  about: {
    caption: "About Us",
    heading: "Powered by Us",
    subheading: "Built on Customer Needs",
    description1: "At The Social Dev, we engineer tailored digital platforms and web applications customized to your business niche, target audience, and growth objectives. From modern UI/UX design to SEO-friendly web architecture, we build high-performance digital experiences that look stunning and drive real business growth.",
    description2: "Whether you are a startup launching your first web product, an entrepreneur building a personal brand, or an established company scaling your digital presence, our software development team delivers responsive websites, custom React web applications, and aesthetic social media content strategies that deliver measurable results.",
    ctaLabel: "Our Services",
    ctaLink: "#services",
    labels: {
      performance: "Performance & Visibility",
      audience: "Startups & Brands",
      satisfaction: "Motto: Customer Satisfaction",
      growth: "Scale Ambitious Ventures"
    },
    images: {
      growthChart: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfaa9940ba14c0f21e85fb_about-chart.svg",
      avatar1: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bc70ca14a61b4cc7a0_about-image-card-02-avater-01.avif",
      avatar2: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bcec871d961392581c_about-image-card-02-avater-02.avif",
      avatar3: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67f337bcdd5971319d41ad96_about-image-card-02-avater-03.avif",
      starIcon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfac7f22d52b417b05ec6c_star-logo.svg",
      boostIcon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67dfae58af96e37837d4ed40_about-logo.svg"
    }
  },
  services: [
    {
      id: "srv-1",
      title: "Website & Web Application Development",
      description: "Custom web development from sleek landing pages to database-driven React applications, Node.js backends, and full-stack software solutions. Built with responsive layouts, fast load speeds, and search engine optimization.",
      icon: "ri-code-s-slash-line",
      isActive: true,
      sortOrder: 1
    },
    {
      id: "srv-2",
      title: "Aesthetic Social Media Content",
      description: "High-quality, visually cohesive social media designs and creative branding campaigns crafted to elevate brand identity, boost audience engagement, and build a strong visual presence on Instagram.",
      icon: "ri-palette-line",
      isActive: true,
      sortOrder: 2
    },
    {
      id: "srv-3",
      title: "UI/UX Design & Digital Branding",
      description: "Conversion-focused user interface design paired with strategic visual identity development. We design memorable logos, color schemes, typography, and digital design systems that resonate with your customers.",
      icon: "ri-layout-4-line",
      isActive: true,
      sortOrder: 3
    },
    {
      id: "srv-4",
      title: "Designing",
      description: "T-shirt designs, Flyers, Posters, Printables.",
      icon: "ri-megaphone-line",
      isActive: true,
      sortOrder: 4
    }
  ],

  whyChooseUs: {
    caption: "Why Choose Us?",
    heading: "Built Around",
    subheading: "Your Business",
    description1: "We do not believe in cookie-cutter website templates. We engineer bespoke web solutions tailored to your unique brand, audience, and commercial goals. From responsive front-end design to robust back-end architecture, we focus on every technical detail.",
    description2: "Our development workflow leverages modern technologies like React, Node.js, and modern CSS with proven UI/UX principles. We ensure every website loads fast, ranks well on search engines, and delivers an intuitive experience across all mobile devices.",
    ctaLabel: "See Pricing",
    ctaLink: "#pricing",
    metrics: [
      {
        id: "m-1",
        value: "100%",
        label: "Quality",
        description: "Customer satisfaction guarantee on all web deliverables."
      },
      {
        id: "m-2",
        value: "Modern UI",
        label: "Cutting Edge",
        description: "Clean aesthetic designs built for conversions."
      },
      {
        id: "m-3",
        value: "Brand Growth",
        label: "Measurable Impact",
        description: "SEO optimization & social media strategies."
      }
    ]
  },
  ventures: [
    {
      id: "vtr-1",
      title: "SocialDev Web Platform",
      description: "High-performance digital agency web platform featuring dark glassmorphic UI, dynamic web tools, interactive client dashboards, and responsive layout designs.",
      url: "https://thesocialdev.co.in",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      isActive: true,
      sortOrder: 1
    },
    {
      id: "vtr-2",
      title: "Pulse Social Media Suite",
      description: "Automated social media curation and creative branding hub designed for ambitious content creators and fast-scaling digital ventures.",
      url: "https://thesocialdev.co.in/#services",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      isActive: true,
      sortOrder: 2
    },
    {
      id: "vtr-3",
      title: "Nova Web Studio & App Platform",
      description: "Full-stack SaaS web application landing page featuring real-time data sync, custom UI components, and integrated booking workflow systems.",
      url: "https://thesocialdev.co.in/#contact",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      isActive: true,
      sortOrder: 3
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What web development services does The Social Dev provide?",
      answer: "The Social Dev specializes in end-to-end custom web development. We build high-performance React web applications, database-driven business websites, modern landing pages, e-commerce web portals, UI/UX brand designs, and aesthetic social media content campaigns.",
      isActive: true,
      sortOrder: 1
    },
    {
      id: "faq-2",
      question: "Who does The Social Dev serve?",
      answer: "We partner with ambitious startups, growing enterprises, local business owners, content creators, and digital brands looking for sleek, scalable web development and visual identity solutions built around their unique goals.",
      isActive: true,
      sortOrder: 2
    },
    {
      id: "faq-3",
      question: "How long does a custom web development project take?",
      answer: "Timeline depends on project scope, custom features, and design requirements. Standard custom websites and business landing pages typically launch within 1 to 3 weeks, while complex full-stack web applications follow an agile 4-step delivery lifecycle.",
      isActive: true,
      sortOrder: 3
    },
    {
      id: "faq-4",
      question: "Are all websites built by The Social Dev mobile-responsive and SEO-optimized?",
      answer: "Yes, absolutely. Every website and web application we engineer is built mobile-first, performance-tuned for rapid PageSpeed, structured with proper heading hierarchy, dynamic metadata, clean code architecture, and modern SEO best practices.",
      isActive: true,
      sortOrder: 4
    },
    {
      id: "faq-5",
      question: "Why choose The Social Dev over generic website builders?",
      answer: "We do not rely on bloated templates or cookie-cutter builders. We engineer custom, tailored web solutions combining high-performance code (React, Node.js, modern CSS) with conversion-focused UI/UX design, transparent pricing, and direct communication.",
      isActive: true,
      sortOrder: 5
    }
  ],
  processHeader: {
    pill: "Work Process",
    headingLine1: "Our Proven 4-Step",
    headingLine2: "Web Development",
    italicAccent: "Process",
    description: "A structured, transparent engineering workflow designed to bring your vision to life seamlessly from start to finish."
  },
  processSteps: [
    {
      id: "prc-1",
      number: "01",
      category: "DISCOVERY",
      title: "Discovery",
      subtitle: "Goal & Audience Mapping",
      description: "We sit to understand your business goals, target audience, and the content you are looking for.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95fb795eb7cff2dcee5_process-card-01.svg",
      tags: ["Goal Alignment", "Target Audience", "Requirements"],
      visualType: "discovery",
      isActive: true,
      sortOrder: 1
    },
    {
      id: "prc-2",
      number: "02",
      category: "STRATEGY & DESIGN",
      title: "Strategy & Design",
      subtitle: "Roadmap & Visual UI",
      description: "We create a roadmap, sample UI, and define the content aesthetic.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95fa98b39950ae5b008_process-card-02.svg",
      tags: ["UX Roadmap", "Sample UI", "Content Aesthetic"],
      visualType: "strategy",
      isActive: true,
      sortOrder: 2
    },
    {
      id: "prc-3",
      number: "03",
      category: "DEVELOPMENT & EXECUTION",
      title: "Development & Execution",
      subtitle: "Build & Continuous Updates",
      description: "We build your website or craft your content strategy, keeping you in the loop with regular updates.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95fe82a6f61fbea3843_process-card-04.svg",
      tags: ["Clean Code", "Regular Updates", "Execution"],
      visualType: "development",
      isActive: true,
      sortOrder: 3
    },
    {
      id: "prc-4",
      number: "04",
      category: "LAUNCH & REFINEMENT",
      title: "Launch & Refinement",
      subtitle: "Deployment & Final Polish",
      description: "We deploy your project and perform final adjustments to ensure everything functions perfectly.",
      icon: "https://cdn.prod.website-files.com/67b6c656b6f9f2332b70fbdf/67e0d95f65969933d7eefa31_process-card-03.svg",
      tags: ["Production Deploy", "Final Adjustments", "QA Polish"],
      visualType: "launch",
      isActive: true,
      sortOrder: 4
    }
  ]
};


