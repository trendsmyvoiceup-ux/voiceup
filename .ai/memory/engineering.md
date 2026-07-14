# Engineering Memory

> Distilled engineering knowledge for Human Signal.
> Not task history. Not decisions. What works, what doesn't, and why.

---

## Next.js / App Router

### Run builds from `apps/web/`
`pnpm build` must always be run from `apps/web/`. There is no `package.json` at the workspace root. Running from root throws `ERR_PNPM_NO_PKG_MANIFEST` and fails silently in some shells.

### Clean `.next/` when artifacts may be mixed
Two separate `pnpm build` invocations in the same `.next/` directory produce `webpack-runtime.js` and chunk files from different builds. The runtime's chunk resolver (`"" + chunkId + ".js"`) will reference non-existent paths, causing `Cannot find module './199.js'` and 500 errors on every route. Diagnosis: all routes 500 simultaneously → check `.next/server/webpack-runtime.js` timestamp vs chunk file timestamps. Fix: `rm -rf .next && pnpm build`.

### Restart the server after every build
A running `next-server` process retains in-memory state. New `.next/` files on disk + old in-memory module registry = 500s on all dynamic routes. Always kill the server (`lsof -ti :3000 | xargs kill`) and restart after a fresh build.

### `force-dynamic` for filesystem-reading server components
Any server component that reads from the local filesystem (output/, battles/, published/) at request time must export `export const dynamic = "force-dynamic"`. Without this, Next.js may statically prerender and cache a stale filesystem snapshot.

---

## Tailwind v4

### Configuration is CSS-first, not file-first
Tailwind v4 is configured via `@import "tailwindcss"` in `globals.css`. There is no `tailwind.config.ts`. The PostCSS plugin is `@tailwindcss/postcss`. Do not create a `tailwind.config.ts` — it will be ignored and create confusion.

### "Unstyled" appearance usually means a broken server, not broken CSS
If a page appears completely unstyled (browser defaults, no dark theme), check whether the server is returning HTML at all before diagnosing CSS. A server returning 500 as plain text will look exactly like "no CSS". Verify: `curl -I http://localhost:3000` — if the response is not `text/html`, the CSS is not the problem.

### Class scanning is automatic
Tailwind v4 scans files automatically. Do not add explicit content globs. All classes used in `apps/web/src/` are picked up. Verify classes are present in generated CSS at `.next/static/css/` before assuming a configuration problem.

---

## React / Client-Server boundary

### localStorage requires a mounted guard
Any component reading from `localStorage` must:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
// render skeleton when !mounted
```
Skipping this causes hydration mismatch errors and flickers on first paint. The `mounted` guard is required even if the component is marked `"use client"`.

### Server computes, client reads localStorage
The correct pattern for this app: server components compute aggregate stats from filesystem data and pass them as typed props. Client components compute user-state-dependent data (status, approval state) from localStorage after mount. Never pass localStorage-dependent state from server to client via props — it cannot be computed server-side.

### `"use client"` boundary placement
Place `"use client"` on the lowest component in the tree that actually needs interactivity or browser APIs. A server page component that passes static data to an interactive dashboard component should remain a server component itself. This keeps data loading server-side and reduces client bundle size.

---

## Monorepo / Project structure

### Layout conventions
| Route type        | Max width   | Notes                            |
|-------------------|-------------|----------------------------------|
| Studio (internal) | `max-w-7xl` | Full-width operational dashboard |
| Public pages      | `max-w-5xl` | Content-focused, narrower        |
| Admin             | `max-w-5xl` | Current; may match studio later  |

### Internal routes are not linked from public nav
`/admin`, `/studio`, and any future internal routes must never appear in public navigation. This is intentional — internal tools should require direct URL navigation.

### pnpm only
The monorepo uses `pnpm` exclusively. `npm install` or `yarn` in any workspace package produces incorrect dependency resolution. Use `pnpm add`, `pnpm install`.

---

## TypeScript conventions

### Type location
Shared types for a feature domain live in `src/types/<domain>.ts`. Example: all Studio-related types live in `src/types/studio.ts`. Do not scatter types across component files.

### Null vs undefined
Prefer `null` for values that are explicitly absent and stored/serialized (JSON, database). Prefer `undefined` only for optional function parameters. The domain consistently uses `null` for missing scores, dates, and content.

---

## File-based pipeline architecture

### Battle Package is the single source of truth
Once `output/battles/<slug>/` exists, it is authoritative. Never modify it from a consumer. Website, Publisher, future consumers each read independently. No consumer has a dependency on another consumer's output.

### All handoffs are file-based
There are no in-memory handoffs between pipeline agents. Planner writes a file. Battle Designer reads that file and writes files. This is permanent. Any change to this pattern requires a Founder decision recorded in `DECISIONS.md`.

### Output folder structure
```
output/
├── proposals/<slug>.json          ← Planner output
├── battles/<slug>/                ← Battle Designer output (authoritative)
│   ├── battle.json
│   ├── manifest.json
│   ├── status.json
│   ├── review.json                ← Reviewer output (gate)
│   └── *.txt (script, caption, hashtags, prompts)
├── published/<slug>/tiktok/       ← Publisher output
└── reports/<category>-<ts>.json  ← Report output
```

---

## Rejected approaches

### Sequential Website → Publisher dependency
Rejected permanently. Website and Publisher are independent consumers of the Battle Package. Any earlier draft describing Website completing before Publisher is superseded. See `agents/shared/CONTRACT.md`.

### Shared package between scripts/ and apps/web/
Rejected temporarily. `scripts/catalog.ts` and `apps/web/src/lib/comparisons.ts` are intentional duplicates. A shared package adds monorepo complexity not justified at current scale. Re-evaluate when both sides diverge significantly.

### `format: "json"` flag in Ollama API calls
Rejected. Causes Qwen 2.5 7B and other models to return a single-pair object instead of an array. Use Strategy B prompts instead.
