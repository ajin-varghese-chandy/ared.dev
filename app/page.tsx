import Image from "next/image";
import type { CSSProperties } from "react";
import {
  site,
  labels,
  navigation,
  sections,
  type FeaturedCard,
  type Highlight,
  type ProfileSection,
  type Project,
  type Section,
  type StackGroup,
} from "@/lib/content";
import { DigitBackground } from "./components/digit-background";
import { Sidebar } from "./components/tree-nav";

function Portrait({ avatar }: { avatar: ProfileSection["avatar"] }) {
  return (
    <div className="inline-block border border-border-strong p-3">
      <div className="relative h-[140px] w-[140px] overflow-hidden sm:h-[160px] sm:w-[160px]">
        <Image
          src={avatar.src}
          alt={avatar.alt}
          fill
          className="object-cover grayscale"
          sizes="(min-width: 640px) 160px, 140px"
          priority
        />
      </div>
    </div>
  );
}

function ProfileHighlights({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="mt-6 space-y-3">
      {highlights.map((highlight, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-5 w-px bg-border-strong" />
          <p className="text-[15px] text-text">
            {highlight.text === "2,000+ ACTIVE USERS" ? (
              <span className="active-users-fire">{highlight.text}</span>
            ) : (
              highlight.text
            )}
            {highlight.link && (
              <>
                {" "}
                <a
                  href={highlight.link.href}
                  className={highlight.text === "4.2/5" ? "rating-toast-link" : "underline underline-offset-4 decoration-border-strong hover:decoration-text-soft transition-colors"}
                  title={highlight.text === "4.2/5" ? "Rated 4.2 out of 5 on the Chrome Web Store. View the Real-Time Internet Speed Monitor extension." : undefined}
                  aria-label={highlight.text === "4.2/5" ? "4.2 out of 5 stars on the Chrome Web Store. Open extension listing." : undefined}
                  target={highlight.text === "4.2/5" ? "_blank" : undefined}
                  rel={highlight.text === "4.2/5" ? "noreferrer" : undefined}
                >
                  {highlight.text === "4.2/5" ? (
                    <span className="rating-stars" aria-hidden="true">{highlight.link.text}</span>
                  ) : (
                    highlight.link.text
                  )}
                </a>
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

function FeaturedCardView({ card }: { card: FeaturedCard }) {
  return (
    <div className="border border-border bg-surface p-6 sm:p-7">
      <h3 className="text-lg font-bold text-text">{card.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-text-soft">
        {card.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={card.cta.href}
          target="_blank"
          rel="noreferrer"
          className="border border-dashed border-border-dashed px-5 py-2.5 text-sm text-text transition-colors duration-200 hover:border-text-soft hover:text-text-soft"
        >
          {card.cta.label}
        </a>
        {card.secondary && (
          <a
            href={card.secondary.href}
            className="text-sm text-text-muted transition-colors duration-200 hover:text-text-soft"
          >
            {card.secondary.label} ↗
          </a>
        )}
      </div>
    </div>
  );
}

function RackFrame() {
  return (
    <>
      <div className="rack-leg rack-leg-back rack-leg-back-left" aria-hidden="true" />
      <div className="rack-leg rack-leg-back rack-leg-back-right" aria-hidden="true" />
      <div className="rack-upright rack-upright-left" aria-hidden="true" />
      <div className="rack-upright rack-upright-right" aria-hidden="true" />
    </>
  );
}

function Projects({ items }: { items: Project[] }) {
  const palettes = [
    { card: "#08a85e", ink: "#101512", muted: "#163b2b" },
    { card: "#f7f2d8", ink: "#211f1f", muted: "#393431" },
    { card: "#f184a2", ink: "#24151b", muted: "#4a2633" },
    { card: "#8063a9", ink: "#17121e", muted: "#2b2038" },
    { card: "#13b4d8", ink: "#102027", muted: "#173640" },
  ];
  return (
    <div className="shelf-scene">
      <div className="shelf-caption"><span>SELECTED BUILDS</span><span>{items.length} PROJECTS</span></div>
      <div className="physical-rack project-rack">
        <RackFrame />
        {Array.from({ length: Math.ceil(items.length / 2) }, (_, shelfIndex) => (
          <div className="rack-level" key={shelfIndex}>
            <div className="rack-contents project-rack-contents">
              {items.slice(shelfIndex * 2, shelfIndex * 2 + 2).map((project, index) => {
                const palette = palettes[(shelfIndex * 2 + index) % palettes.length];
                const mark = project.title.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
                return (
                  <article className="project-product" key={project.title} style={{ "--product-color": palette.card, "--product-ink": palette.ink, "--product-muted": palette.muted } as CSSProperties & { "--product-color": string; "--product-ink": string; "--product-muted": string }}>
                    <div className="product-spine"><span>{project.title}</span><small>{project.year}</small></div>
                    <div className="product-front">
                      <div className="product-brandline"><span>AJIN / DIGITAL WORKS</span><span>{project.year}</span></div>
                      <div className="product-art"><strong>{mark}</strong></div>
                      <h3>{project.title}</h3>
                      <p className="product-kind">{project.kind}</p>
                      <p className="product-summary">{project.summary}</p>
                      <div className="product-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <div className="product-links">
                        {project.href && <a href={project.href} target="_blank" rel="noreferrer">{labels.visit} ↗</a>}
                        {project.github && <a href={project.github} target="_blank" rel="noreferrer">{labels.github} ↗</a>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="wood-shelf"><span /></div>
          </div>
        ))}
      </div>
    </div>
  );
}


const brandIcons: Record<string, string> = {
  react: "react",
  "next.js": "nextdotjs",
  typescript: "typescript",
  tailwind: "tailwindcss",
  "node.js": "nodedotjs",
  express: "express",
  postgresql: "postgresql",
  mongodb: "mongodb",
  redis: "redis",
  docker: "docker",
  "ci/cd": "githubactions",
  "chrome ext": "googlechrome",
  "ai apis": "openai",
  opencode: "opencode",
  kimi: "moonshot",
  claude: "anthropic",
  deepseek: "deepseek",
};
function BrandIcon({ name, tone = "light" }: { name: string; tone?: "light" | "dark" }) {
  const slug = brandIcons[name.toLowerCase()];
  if (!slug) return <span className="brand-icon-fallback" aria-hidden="true">{name.slice(0, 2).toUpperCase()}</span>;
  return <img className={`brand-icon brand-icon-${tone}`} src={`https://cdn.simpleicons.org/${slug}/${tone === "light" ? "FFFFFF" : "171717"}`} alt="" loading="lazy" />;
}

function StackGroups({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="shelf-scene">
      <div className="shelf-caption"><span>TOOLS OF THE TRADE</span><span>{groups.reduce((n, group) => n + group.items.length, 0)} TECHNOLOGIES</span></div>
      <div className="physical-rack compact-rack single-tech-rack">
        <RackFrame />
        <div className="rack-level single-tech-level">
          <div className="tech-rack-scroll">
            <div className="tech-rack-contents">
              {groups.map((group, groupIndex) => (
                <div className="tech-category-group" key={group.category}>
                  <div className="rack-category">{group.category}</div>
                  <div className="tech-category-items">
                    {group.items.map((item, index) => (
                      <div className="tech-book" key={item} style={{ "--book-hue": (groupIndex * 67 + index * 31 + 145) % 360 } as CSSProperties & { "--book-hue": number }}>
                        <span className="book-cap" />
                        <span className="tech-book-icon"><BrandIcon name={item} /></span>
                        <strong>{item}</strong>
                        <small>{String(index + 1).padStart(2, "0")}</small>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="wood-shelf"><span /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolList({ items }: { items: string[] }) {
  return (
    <div className="shelf-scene">
      <div className="shelf-caption"><span>AI WORKBENCH</span><span>{items.length} TOOLS</span></div>
      <div className="physical-rack compact-rack">
        <RackFrame />
        <div className="rack-level">
          <div className="rack-contents ai-rack-contents">
            {items.map((item, index) => <div className="ai-product" key={item} style={{ "--tool-hue": (index * 53 + 265) % 360 } as CSSProperties & { "--tool-hue": number }}>
              <div className="ai-product-cap" /><div className="ai-product-label"><span className="ai-product-icon"><BrandIcon name={item} /></span><strong>{item}</strong><small>AI TOOLKIT</small></div>
            </div>)}
          </div>
          <div className="wood-shelf"><span /></div>
        </div>
      </div>
    </div>
  );
}


function ProfileView({ section }: { section: ProfileSection }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <Portrait avatar={section.avatar} />
          <h1 className="mt-8 text-2xl font-bold tracking-tight text-text sm:text-[28px]">{section.headline}</h1>
          <p className="mt-2 text-[15px] text-text-muted">{section.role}</p>
          <ProfileHighlights highlights={section.highlights} />
        </div>
        {section.featuredCard && (
          <div className="lg:pt-0">
            <FeaturedCardView card={section.featuredCard} />
          </div>
        )}
      </div>
      <div className="my-10 h-px bg-border sm:my-12" />
      <p className="max-w-2xl text-[15px] leading-[1.7] text-text-soft">{section.bio}</p>
    </>
  );
}

function SectionContent({ section }: { section: Section }) {
  switch (section.kind) {
    case "profile":
      return <ProfileView section={section} />;
    case "projects":
      return <Projects items={section.items} />;
    case "stack":
      return <StackGroups groups={section.groups} />;
    case "tools":
      return <ToolList items={section.items} />;
    case "contact":
      return (
        <div>
          <a
            href={`mailto:${section.email}`}
            className="break-words text-[15px] text-text-soft underline underline-offset-4 decoration-border-strong hover:decoration-text-soft transition-colors"
          >
            {section.email}
          </a>
          {section.note && (
            <p className="mt-3 text-sm text-text-muted">{section.note}</p>
          )}
        </div>
      );
  }
}

const sectionClassName =
  "scroll-mt-20 p-5 sm:p-10 md:scroll-mt-0 md:p-12";

function SectionView({
  section,
  isFirst,
}: {
  section: Section;
  isFirst: boolean;
}) {
  return (
    <section
      id={section.id}
      className={
        isFirst ? sectionClassName : `border-t border-border ${sectionClassName}`
      }
    >
      {section.kind !== "profile" && (
        <h2 className="text-lg font-bold text-text">{section.title}</h2>
      )}
      <div className={section.kind === "profile" ? "" : "mt-6"}>
        <SectionContent section={section} />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-dvh md:h-dvh md:overflow-hidden">
      <DigitBackground />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[1360px] flex-col border-x border-border bg-bg sm:my-8 sm:min-h-[calc(100dvh-4rem)] sm:rounded-2xl sm:border md:h-[calc(100dvh-4rem)] md:min-h-0 md:overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <Sidebar
            navItems={navigation}
            socials={site.socials}
            logoName={site.shortName}
            socialsLabel={labels.findMeOn}
          />

          {/* Main Content */}
          <main className="min-h-0 flex-1 bg-bg md:overflow-y-auto md:overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sections.map((section, index) => (
              <SectionView
                key={section.id}
                section={section}
                isFirst={index === 0}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
