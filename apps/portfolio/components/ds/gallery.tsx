import { MetaCard } from "@/components/case-study/meta-card";
import { HeroPrompt } from "@/components/command-palette";
import { CompanyLink } from "@/components/company-link";
import { CollapseDemo } from "@/components/ds/collapse-demo";
import { ExternalLink, proseLinkClass } from "@akds/ui";
import { Kicker } from "@/components/kicker";
import { RoleStack } from "@/components/landing/role-stack";
import { TestimonialCard } from "@/components/landing/testimonials";
import { LinkedText } from "@/components/linked-text";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectCard } from "@/components/projects/project-card";
import { PulseDot } from "@/components/pulse-dot";
import { SocialIconLink } from "@/components/social-icon-link";
import {
  chipClass,
  chipHoverClass,
  StackChips,
} from "@/components/stack-chips";
import { Wordmark } from "@/components/wordmark";
import {
  experience,
  projects,
  publicSocials,
  testimonials,
} from "@/data/portfolio";

// Every element here is a REAL component the site ships, rendered with REAL data
// from data/portfolio — nothing re-implemented or placeholder, so it can't drift
// from what the site renders.

// The first case-study project — the card /projects leads with. Guarded so a
// data change can't crash the page; data/portfolio.test.ts guarantees it exists.
const cardProject = projects.find((p) => p.caseStudy) ?? projects[0];
const firstTestimonial = [...testimonials].sort((a, b) => a.order - b.order)[0];
const firstRole = experience[0];

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line flex flex-wrap items-start gap-x-6 gap-y-3 border-b py-5 last:border-b-0">
      <span className="text-faint w-28 shrink-0 pt-1 font-mono text-[11px]">
        {label}
      </span>
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}

export function ComponentGallery() {
  return (
    <div>
      <Row label="project card">
        {cardProject ? (
          <div className="w-full max-w-[340px]">
            <ProjectCard project={cardProject} />
          </div>
        ) : null}
      </Row>

      <Row label="testimonial card">
        {firstTestimonial ? (
          <div className="w-full max-w-[340px]">
            <TestimonialCard t={firstTestimonial} />
          </div>
        ) : null}
      </Row>

      <Row label="meta card">
        {cardProject ? (
          <div className="w-full max-w-[280px]">
            <MetaCard project={cardProject} />
          </div>
        ) : null}
      </Row>

      <Row label="kicker">
        <div className="w-full max-w-sm">
          <Kicker label="Section header" />
        </div>
      </Row>

      <Row label="stack chips">
        <StackChips items={cardProject?.stack ?? []} />
      </Row>

      <Row label="role stack">
        {firstRole ? (
          <RoleStack lead={firstRole.stack.lead} rest={firstRole.stack.rest} />
        ) : null}
      </Row>

      <Row label="pulse dot">
        <span className="text-dim flex items-center gap-2 text-sm">
          <PulseDot />
          live status
        </span>
      </Row>

      <Row label="company link">
        <span className="text-dim text-sm">
          linked: <CompanyLink company="GrowthNation" />
        </span>
        <span className="text-dim text-sm">
          retired: <CompanyLink company="Connect4" />
        </span>
      </Row>

      <Row label="external link">
        <ExternalLink href="https://example.com" className={proseLinkClass}>
          a prose link
        </ExternalLink>
      </Row>

      <Row label="linked text">
        <p className="text-dim max-w-prose text-sm">
          <LinkedText text="Prose fields support inline links such as [a project page](https://example.com); only https is linkified, everything else stays literal text." />
        </p>
      </Row>

      <Row label="hero prompt">
        <HeroPrompt command="cat ~/about.md" />
      </Row>

      <Row label="button + collapse">
        <CollapseDemo />
      </Row>

      <Row label="social icons">
        {publicSocials.map((social) => (
          <SocialIconLink key={social.label} social={social} />
        ))}
      </Row>

      <Row label="wordmark">
        <Wordmark className="text-2xl" />
      </Row>

      <Row label="mode toggle">
        <ModeToggle />
      </Row>
    </div>
  );
}

export function Patterns() {
  return (
    <div className="space-y-6 text-sm">
      <div className="flex flex-wrap items-center gap-6">
        <span className={`${chipClass} ${chipHoverClass}`}>chip</span>
        <ExternalLink href="https://example.com" className={proseLinkClass}>
          focus me (Tab) to see the ring
        </ExternalLink>
        <span className="text-dim">
          select this text to see the{" "}
          <span className="text-ink">selection</span> colour
        </span>
      </div>
      <div className="border-line relative h-16 overflow-hidden rounded-lg border">
        <div className="scanline absolute inset-0" />
        <span className="text-faint absolute bottom-2 left-3 font-mono text-[11px]">
          .scanline
        </span>
      </div>
      <p className="text-faint text-xs">
        Cards share a hover-lift (<code className="font-mono">cardLift</code> +{" "}
        <code className="font-mono">cardLiftWrap</code>, see lib/card-lift): the
        wrapper is the hover target so the card never pulls out from under the
        cursor, and the shadow fades via opacity. Hover the project or
        testimonial card above to see it.
      </p>
    </div>
  );
}
