# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js maze-solving application that implements a backtracking algorithm to navigate through a maze. The project simulates a mouse finding its way through a maze with visual output in the terminal.

## Key Commands

### Development Commands
- `yarn` - Install dependencies (use yarn, not npm; the project keeps only `yarn.lock`)
- `yarn go` - Run the maze solver; `yarn go --delay 100` slows it down (default 25ms per step)
- `yarn test` - Run the Jest tests

### Project Structure

The application follows a modular architecture with clear separation of concerns:

**Core Classes:**
- `Game` (game.js) - Main game controller that orchestrates the maze solving
- `Maze` (maze.js) - Handles maze representation and operations
- `Mouse` (mouse.js) - Implements the pathfinding algorithm and movement logic
- `mazeData.js` - Contains the maze matrix and starting position

**Application Flow:**
1. `app.js` serves as the entry point, creating a new Game instance
2. Game initializes a Maze and Mouse; `step()` advances one move and returns false when exploration is done
3. Mouse uses a depth-first search with backtracking to navigate the maze
4. Game provides real-time terminal visualization of the mouse's progress

## Architecture Details

### Maze Solving Algorithm
The mouse implements a depth-first search algorithm with backtracking:
- Explores unvisited adjacent cells first
- Maintains a history stack for backtracking when dead ends are reached
- Tracks visited positions to avoid cycles
- Uses directional movement (north, south, east, west)

### Visualization System
- Uses Unicode characters for display (★ for start, 🐭 for mouse, blocks for walls)
- Terminal clearing and cursor positioning for animation effect
- Redraws after every step; `render: false` disables output for tests
- Configurable delay between moves (`--delay`, default 25ms)

### Data Structures
- Maze represented as 2D matrix (0 = path, 1 = wall)
- Mouse position tracking with x,y coordinates
- History stack for backtracking
- Visited positions stored in a Set as string keys ("x-y" format)

## Dependencies

- `cli-color`: Terminal color support

## Node.js Version

Runs on any current Node.js LTS; there are no native dependencies.

## Other Files

- `archive/simplemaze.js` - The original recursive solver, kept for reference; not used by the app
- `docs/maze.gif` - README animation
