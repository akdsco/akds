import { CompanyLink } from "@/components/company-link";
import { ExternalLink, proseLinkClass } from "@/components/external-link";
import { Kicker } from "@/components/kicker";
import { ModeToggle } from "@/components/mode-toggle";
import { PulseDot } from "@/components/pulse-dot";
import {
  chipClass,
  chipHoverClass,
  StackChips,
} from "@/components/stack-chips";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";

// The gallery imports and renders the REAL components, so it is a live instance
// of the system — nothing here re-implements a component, so nothing can drift.

const buttonVariants = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line flex flex-wrap items-center gap-x-6 gap-y-3 border-b py-4 last:border-b-0">
      <span className="text-faint w-28 shrink-0 font-mono text-[11px]">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ComponentGallery() {
  return (
    <div>
      <Row label="button / variants">
        {buttonVariants.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </Row>

      <Row label="button / sizes">
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button size="lg">lg</Button>
        <Button disabled>disabled</Button>
      </Row>

      <Row label="card">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>
              A surface for grouped content — the project and case-study cards
              build on this.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-dim text-sm">Body content.</CardContent>
          <CardFooter className="text-faint font-mono text-[11px]">
            footer
          </CardFooter>
        </Card>
      </Row>

      <Row label="kicker">
        <div className="w-full max-w-sm">
          <Kicker label="Section header" />
        </div>
      </Row>

      <Row label="stack chips">
        <StackChips items={["TypeScript", "React", "Next.js", "Tailwind"]} />
      </Row>

      <Row label="pulse dot">
        <span className="text-dim flex items-center gap-2 text-sm">
          <PulseDot />
          live status
        </span>
      </Row>

      <Row label="links">
        <ExternalLink href="https://example.com" className={proseLinkClass}>
          a prose link
        </ExternalLink>
        <span className="text-dim text-sm">
          company: <CompanyLink company="GrowthNation" /> ·{" "}
          <CompanyLink company="Connect4" />
        </span>
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
        <Button variant="outline">focus me (Tab)</Button>
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
