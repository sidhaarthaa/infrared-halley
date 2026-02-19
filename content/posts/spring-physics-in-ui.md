---
title: "Spring Physics in UI Design"
date: "2026-02-10"
excerpt: "Why spring-based animations feel more natural than CSS transitions, and how to implement them with Framer Motion."
tags: ["animation", "framer-motion", "tutorial"]
---

# Spring Physics in UI Design

CSS transitions are predictable. That's both their strength and their weakness. A `300ms ease-in-out` will always produce the same curve. But real objects don't move that way.

## Why Springs?

A spring animation is defined by two properties:

- **Stiffness** — How tight the spring is. Higher = snappier.
- **Damping** — How much resistance there is. Higher = less bounce.

```javascript
transition: {
  type: "spring",
  stiffness: 100,  // moderate snap
  damping: 20,     // controlled settle
}
```

The beauty of springs is that they **respond to interruption**. If you trigger a new animation before the old one finishes, the spring picks up from where it is — no jarring resets.

## Practical Examples

### Menu Sidebar

The sidebar on this site uses spring physics. Notice how it:
- **Overshoots** slightly when opening
- **Settles** smoothly into position
- **Responds** immediately if you toggle mid-animation

### Card Hover

Cards that scale up on hover feel better with springs because the overshoot creates a sense of weight:

```css
/* CSS (boring) */
transform: scale(1.05);
transition: transform 200ms ease;

/* vs Spring (alive) */
scale: 1.05
transition: { type: "spring", stiffness: 300, damping: 15 }
```

## When to Use Springs

- ✅ Navigation transitions
- ✅ Modal/sidebar open-close
- ✅ Hover interactions
- ✅ Drag and drop
- ❌ Loading spinners (use CSS keyframes)
- ❌ Infinite loops (springs settle, by definition)

## Getting Started

If you're using React, [Framer Motion](https://www.framer.com/motion/) makes springs trivial. The learning curve is gentle and the results are immediately satisfying.

---

*Experiment with the sidebar on this site to see springs in action!*
