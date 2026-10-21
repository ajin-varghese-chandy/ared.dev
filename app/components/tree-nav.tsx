"use client";

import { useState } from "react";
import type { Social, NavItem } from "@/lib/content";

function TreeItem({
  item,
  isFirst,
  isLast,
  isActive,
  onClick,
}: {
  item: NavItem;
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li className="relative shrink-0 md:shrink">
      {/* Vertical trunk line */}
      <div
        className="absolute left-[7px] hidden w-px bg-border-strong md:block"
        style={{
          top: isFirst ? "14px" : "0",
          bottom: isLast ? "calc(100% - 14px)" : "0",
        }}
      />
      {/* Horizontal connector */}
      <div className="absolute left-[7px] top-[14px] hidden h-px w-[10px] bg-border-strong md:block" />
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          onClick();
          const el = document.querySelector(item.href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className={`relative block whitespace-nowrap py-1 text-sm transition-colors duration-200 md:py-[10px] md:pl-[26px] md:text-[15px] ${
          isActive
            ? "text-text"
            : "text-text-muted hover:text-text-soft"
        }`}
      >
        {item.label}
      </a>
    </li>
  );
}

function SocialButton({ social }: { social: Social }) {
  const icons: Record<Social["icon"], React.ReactNode> = {
    x: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 6.5L14.5 0.5H13L8.875 5.375L5.75 0.5H1.5L6.75 8.25L1.5 14.5H3L7.375 9.375L10.75 14.5H15L9.5 6.5ZM7.75 8.375L7.25 7.625L3.25 1.5H5.25L8.5 6.375L9 7.125L13.25 13.5H11.25L7.75 8.375Z"
          fill="currentColor"
        />
      </svg>
    ),
    linkedin: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM3 4.5H0V16H3V4.5ZM8.5 4.5H5.5V16H8.5V10.25C8.5 7.425 12 7.175 12 10.25V16H15V9.25C15 4.575 9.75 4.75 8.5 7V4.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    github: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          fill="currentColor"
        />
      </svg>
    ),
    email: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 3.5C0 2.67157 0.671573 2 1.5 2H14.5C15.3284 2 16 2.67157 16 3.5V12.5C16 13.3284 15.3284 14 14.5 14H1.5C0.671573 14 0 13.3284 0 12.5V3.5ZM1.5 3C1.22386 3 1 3.22386 1 3.5V3.75769L8 8.25769L15 3.75769V3.5C15 3.22386 14.7761 3 14.5 3H1.5ZM15 4.94231L8.30902 9.15285C8.11948 9.26922 7.88052 9.26922 7.69098 9.15285L1 4.94231V12.5C1 12.7761 1.22386 13 1.5 13H14.5C14.7761 13 15 12.7761 15 12.5V4.94231Z"
          fill="currentColor"
        />
      </svg>
    ),
  };

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center border border-dashed border-border-dashed text-text-muted transition-colors duration-200 hover:border-text-soft hover:text-text-soft"
      aria-label={social.label}
    >
      {icons[social.icon]}
    </a>
  );
}

export function Sidebar({
  navItems,
  socials,
  logoName,
  socialsLabel,
}: {
  navItems: NavItem[];
  socials: Social[];
  logoName: string;
  socialsLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <aside className="sticky top-0 z-20 w-full border-b border-border bg-surface md:static md:flex md:w-[290px] md:shrink-0 md:flex-col md:border-b-0 md:border-r">
      <div className="flex flex-col px-5 py-4 md:flex-1 md:p-8">
        {/* Logo */}
        <div className="flex items-center justify-between md:mb-10 md:block">
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-text md:text-xl"
          >
            {logoName}
          </a>

          {/* Social Links - compact row on mobile */}
          <div className="flex gap-2 md:hidden">
            {socials.map((social) => (
              <SocialButton key={social.href} social={social} />
            ))}
          </div>
        </div>

        {/* Tree Navigation */}
        <nav className="mt-3 md:mt-0 md:flex-1">
          <ul className="flex gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:overflow-visible md:pb-0">
            {navItems.map((item, i) => (
              <TreeItem
                key={item.href}
                item={item}
                isFirst={i === 0}
                isLast={i === navItems.length - 1}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="mt-auto hidden pt-8 md:block">
          <div className="relative">
            <div className="absolute left-[7px] top-[11px] h-px w-[10px] bg-border-strong" />
            <p className="pl-[26px] text-[13px] text-text-muted">
              {socialsLabel}
            </p>
          </div>
          <div className="mt-3 flex gap-3 pl-[26px]">
            {socials.map((social) => (
              <SocialButton key={social.href} social={social} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
