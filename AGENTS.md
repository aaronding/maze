# Repository Guidelines

## Project Structure & Module Organization
- Root-level Node app; no build step or `src/` folder.
- `app.js` boots the game using `mazeData.js` and `Game`.
- `game.js` runs the async step loop (`step()` advances one move) and redraws the terminal.
- `maze.js` provides grid access, bounds/exit checks, and rendering.
- `mouse.js` implements movement, backtracking, and trace history.
- `mazeData.js` contains the maze matrix and starting position.
- `archive/simplemaze.js` is the original recursive solver, kept for reference only.
- `docs/maze.gif` is the README animation.

## Build, Test, and Development Commands
- Node version: any current LTS (no native dependencies).
- Install dependencies: `yarn` (the project uses `yarn.lock`; do not add `package-lock.json`)
- Run the solver: `yarn go` (equivalent to `node app.js`); `--delay <ms>` sets the step delay (default 25)
- Run the archived solver: `node archive/simplemaze.js`
- Tests: `yarn test` (Jest). CI runs them on Node 22 and 24 via `.github/workflows/test.yml`.

## Coding Style & Naming Conventions
- JavaScript (CommonJS): use `require`/`module.exports`.
- Indentation: 2 spaces; semicolons required; prefer single quotes.
- Filenames: lowercase; allow camel humps where clearer (e.g., `mazeData.js`).
- Naming: Classes in PascalCase (`Maze`, `Game`, `Mouse`); functions/variables in camelCase.
- Keep modules small and focused; avoid introducing global state.

## Testing Guidelines
- Jest tests live in `__tests__/`.
- Test `Game` headlessly with `new Game(matrix, start, { delay: 0, render: false })`; `start()` resolves to the exits found.
- Favor pure units in `maze.js` and `mouse.js`; cover pathfinding, exit detection, and rendering decisions.

## Commit & Pull Request Guidelines
- Commit messages: clear, imperative, and scoped (e.g., "Add backtrack when no path").
- Keep PRs focused; don’t mix refactors with behavior changes.
- PR checklist: description/purpose, summary of changes, run instructions, terminal output/screenshot if CLI behavior changes, and linked issue.
- Note any Node version implications or dependency changes.

## Security & Environment
- No secrets or network use expected. Keep new dependencies minimal.
- Avoid native (compiled) dependencies; they tie the project to one Node version.

## Architecture Overview
- `Game` drives an async loop, calling `step()` and redrawing until the mouse has backtracked to the start.
- `Maze` encapsulates grid logic and pretty-printing.
- `Mouse` selects moves and records history. Data flows from `mazeData` → logic → console render.

