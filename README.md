# electron-scratchbook
Repository full of little experiments made using Electron, right now it's
nothing more than just a packaged React web app.

## Setup
Could've done a better job with the project setup, still trying to figure out the
most optimal toolchain to use with this. But I think setup is pretty straight forward:

```bash
yarn && yarn build
```

This will run a small makefile-like script that will run a few watchers and execute
Electron once it notices build artifact presence.

## Experiments
Going to note little experiments and hacks I'm working on here. Mostly just doing this
for fun so don't expect anything too fancy, and most importantly do not use any of
this code in a production environment.

### Newton
Small library that implements some patterns found in the [InertiaJS](https://inertiajs.com/)
React and Laravel adapters.

Primarily I wanted to replicate the way Inertia helps bridget the gap between backend and
frontend, which I think is **super** awesome. The way I achieved this in this project is
not too different from how it's done in Inertia. Yes, the code is ugly, and implementations
aren't optimized. I'll get to that later!

Examples:
- `src/react/views/Dashboard.tsx`
- `src/react/index.tsx`
- `src/server/routes/index.tsx`

Provider (handles current render and associated state):
- `src/react/components/newton/NewtonProvider.tsx`
- `src/react/components/newton/useNewton.ts`

IPC implementations:
- `src/main.ts`
- `src/preload.ts`

I was going to make a whole graph for this, but then I got lazy. It's 3 AM, and I'm 5 hours
late for my bedtime.

