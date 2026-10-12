import { CompanyLink } from "@/components/company-link";
import { ExternalLink, proseLinkClass } from "@/components/external-link";
import { Kicker } from "@/components/kicker";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectCard } from "@/components/projects/project-card";
import { PulseDot } from "@/components/pulse-dot";
import {
  chipClass,
  chipHoverClass,
  StackChips,
} from "@/components/stack-chips";
import { Wordmark } from "@/components/wordmark";
import { projects } from "@/data/portfolio";

// Everything here is a REAL component the site renders, with REAL data from
// data/portfolio — nothing is re-implemented or placeholder, so the page shows
// exactly what ships and can't drift from it. (The shadcn ui/button + ui/card
// primitives are deliberately NOT shown: nothing on the site imports them; the
// card the site actually renders is ProjectCard, below.)

// The first case-study project — the same card /projects leads with. Guarded so
// a data change can't crash the page; data/portfolio.test.ts guarantees it
// exists in practice.
const cardProject = projects.find((p) => p.caseStudy) ?? projects[0];

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
      <div className="flex flex-wrap items-center gap-3">{children}</div>
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

      <Row label="kicker">
        <div className="w-full max-w-sm">
          <Kicker label="Section header" />
        </div>
      </Row>

      <Row label="stack chips">
        <StackChips items={cardProject?.stack ?? []} />
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
    </div>
  );
}
