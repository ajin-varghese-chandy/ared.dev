import Image from "next/image";
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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((project, index) => {
        const palette = palettes[index % palettes.length];
        const mark = project.title
          .split(/\\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
          .toUpperCase();

        return (
          <article
            key={project.title}
            className={`group flex h-full min-w-0 flex-col rounded-[15px] border-2 ${palette.border} ${palette.card} p-3.5 shadow-[7px_8px_0_rgba(255,255,255,0.09)] transition-transform duration-200 hover:-translate-y-1 sm:p-4`}
          >
            <div className="flex min-h-[150px] items-center justify-center rounded-[9px] bg-[#211f20] px-5 py-8 sm:min-h-[170px]">
              <span
                aria-hidden="true"
                className="select-none text-6xl font-black tracking-[-0.08em] text-[#f7f2e8] drop-shadow-[4px_4px_0_rgba(0,0,0,0.45)] sm:text-7xl"
              >
                {mark}
              </span>
            </div>

            <div className="flex flex-1 flex-col px-0.5 pb-1 pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className={`text-xl font-black uppercase leading-tight tracking-tight ${palette.ink}`}>
                  {project.title}
                </h3>
                <span className={`text-xs font-bold ${palette.muted}`}>{project.year}</span>
              </div>

              <p className={`mt-1.5 text-xs font-bold uppercase tracking-wider ${palette.muted}`}>
                {project.kind}
              </p>

              <p className={`mt-3 text-sm leading-relaxed ${palette.ink}`}>
                {project.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-sm border px-2 py-0.5 text-[10px] font-semibold ${palette.tag} ${palette.ink}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(project.href || project.github) && (
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-[#211f20] bg-[#211f20] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-black"
                    >
                      {labels.visit} ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-xs font-bold underline underline-offset-4 ${palette.ink}`}
                    >
                      {labels.github} ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function StackGroups({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {groups.map((group) => (
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

function ToolList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2.5 border border-border bg-surface px-3 py-3 sm:gap-3 sm:px-4"
        >
          <span className="h-1.5 w-1.5 shrink-0 bg-border-strong" />
          <span className="min-w-0 text-sm text-text sm:text-[15px]">{item}</span>
        </li>
      ))}
    </ul>
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
