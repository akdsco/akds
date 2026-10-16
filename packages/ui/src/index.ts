// The shared design system: the single source both apps import from so the
// look cannot drift between akds.dev and akdsdesign.uk. Design TOKENS live in
// ./theme.css (imported by each app's globals.css); the primitives below are
// the cross-cutting components/utilities that must stay identical.
export { cn } from "./utils";
export { ExternalLink, proseLinkClass, iconLinkClass } from "./external-link";
export { GithubIcon, LinkedinIcon } from "./icons";
