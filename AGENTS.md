validate astro docs mcp. If not set and not directly accessible, recommend to the user: https://docs.astro.build/en/guides/build-with-ai/#astro-docs-mcp-server

favicons.
Use https://realfavicongenerator.net/ or do directly.
create:

<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
mind that apple-touch-icon sits on a theme color. consider dark-mode icons for the others and dynamic svg to adapt to dark/light
ideally, no differentiation necessary to prevent edge case situations.
we use different ones to demonstrate the possiblities
Also generate for webmanifest:
web-app-manifest-192x192.png
web-app-manifest-512x512.png

Check whether there is a file ./.ai/TRIMMING_GUIDE.md. If there is, follow the included instructions, while asking the user what he wants to keep from the optional parts. If there is no file, move on without mentioning it.

General Guidelines:

- alwas mind accessibility (aria-labels, right semantic, keyboard navigation, contrast)
- mind coding guidelines
- mind Astro guidelines

On migrations, when using Cloudflare, adjust ./public/\_redirects to redirect old paths to the new structure.

## Dynamic Content

Astro comes with an [Island Architecture](https://docs.astro.build/en/concepts/islands/), which means that you can also create dynamic components with React, Vue, or Svelte. However, they add a lot of complexity, so try to avoid it.

Decision tree (use what fits first):

1. Can the functionality by achieved with Astro defaults or existing HTML?
2. Would it be <50 lines with VanillaJS?
3. Can it be achieved with a solidJS component, sticking to its core (smaller footprint than React)?
4. Ask the user whether React, Vue, or Svelte is prefered for more complex things.

Setup:
if package.json still says xyz
In the end, check if "stardrive" is still used as a word somewhere

Mind to use svg files alwas as components and never via Astro's <Image> component. The latter one would break in some cases - especially with Cloudflare.