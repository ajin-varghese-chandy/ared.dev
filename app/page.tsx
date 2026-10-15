import { projects, site, stack } from "@/lib/content";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "stack", href: "#stack" },
  { label: "contact", href: "#contact" },
];

/** Section header, styled like a shell command. */
function Cmd({ cmd, meta }: { cmd: string; meta?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-strong pb-3">
      <p className="text-sm font-medium text-green">
        <span className="text-ink-mute select-none">$ </span>
        {cmd}
      </p>
      {meta ? (
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------- Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <a
            href="#top"
            className="text-[13px] text-ink-soft transition-colors hover:text-green"
          >
            <span className="text-ink-mute">~</span> {site.name.split(" ")[0].toLowerCase()}
            <span className="caret ml-0.5 h-[0.9em]" aria-hidden="true" />
          </a>

          <nav className="flex items-center gap-5 text-[13px] sm:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink-soft transition-colors hover:text-green"
              >
                ./{link.label}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="border border-line-strong px-3 py-1.5 text-green transition-colors hover:border-green hover:bg-green hover:text-bg"
            >
              $ mail
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* --------------------------------------------------------------- Hero */}
        <section
          id="top"
          className="container-page flex min-h-[calc(100svh-3.5rem)] flex-col justify-center gap-7 py-14 sm:gap-9"
        >
          <p className="text-sm text-green">
            <span className="text-ink-mute select-none">$ </span>whoami
          </p>

          <div>
            <h1 className="text-[clamp(1.75rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink">
              {site.name}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-[clamp(0.95rem,2.4vw,1.25rem)] text-green">
              <span className="text-ink-mute select-none">&gt; </span>
              {site.role}
              <span className="caret" aria-hidden="true" />
            </p>
          </div>

          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            {site.intro}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px]">
            <a
              href={`mailto:${site.email}`}
              className="bg-green px-4 py-2.5 font-medium text-bg transition-opacity hover:opacity-80"
            >
              {site.email}
            </a>
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-green hover:decoration-green"
              >
                {social.label}
              </a>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------------- Work */}
        <section
          id="work"
          className="container-page border-t border-line py-14 sm:py-20"
        >
          <Cmd cmd="ls ./projects" meta={`${projects.length} entries`} />

          <ul className="mt-2">
            {projects.map((project, i) => (
              <li key={project.title}>
                <a
                  href={project.href ?? project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-12 gap-x-5 gap-y-2 border-b border-line py-6 transition-colors hover:border-line-strong"
                >
                  <span className="col-span-2 font-medium text-ink-mute transition-colors group-hover:text-green sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="col-span-10 sm:col-span-7">
                    <h3 className="text-lg leading-snug text-ink transition-colors group-hover:text-green sm:text-xl">
                      {project.title}
                      <span className="ml-2 font-normal text-ink-mute">
                        [{project.year}]
                      </span>
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                      {project.kind}
                    </p>
                    <p className="mt-3 max-w-prose text-[14px] leading-relaxed text-ink-soft">
                      {project.summary}
                    </p>
                  </div>

                  <div className="col-span-12 flex flex-wrap gap-1.5 self-start sm:col-span-4 sm:justify-end">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2 py-0.5 text-[11px] text-ink-mute transition-colors group-hover:border-line-strong group-hover:text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* -------------------------------------------------------------- Stack */}
        <section
          id="stack"
          className="container-page border-t border-line py-14 sm:py-20"
        >
          <Cmd cmd="cat ./stack.txt" meta="4 groups" />

          <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <div key={group.category}>
                <p className="border-b border-line pb-2 text-[11px] uppercase tracking-[0.2em] text-green">
                  {group.category}
                </p>
                <ul className="mt-3 space-y-1.5 text-[14px] text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="text-ink-mute select-none">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ Contact */}
        <section
          id="contact"
          className="container-page border-t border-line py-14 sm:py-20"
        >
          <Cmd cmd="echo $CONTACT" meta="channel open" />

          <p className="mt-10 text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight tracking-tight text-ink">
            Let&apos;s build something
            <span className="block text-green">
              that doesn&apos;t fall over.
            </span>
          </p>

          <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[14px] leading-relaxed text-ink-soft">
              Product, prototype, or something that keeps falling over in
              production — send it over. I reply within a day.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="shrink-0 border border-line-strong px-5 py-3 text-[14px] text-green transition-colors hover:border-green hover:bg-green hover:text-bg"
            >
              $ mail {site.email}
            </a>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------- Footer */}
      <footer className="relative z-10 border-t border-line">
        <div className="container-page flex flex-col gap-4 py-7 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-mute">
            © 2026 {site.name} — built with next.js
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink-mute transition-colors hover:text-green"
              >
                {social.label}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-ink-mute transition-colors hover:text-green"
            >
              email
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
