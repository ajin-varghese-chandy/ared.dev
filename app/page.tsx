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

function Projects({ items }: { items: Project[] }) {
  const palettes = [
    { card: "bg-[#08a85e]", ink: "text-[#101512]", muted: "text-[#163b2b]", border: "border-[#087d49]", tag: "border-[#087d49]/60" },
    { card: "bg-[#f7f2d8]", ink: "text-[#211f1f]", muted: "text-[#393431]", border: "border-[#d8d0b4]", tag: "border-[#c8bea0]" },
    { card: "bg-[#f184a2]", ink: "text-[#24151b]", muted: "text-[#4a2633]", border: "border-[#d96787]", tag: "border-[#d96787]" },
    { card: "bg-[#8063a9]", ink: "text-[#17121e]", muted: "text-[#2b2038]", border: "border-[#684b91]", tag: "border-[#684b91]" },
    { card: "bg-[#13b4d8]", ink: "text-[#102027]", muted: "text-[#173640]", border: "border-[#078eae]", tag: "border-[#078eae]" },
    { card: "bg-[#ed1740]", ink: "text-[#250d14]", muted: "text-[#481522]", border: "border-[#c90e32]", tag: "border-[#c90e32]" },
    { card: "bg-[#ffb91f]", ink: "text-[#241b0b]", muted: "text-[#493512]", border: "border-[#db9910]", tag: "border-[#db9910]" },
  ];
  return (
    <div className="shelf-scene project-shelf">
      <div className="shelf-caption"><span>SELECTED BUILDS</span><span>{String(items.length).padStart(2, "0")} OBJECTS</span></div>
      <div className="shelf-items project-shelf-items">
        {items.map((project, index) => {
          const palette = palettes[index % palettes.length];
          const mark = project.title.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
          return (
            <article key={project.title} className="shelf-object project-object">
              <div className="project-object-face">
                <div className="project-object-topline"><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span>{project.year}</span></div>
                <div className={`project-art ${palette.card}`}>
                  <span className="project-mark">{mark}</span><span className="project-art-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="project-object-copy">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={`text-lg font-black uppercase leading-tight tracking-tight ${palette.ink}`}>{project.title}</h3>
                    <span className={`text-[11px] font-bold ${palette.muted}`}>{project.year}</span>
                  </div>
                  <p className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${palette.muted}`}>{project.kind}</p>
                  <p className={`mt-3 text-xs leading-relaxed ${palette.ink}`}>{project.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => <span key={tag} className={`rounded-sm border px-2 py-0.5 text-[9px] font-semibold ${palette.tag} ${palette.ink}`}>{tag}</span>)}
                  </div>
                  {(project.href || project.github) && <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="border border-[#211f20] bg-[#211f20] px-3 py-2 text-[10px] font-bold text-white transition-colors hover:bg-black">{labels.visit} ↗</a>}
                    {project.github && <a href={project.github} target="_blank" rel="noreferrer" className={`text-[10px] font-bold underline underline-offset-4 ${palette.ink}`}>{labels.github} ↗</a>}
                  </div>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="shelf-board" aria-hidden="true"><span /></div>
    </div>
  );
}

function StackGroups({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="shelf-scene">
      <div className="shelf-caption"><span>TOOLS OF THE TRADE</span><span>{groups.reduce((count, group) => count + group.items.length, 0)} COMPONENTS</span></div>
      <div className="stack-shelves">
        {groups.map((group, groupIndex) => <div key={group.category} className="stack-shelf-row">
          <div className="stack-category-label"><span>0{groupIndex + 1}</span><strong>{group.category}</strong></div>
          <div className="shelf-items stack-shelf-items">
            {group.items.map((item, index) => <div key={item} className="shelf-object tech-object" style={{ "--object-hue": `${(groupIndex * 67 + index * 31 + 145) % 360}` } as CSSProperties & { "--object-hue": string }}>
              <span className="tech-object-index">{String(index + 1).padStart(2, "0")}</span><span className="tech-object-name">{item}</span><span className="tech-object-base" />
            </div>)}
          </div>
          <div className="shelf-board" aria-hidden="true"><span /></div>
        </div>)}
      </div>
    </div>
  );
}

function ToolList({ items }: { items: string[] }) {
  return (
    <div className="shelf-scene">
      <div className="shelf-caption"><span>AI WORKBENCH</span><span>{items.length} TOOLS</span></div>
      <div className="shelf-items tools-shelf-items">
        {items.map((item, index) => <div key={item} className="shelf-object ai-tool-object" style={{ "--object-hue": `${(index * 53 + 265) % 360}` } as CSSProperties & { "--object-hue": string }}>
          <span className="ai-tool-symbol">{item.slice(0, 1).toUpperCase()}</span><strong>{item}</strong><span className="ai-tool-status">IN TOOLKIT</span>
        </div>)}
      </div>
      <div className="shelf-board" aria-hidden="true"><span /></div>
    </div>
  );
}

function ProfileView({ section }: { section: ProfileSection }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left Column */}
        <div>
          <Portrait avatar={section.avatar} />

          <h1 className="mt-8 text-2xl font-bold tracking-tight text-text sm:text-[28px]">
            {section.headline}
          </h1>
          <p className="mt-2 text-[15px] text-text-muted">{section.role}</p>

          <ProfileHighlights highlights={section.highlights} />
        </div>

        {/* Right Column - Featured Card */}
        {section.featuredCard && (
          <div className="lg:pt-0">
            <FeaturedCardView card={section.featuredCard} />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="my-10 h-px bg-border sm:my-12" />

      {/* Bio */}
      <p className="max-w-2xl text-[15px] leading-[1.7] text-text-soft">
        {section.bio}
      </p>
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
