---
layout: post
title: "Welcome to jme.log"
date: 2026-08-18
categories: [meta, tech]
tags: [introduction, guide, jekyll]
---

Welcome to **jme.log**! This is the first post on this blog. I wanted to write a quick entry explaining how this site works, how I built it, and how to publish new content.

### How this blog is built

This blog is a static website powered by **Jekyll** and hosted for free via **GitHub Pages**. 

Here are the key aspects of the design:
*   **Fully Responsive:** It is optimized for both desktop monitors and small mobile screens.
*   **Built-in Dark Mode:** Features automatic synchronization with your system preferences, plus a manual override toggle button in the navigation header.
*   **Interactive Comments:** Comments, replies, and reactions are handled by **Giscus**, which loads comments from GitHub Discussions under the hood. No databases or tracking scripts are needed!

---

### How to post a new article

Creating a new post is designed to be as simple as possible.

#### Option 1: Use the PowerShell helper script (Recommended)
Open a terminal in the root of the site and run:
```powershell
.\new_post.ps1
```
This script will prompt you for a title and categories, and will automatically create a Markdown file in `_posts/` with the current date, clean filename slug, and the template front matter already filled out.

#### Option 2: Create a file manually
Create a new file in the `_posts/` folder using the exact date naming pattern:
`YYYY-MM-DD-your-post-title.md`

Every article must start with a YAML configuration block (called "front matter") at the very top:
```yaml
---
layout: post
title: "Your Post Title Here"
date: YYYY-MM-DD
categories: [study-abroad, travel]
tags: [tokyo, flight, reflections]
---
```
After the closing `---`, you can write your article in standard Markdown format.

---

### Formatting Examples

Here is how common Markdown elements are styled on **jme.log**:

#### Blockquotes
> "Geopolitics is the study of the influence of such factors as geography, economics, and demography on the politics and especially the foreign policy of a state."
> — *Classic definition*

#### Lists
1.  First point
2.  Second point with code: `console.log("hello world");`
3.  Third point

#### Code Blocks
```javascript
// Quick theme switcher script preview
const currentTheme = document.documentElement.getAttribute('data-theme');
console.log(`The active theme is: ${currentTheme}`);
```

If you have any feedback or questions, feel free to drop a comment below!
