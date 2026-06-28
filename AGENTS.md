# General information and guidelines for AI agents

## Analyze your high-level use case first

Check for a `AGENT_MODE.md` file, if there, differentiate by case.
"boilerplate": ignore all .ai files in terms of following them, except for the [`BOILERPLATE_MODE.md`](./.ai/BOILERPLATE_MODE.md), you are not using this boilerplate to create a new project, but maintaining the boilerplate code itself as a contributor instead!
"project": Ignore the [`BOILERPLATE_MODE.md`](./.ai/BOILERPLATE_MODE.md). You are using the boilerplate to create a new project and website. Do not look at this codebase as a boilerplate, but an already started project, that you need to adjust and extend to match the user's specifications. Check the PLAN.md first on what's open.

If there is no `AGENT_MODE.md`, execute on the [`SETUP.md`](./.ai/SETUP.md).

## This is an Astro project

Validate whether you are connected to the Astro Docs MCP server (https://mcp.docs.astro.build/mcp).
If not, connect to it, or ask the user to add the config, if you are not allowed to do it directly.
See https://docs.astro.build/de/guides/build-with-ai/#installation for guidance.

This project is either the Astro Stardrive boilerplate or based on it. If you are in "project" mode, you can find up-to-date information about the foundational boilerplate at its [official repo](https://github.com/Peltmonger/stardrive).

## Further tech stack
- Astro
- Vite
- TypeScript
- JavaScript
- TailwindCSS
- ESLint
- Prettier
- SolidJS
- Cloudflare Workers with Wrangler (prepared - might have been already dropped when you process this information here)
- Additional things that got added after the initial setup of this project

## General guidelines

The following guidelines are specific to this setup and always need to be respected. 
They extend any existing general Agent guidelines, profiles, or skills.

- The [`package.json`](./package.json) holds all information about available scripts and dependencies.
- Astro is a **frontend** framework (static + optional on-demand SSR). Never store secrets or backend logic here. Sensitive work belongs in a real backend service.
- Use svg files alwas as components and never via Astro's <Image> component. The latter one would break in some cases - especially with Cloudflare.
- Always mind accessibility (create proper aria-labels, use semantic tags, consider keyboard + mouse + touch navigation, consider contrast colors when working with text).
- Always try to use what is native to Astro and can be found in its documentation, before creating own logic.
- Astro comes with an [Island Architecture](https://docs.astro.build/en/concepts/islands/), which means that you can also create dynamic components with React, Vue, or Svelte. However, they add a lot of complexity, so try to avoid it. Decision tree (use what fits first):
  1. Can the functionality by achieved with Astro defaults or existing HTML?
  2. Would it be <50 lines with VanillaJS?
  3. Can it be achieved with a solidJS component, sticking to its core (smaller footprint than React)?
  4. Ask the user whether React, Vue, or Svelte is prefered for more complex things.
- Before implementing:
  - State your assumptions explicitly. If uncertain, ask.
  - If multiple interpretations exist, present them - don't pick silently.
  - If a simpler approach exists, say so. Push back when warranted.
  - If something is unclear, stop. Name what's confusing. Ask.
- Simplicity First. Minimum code that solves the problem. Nothing speculative. When working on a new project, try to stay as close as possible to what the boilerplate ships with - this also applies to structure.
- Styling: follow the same conventions and patterns that you detect in the surrounding code. Run `npm run check` to check and lint everyting or pick a more specific linter.
