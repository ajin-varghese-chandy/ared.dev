import {
  site,
  labels,
  sections,
  type Project,
  type StackGroup,
  type ProfileSection,
} from "@/lib/content";

const profile = sections.find((section): section is ProfileSection => section.kind === "profile");
const projects = sections.find((section): section is Extract<(typeof sections)[number], { kind: "projects" }> => section.kind === "projects");
const stack = sections.find((section): section is Extract<(typeof sections)[number], { kind: "stack" }> => section.kind === "stack");
const tools = sections.find((section): section is Extract<(typeof sections)[number], { kind: "tools" }> => section.kind === "tools");
const contact = sections.find((section): section is Extract<(typeof sections)[number], { kind: "contact" }> => section.kind === "contact");

const techMarks: Record<string, string> = {
  React: "⚛", "Next.js": "N", TypeScript: "TS", Tailwind: "≈", "Node.js": "JS",
  Express: "ex", REST: "API", WebSockets: "↔", PostgreSQL: "PG", MongoDB: "🍃",
  Redis: "R", Docker: "▰", "CI/CD": "↻", "Chrome Ext": "C", "AI APIs": "✳",
};

const toolMarks: Record<string, string> = {
  OpenCode: "⌘", Kimi: "K", Claude: "✳", DeepSeek: "DS",
};

function Shelf({ title, icon, children, className = "" }: {
  title: string; icon: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={`shelf-row ${className}`}>
      <div className="shelf-label"><span>{icon}</span>{title}</div>
      <div className="shelf-content">{children}</div>
      <div className="shelf-plank" aria-hidden="true" />
      <div className="shelf-support shelf-support-left" aria-hidden="true" />
      <div className="shelf-support shelf-support-right" aria-hidden="true" />
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tones = ["mint", "cream", "rose", "violet"];
  const initials = project.title.split(/[\\s-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (
    <article className={`project-object ${tones[index % tones.length]}`}>
      <div className="project-art">
        <span className="project-initials">{initials}</span>
        <span className="project-year">{project.year}</span>
      </div>
      <div className="project-copy">
        <div className="project-heading">
          <h3>{project.title}</h3>
          <span className="project-kind">{project.kind}</span>
        </div>
        <p>{project.summary}</p>
        <div className="project-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {project.href && <a href={project.href} target="_blank" rel="noreferrer">{labels.visit} ↗</a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
        </div>
      </div>
    </article>
  );
}

function TechTile({ name }: { name: string }) {
  return <div className="tech-tile"><span className="tech-mark">{techMarks[name] ?? name.slice(0, 2).toUpperCase()}</span><span>{name}</span></div>;
}

export default function Home() {
  const allStack: StackGroup[] = stack?.groups ?? [];
  const stackItems = allStack.flatMap((group) => group.items);
  const projectItems = projects?.items ?? [];
  const toolItems = tools?.items ?? [];
  const activeUsers = profile?.highlights.find((item) => item.text.includes("USERS"))?.text ?? "Independent builder";
  const rating = profile?.highlights.find((item) => item.text.includes("/5"));
  const totalProjects = projectItems.length;

  return (
    <main className="portfolio-scene">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="portfolio-shell">
        <header className="portfolio-header">
          <a href="#top" className="brand-mark">AJ<span>.</span></a>
          <div className="header-copy"><p>INDEPENDENT DEVELOPER / PORTFOLIO</p><h1>Things I’ve built<span>.</span></h1></div>
          <nav aria-label="Main navigation">
            <a href="#projects">Projects</a><a href="#stack">Stack</a><a href="#tools">Tools</a><a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="shelf-scene" id="top">
          <div className="shelf-frame shelf-frame-top" />
          <div className="shelf-frame shelf-frame-left" />
          <div className="shelf-frame shelf-frame-right" />

          <Shelf title="Projects" icon="✳" className="projects-shelf" >
            <div className="project-grid" id="projects">
              {projectItems.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
            </div>
          </Shelf>

          <Shelf title="Tech Stack" icon="▱" className="stack-shelf">
            <div className="tech-grid" id="stack">{stackItems.map((item) => <TechTile key={item} name={item} />)}</div>
          </Shelf>

          <Shelf title="Tools" icon="⌘" className="tools-shelf">
            <div className="tech-grid tools-grid" id="tools">
              {toolItems.map((item) => <div className="tech-tile tool-tile" key={item}><span className="tech-mark">{toolMarks[item] ?? item.slice(0, 2).toUpperCase()}</span><span>{item}</span></div>)}
              <div className="tech-tile tool-tile"><span className="tech-mark">⌁</span><span>GitHub</span></div>
              <div className="tech-tile tool-tile"><span className="tech-mark">▲</span><span>Vercel</span></div>
              <div className="tech-tile tool-tile"><span className="tech-mark">◈</span><span>Postman</span></div>
            </div>
          </Shelf>

          <Shelf title="At a glance" icon="▥" className="stats-shelf">
            <div className="stats-grid">
              <div className="stat-object"><span className="stat-symbol">↗</span><strong>{activeUsers.replace(" ACTIVE USERS", "+")}</strong><small>People reached</small></div>
              <div className="stat-object"><span className="stat-symbol">★</span><strong>{rating?.text ?? "Builder"}</strong><small>Chrome Web Store rating</small>{rating?.link && <a href={rating.link.href} target="_blank" rel="noreferrer" aria-label="View Chrome Web Store rating">★★★★★</a>}</div>
              <div className="stat-object"><span className="stat-symbol">&lt;/&gt;</span><strong>{totalProjects}+</strong><small>Featured projects</small></div>
              <div className="profile-object"><span className="orbit">✳</span><strong>{site.name}</strong><small>{site.role}</small><a href="#contact">Let’s talk ↗</a></div>
            </div>
          </Shelf>

          <div className="shelf-bottom" />
        </div>

        <footer className="portfolio-footer" id="contact">
          <div><span className="footer-kicker">HAVE A PROJECT IN MIND?</span><h2>Let’s build something useful.</h2></div>
          <div className="footer-links">
            <a href={contact ? `mailto:${contact.email}` : `mailto:${site.email}`}>{contact?.email ?? site.email} ↗</a>
            {site.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label} ↗</a>)}
          </div>
        </footer>
      </div>
    </main>
  );
}
