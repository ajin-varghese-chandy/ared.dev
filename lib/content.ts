export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "email";
};

export type Project = {
  year: string;
  title: string;
  kind: string;
  summary: string;
  tags: string[];
  href?: string;
  github?: string;
};

export type StackGroup = {
  category: string;
  items: string[];
};

export type NavItem = {
  label: string;
  href: string;
};

export type Highlight = {
  text: string;
  link?: { text: string; href: string };
};

export type FeaturedCard = {
  title: string;
  description: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

type SectionBase = {
  /** Anchor id used by the sidebar and in-page links. */
  id: string;
  /** Heading rendered above the section. */
  title: string;
  /** Sidebar label. Defaults to `title`. */
  navLabel?: string;
  /** Set to false to keep the section out of the sidebar. */
  showInNav?: boolean;
};

export type ProfileSection = SectionBase & {
  kind: "profile";
  headline: string;
  role: string;
  avatar: { src: string; alt: string };
  highlights: Highlight[];
  featuredCard?: FeaturedCard;
  bio: string;
};

export type ProjectsSection = SectionBase & {
  kind: "projects";
  items: Project[];
};

export type StackSection = SectionBase & {
  kind: "stack";
  groups: StackGroup[];
};

export type ToolsSection = SectionBase & {
  kind: "tools";
  items: string[];
};

export type ContactSection = SectionBase & {
  kind: "contact";
  email: string;
  note?: string;
};

export type Section =
  | ProfileSection
  | ProjectsSection
  | StackSection
  | ToolsSection
  | ContactSection;

export const site = {
  name: "Ajin Varghese Chandy",
  shortName: "AJIN",
  url: "https://ajin-varghese.vercel.app/",
  role: "Full Stack Product Builder",
  email: "careerajin@gmail.com",
  description:
    "Full-stack developer and indie builder from India. Spent years experimenting with web apps, Chrome extensions, and AI-powered tools. Focused on turning practical ideas into shipped products using Next.js, React, Node.js, and MongoDB. Building toward a future of independent software businesses.",
  socials: [
    { label: "github", href: "https://github.com/ajin-varghese-chandy", icon: "github" as const },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/ajin-varghese-chandy-1654a4276",
      icon: "linkedin" as const,
    },
    { label: "x", href: "https://x.com/ajiinvc", icon: "x" as const },
    { label: "email", href: "mailto:careerajin@gmail.com", icon: "email" as const },
  ] satisfies Social[],
};

/** UI copy that is not tied to a specific section. */
export const labels = {
  findMeOn: "Find me on:",
  visit: "Visit",
  github: "GitHub",
  loading: "Loading",
};

/**
 * Page sections, rendered top to bottom in this order.
 * Add, remove, reorder, or hide sections by editing this array.
 */
export const sections: Section[] = [
  {
    kind: "profile",
    id: "profile",
    title: "Profile",
    headline: `Hi, I'm ${site.name}!`,
    role: site.role,
    avatar: { src: "/logo.jpeg", alt: site.name },
    highlights: [
      { text: "Full-stack developer" },
      { text: "2,000+ ACTIVE USERS" },
      { text: "Chrome Web Store published" },
    ],
    featuredCard: {
      title: "Real-Time Speed Monitor",
      description:
        "A Chrome extension that displays live upload, download, and ping speeds directly in the browser toolbar. Built with Manifest V3 and shipped to 1,000+ active users.",
      cta: {
        label: "View Project",
        href: "https://chromewebstore.google.com/detail/real-time-internet-speed/baffnjfijbgpjchgdmbnpkloeccnhenl",
      },
      secondary: { label: "Learn more", href: "#projects" },
    },
    bio: "Full-stack developer and indie builder from India. Spent years experimenting with web apps, Chrome extensions, and AI-powered tools. Focused on turning practical ideas into shipped products using Next.js, React, Node.js, and MongoDB. Building toward a future of independent software businesses.",
  },
  {
    kind: "projects",
    id: "projects",
    title: "Projects",
    items: [
      {
        year: "2026",
        title: "DOCKET",
        kind: "Freelancer & Client Platform",
        summary:
          "A workspace for freelancers to manage clients, projects, invoices, file sharing, progress updates, and verified online payments, while clients track shared work and payment status.",
        tags: ["React", "Vite", "Tailwind CSS", "Firebase Auth", "Express", "Razorpay"],
        github: "https://github.com/ajin-varghese-chandy/docket",
      },
      {
        year: "2026",
        title: "StayInKochi",
        kind: "Full-Stack Web App",
        href: "https://stay-in-kochi.vercel.app/",
        summary:
          "A hostel and PG management platform for Kochi, with a public branch directory, tenant portal, and centralized owner console for rooms, beds, rent, food plans, maintenance, requests, payments, and chat.",
        tags: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Firebase", "Express"],
        github: "https://github.com/ajin-varghese-chandy/stayInKochi",
      },
      {
        year: "2025",
        title: "Real-Time Internet Speed Monitor",
        kind: "Chrome Extension",
        summary:
          "Live upload, download, and ping in the browser toolbar. Shipped to the Chrome Web Store, 1,000+ active users.",
        tags: ["chrome mv3", "javascript", "performance"],
        href: "https://chromewebstore.google.com/detail/real-time-internet-speed/baffnjfijbgpjchgdmbnpkloeccnhenl",
        github: "https://github.com/aajinn/real-time-internet-speed",
      },
    ],
  },
  {
    kind: "stack",
    id: "stack",
    title: "Stack",
    groups: [
      {
        category: "frontend",
        items: ["React", "Next.js", "TypeScript", "Tailwind"],
      },
      {
        category: "backend",
        items: ["Node.js", "Express", "REST", "WebSockets"],
      },
      { category: "data", items: ["PostgreSQL", "MongoDB", "Redis"] },
      {
        category: "platform",
        items: ["Docker", "CI/CD", "Chrome Ext", "AI APIs"],
      },
    ],
  },
  {
    kind: "tools",
    id: "ai-tools",
    title: "AI Tools",
    items: ["OpenCode", "Kimi", "Claude", "DeepSeek"],
  },
  {
    kind: "contact",
    id: "contact",
    title: "Contact",
    email: site.email,
  },
];

/** Sidebar links are derived from the sections above. */
export const navigation: NavItem[] = sections
  .filter((section) => section.showInNav !== false)
  .map((section) => ({
    label: section.navLabel ?? section.title,
    href: `#${section.id}`,
  }));
