"use client";

import { useId, useState } from "react";

import { actionButtonClass } from "@/components/action-button";
import { Collapse } from "@/components/collapse";

// Demonstrates two real elements at once: the action button (actionButtonClass,
// the same one "Show earlier work" uses) driving the Collapse primitive (inert +
// grid-rows height animation). Both are the real components, not re-creations.
export function CollapseDemo() {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="w-full max-w-md">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-controls={id}
        className={actionButtonClass}
      >
        {open ? "Hide detail" : "Show detail"}
      </button>
      <Collapse open={open} id={id}>
        <p className="text-dim mt-3 text-sm leading-relaxed">
          This content reveals and collapses through the Collapse primitive,
          which animates its own height with the grid 0fr&rarr;1fr trick and
          sets
          <code className="font-mono"> inert</code> while closed. The button
          above is the site&rsquo;s standard action button.
        </p>
      </Collapse>
    </div>
  );
}
