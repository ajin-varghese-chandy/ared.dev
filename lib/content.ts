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

export type AiToolsSection = {
  title: string;
  items: string[];
};

export type Highlight = {
  text: string;
  link?: { text: string; href: string };
};

export const site = {
  name: "Ajin Varghese Chandy",
  shortName: "AJIN",
  role: "Full Stack Product Builder",
  email: "careerajin@gmail.com",
  intro:
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

export const navigation: NavItem[] = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "AI Tools", href: "#ai-tools" },
  { label: "Contact", href: "#contact" },
];

export const highlights: Highlight[] = [
  { text: "Full-stack developer" },
  { text: "2,000+ ACTIVE USERS" },
  { text: "Chrome Web Store published" },
];

export const featuredCard = {
  title: "Real-Time Speed Monitor",
  description:
    "A Chrome extension that displays live upload, download, and ping speeds directly in the browser toolbar. Built with Manifest V3 and shipped to 1,000+ active users.",
  cta: "View Project",
  ctaHref:
    "https://chromewebstore.google.com/detail/real-time-internet-speed/baffnjfijbgpjchgdmbnpkloeccnhenl",
  secondary: "Learn more",
  secondaryHref: "#projects",
};

export const projects: Project[] = [
  {
    year: "2025",
    title: "Real-Time Internet Speed Monitor",
    kind: "Chrome Extension",
    summary:
      "Live upload, download, and ping in the browser toolbar. Shipped to the Chrome Web Store, 1,000+ active users.",
    tags: ["chrome mv3", "javascript", "performance"],
    href: "https://chromewebstore.google.com/detail/real-time-internet-speed/baffnjfijbgpjchgdmbnpkloeccnhenl",
    github: "https://github.com/aajinn/real-time-internet-speed",
  }
];

export const stack: StackGroup[] = [
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
];

export const aiToolsSection: AiToolsSection = {
  title: "AI Tools",
  items: ["OpenCode", "Kimi", "Claude", "DeepSeek"],
};
