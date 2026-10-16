// Small mono label above a section heading. Coral so it reads as the accent.
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-hi mb-3 font-mono text-xs tracking-[0.18em] uppercase">
      {children}
    </p>
  );
}
