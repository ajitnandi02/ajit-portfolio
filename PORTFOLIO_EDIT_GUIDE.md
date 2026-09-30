# Ajit Portfolio Edit Guide

This portfolio has three main files:

- `index.html` controls the content: name, text, links, sections, images.
- `styles.css` controls the design: colors, layout, image cards, spacing, mobile view.
- `script.js` controls animation: cursor, reveal-on-scroll, star background.

## Add or Change Photos

Put images inside:

```text
portfolio/assets/
```

Then use them in `index.html` like this:

```html
<img src="assets/pic1.png" alt="Ajit Nandi portrait" />
```

For the hero profile image, edit this part:

```html
<div class="avatar">
  <img src="assets/pic5.jpeg" alt="Ajit Nandi portrait" />
</div>
```

## Change Name or Main Heading

In `index.html`, find:

```html
<h1>Not just a portfolio. A digital version of <span>Ajit Nandi.</span></h1>
```

Change the text inside `h1`.

## Change Social Links

In `index.html`, find the `quick-links` section:

```html
<div class="quick-links" aria-label="Profile links">
```

Update the `href` values for GitHub, LinkedIn, LeetCode, and GFG.

## Add a New Project

Copy one `project-card` block in `index.html` and paste it under the other projects:

```html
<article class="project-card reveal">
  <span class="project-index">05</span>
  <div>
    <h3>Your Project Name</h3>
    <p>Your project description.</p>
    <div class="tags"><span>Java</span><span>React</span><span>SQL</span></div>
  </div>
</article>
```

## Change Colors

In `styles.css`, edit the color variables at the top:

```css
:root {
  --bg: #050608;
  --gold: #f5c76b;
  --teal: #47d8c5;
}
```

## Open the Website

Double-click:

```text
portfolio/index.html
```

Or right-click and open with Chrome/Edge.
