export type Social = {
  label: string;
  href: string;
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

export const site = {
  name: "Ajin Varghese Chandy",
  role: "Full Stack Product Builder",
  email: "careerajin@gmail.com",
  intro:
    "I design and ship fast, reliable web products — automation, real-time systems, and AI integrations.",
  socials: [
    { label: "github", href: "https://github.com/ajin-varghese-chandy" },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/ajin-varghese-chandy",
    },
    { label: "x", href: "https://x.com/ajiinvc" },
  ] satisfies Social[],
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
  },
  {
    year: "2025",
    title: "MongooseNet",
    kind: "Open-source NuGet package",
    summary:
      "A C# library for schema-flexible data handling on top of MongoDB — typed access without losing document flexibility.",
    tags: [".net", "c#", "mongodb"],
    href: "https://www.nuget.org/packages/MongooseNet/",
    github: "https://github.com/aajinn/MongooseNet",
  },
  {
    year: "2026",
    title: "TaskFlow",
    kind: "Full-stack product",
    summary:
      "Project management for small teams with live collaboration over WebSockets, JWT auth, and role-based workspaces.",
    tags: ["next.js", "express", "websockets", "postgresql"],
    github: "https://github.com/aajinn",
  },
];

export const stack: StackGroup[] = [
  { category: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { category: "backend", items: ["Node.js", "Express", "REST", "WebSockets"] },
  { category: "data", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { category: "platform", items: ["Docker", "CI/CD", "Chrome Ext", "AI APIs"] },
];
