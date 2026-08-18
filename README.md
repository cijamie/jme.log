# jme.log

A clean, responsive personal blog built with Jekyll, hosted on GitHub Pages, and featuring dark/light mode toggle and interactive comments powered by Giscus.

This is a personal space for posting articles about geopolitical issues, study abroad journey logs, and other reflections.

---

## 🚀 Step-by-step Setup Guide

To get your blog live at `https://cijamie.github.io/jme.log/` with comments enabled, follow these steps:

### 1. Upload to GitHub
1. Create a public repository on GitHub named `jme.log` under your account (`cijamie`).
2. Open a terminal in this project folder (`c:\Users\jamie\Desktop\jme.log`) and run:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of jme.log blog"
   git branch -M main
   git remote add origin https://github.com/cijamie/jme.log.git
   git push -u origin main
   ```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/cijamie/jme.log`.
2. Click **Settings** (gear icon) in the top tabs.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   * **Source:** Select **Deploy from a branch**.
   * **Branch:** Select **main** and path **/(root)**.
   * Click **Save**.
5. GitHub will now automatically build and publish your site! Within a minute or two, it will be live at `https://cijamie.github.io/jme.log/`.

---

## 💬 3. Set Up Giscus Comments & Reactions

Giscus uses GitHub Discussions to store comments. It is secure, fast, and doesn't load tracker cookies.

1. **Enable Discussions on your repository:**
   * Go to **Settings** -> **General** on your GitHub repository.
   * Scroll down to the **Features** section.
   * Check the box for **Discussions**.
   
2. **Install the Giscus GitHub App:**
   * Visit [github.com/apps/giscus](https://github.com/apps/giscus).
   * Click **Install** and select **Only select repositories**, then choose `cijamie/jme.log`.

3. **Get your Repo and Category IDs:**
   * Go to [giscus.app](https://giscus.app/).
   * Scroll down to **Repository** and type `cijamie/jme.log`.
   * Scroll down to **Discussion Category** and select the category you want comments to appear in (e.g. **Comments** or **Announcements**).
   * Further down, under **Enable giscus**, you'll see a script snippet. Find the following values in the code:
     * `data-repo-id="..."` (e.g. `R_kgDOMabcde`)
     * `data-category-id="..."` (e.g. `DIC_kwDOMabcde`)

4. **Update `_config.yml`:**
   * Open `_config.yml` in your editor.
   * Replace the placeholders `YOUR_REPO_ID_HERE` and `YOUR_CATEGORY_ID_HERE` with the actual IDs you copied from giscus.app.
   * Save, commit, and push the changes:
     ```powershell
     git add _config.yml
     git commit -m "Configure Giscus comments"
     git push
     ```

---

## ✍️ How to Publish New Articles

### Using the PowerShell Helper (Recommended)
You can run our helper script to generate new posts from PowerShell:
1. Open PowerShell in the project directory.
2. Run:
   ```powershell
   .\new_post.ps1
   ```
3. Input the title and categories. The script creates the Markdown file template inside `_posts/` with the current date and YAML header.
4. Open the created file, write your content, and push it to GitHub:
   ```powershell
   git add .
   git commit -m "Add new article"
   git push
   ```

### Creating Manually
Create a new Markdown file in the `_posts/` directory with the format:
`YYYY-MM-DD-your-post-title.md`

Make sure the file starts with this front matter layout block:
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
categories: [category1, category2]
tags: [tag1, tag2]
---
Your article content in markdown format goes here...
```

---

## 💻 Optional: Previewing Locally (Advanced)

If you ever decide to install **Ruby** on your computer, you can run the blog locally before pushing:

1. Install Ruby (version 3.0 or higher is recommended).
2. Install Bundler:
   ```powershell
   gem install bundler
   ```
3. Install the dependencies:
   ```powershell
   bundle install
   ```
4. Run the local server:
   ```powershell
   bundle exec jekyll serve
   ```
5. Open `http://localhost:4000/jme.log/` in your browser.
