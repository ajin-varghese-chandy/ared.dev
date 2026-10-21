import Image from "next/image";
import {
  site,
  navigation,
  highlights,
  featuredCard,
  projects,
  stack,
  aiToolsSection,
} from "@/lib/content";
import { DigitBackground } from "./components/digit-background";
import { Sidebar } from "./components/tree-nav";

function Portrait() {
  return (
    <div className="inline-block border border-border-strong p-3">
      <div className="relative h-[140px] w-[140px] overflow-hidden sm:h-[160px] sm:w-[160px]">
        <Image
          src="/logo.jpeg"
          alt={site.name}
          fill
          className="object-cover grayscale"
          sizes="160px"
          priority
        />
      </div>
    </div>
  );
}

function ProfileHighlights() {
  return (
    <div className="mt-6 space-y-3">
      {highlights.map((highlight, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-5 w-px bg-border-strong" />
          <p className="text-[15px] text-text">
            {highlight.text}
            {highlight.link && (
              <>
                {" "}
                <a
                  href={highlight.link.href}
                  className="underline underline-offset-4 decoration-border-strong hover:decoration-text-soft transition-colors"
                >
                  {highlight.link.text}
                </a>
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

function FeaturedCard() {
  return (
    <div className="border border-border bg-surface p-6 sm:p-7">
      <h3 className="text-lg font-bold text-text">{featuredCard.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-text-soft">
        {featuredCard.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={featuredCard.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="border border-dashed border-border-dashed px-5 py-2.5 text-sm text-text transition-colors duration-200 hover:border-text-soft hover:text-text-soft"
        >
          {featuredCard.cta}
        </a>
        <a
          href={featuredCard.secondaryHref}
          className="text-sm text-text-muted transition-colors duration-200 hover:text-text-soft"
        >
          {featuredCard.secondary} ↗
        </a>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="space-y-5">
      {projects.map((project) => (
        <article
          key={project.title}
          className="border border-border bg-surface p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-bold text-text">{project.title}</h3>
            <span className="text-xs text-text-muted">{project.year}</span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-wider text-text-muted">
            {project.kind}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-soft">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2 py-0.5 text-[11px] text-text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
          {(project.href || project.github) && (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-dashed border-border-dashed px-4 py-2 text-sm text-text transition-colors duration-200 hover:border-text-soft hover:text-text-soft"
                >
                  Visit ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-muted transition-colors duration-200 hover:text-text-soft"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

function StackGroups() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {stack.map((group) => (
        <div key={group.category}>
          <h3 className="text-xs uppercase tracking-wider text-text-muted">
            {group.category}
          </h3>
          <ul className="mt-3 space-y-2.5">
            {group.items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-px w-3 bg-border-strong" />
                <span className="text-[15px] text-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function AiTools() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {aiToolsSection.items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 border border-border bg-surface px-4 py-3"
        >
          <span className="h-1.5 w-1.5 shrink-0 bg-border-strong" />
          <span className="text-[15px] text-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="relative h-dvh overflow-hidden">
      <DigitBackground />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1360px] flex-col overflow-hidden rounded-none border-x border-border bg-bg sm:my-8 sm:h-[calc(100dvh-4rem)] sm:rounded-2xl sm:border">
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <Sidebar navItems={navigation} socials={site.socials} logoName={site.shortName} />

          {/* Main Content */}
          <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-bg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Profile Section */}
            <section id="profile" className="p-6 sm:p-10 md:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
                {/* Left Column */}
                <div>
                  <Portrait />

                  <h1 className="mt-8 text-2xl font-bold tracking-tight text-text sm:text-[28px]">
                    Hi, I&apos;m {site.name}!
                  </h1>
                  <p className="mt-2 text-[15px] text-text-muted">{site.role}</p>

                  <ProfileHighlights />
                </div>

                {/* Right Column - Featured Card */}
                <div className="lg:pt-0">
                  <FeaturedCard />
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 h-px bg-border sm:my-12" />

              {/* Bio */}
              <p className="max-w-2xl text-[15px] leading-[1.7] text-text-soft">
                {site.intro}
              </p>
            </section>

            {/* Projects Section */}
            <section id="projects" className="border-t border-border p-6 sm:p-10 md:p-12">
              <h2 className="text-lg font-bold text-text">Projects</h2>
              <div className="mt-6">
                <Projects />
              </div>
            </section>

            {/* Stack Section */}
            <section id="stack" className="border-t border-border p-6 sm:p-10 md:p-12">
              <h2 className="text-lg font-bold text-text">Stack</h2>
              <div className="mt-6">
                <StackGroups />
              </div>
            </section>

            {/* AI Tools Section */}
            <section id="ai-tools" className="border-t border-border p-6 sm:p-10 md:p-12">
              <h2 className="text-lg font-bold text-text">{aiToolsSection.title}</h2>
              <div className="mt-6">
                <AiTools />
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="border-t border-border p-6 sm:p-10 md:p-12">
              <h2 className="text-lg font-bold text-text">Contact</h2>
              <div className="mt-6">
                <a
                  href={`mailto:${site.email}`}
                  className="text-[15px] text-text-soft underline underline-offset-4 decoration-border-strong hover:decoration-text-soft transition-colors"
                >
                  {site.email}
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
