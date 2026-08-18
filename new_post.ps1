# PowerShell script to create a new blog post for jme.log
# Run this in PowerShell from the repository root: .\new_post.ps1

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "         jme.log Post Creator             " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Get Title
$title = ""
while ([string]::IsNullOrWhiteSpace($title)) {
    $title = Read-Host -Prompt "Enter Post Title (e.g. My First Day in Tokyo)"
    if ([string]::IsNullOrWhiteSpace($title)) {
        Write-Host "Title cannot be empty! Please try again." -ForegroundColor Yellow
    }
}

# 2. Get Categories
$categoriesInput = Read-Host -Prompt "Enter Categories (comma-separated, e.g. travel, study-abroad)"
$categories = @()
if (-not [string]::IsNullOrWhiteSpace($categoriesInput)) {
    $categories = $categoriesInput.Split(",") | ForEach-Object { $_.Trim().ToLower() } | Where-Object { $_ -ne "" }
}

# 3. Format Date
$date = Get-Date -Format "yyyy-MM-dd"

# 4. Generate Slug from Title
$slug = $title.ToLower()
$slug = $slug -replace '[^a-z0-9\s-]', ''     # Remove non-alphanumeric except spaces and hyphens
$slug = $slug -replace '[\s-]+', '-'           # Replace spaces and multiple hyphens with a single hyphen
$slug = $slug.Trim('-')                        # Trim leading and trailing hyphens

if ([string]::IsNullOrWhiteSpace($slug)) {
    $slug = "post-" + (Get-Date -Format "HHmmss")
}

# 5. Determine Filename
$postsDir = Join-Path $PSScriptRoot "_posts"
if (-not (Test-Path $postsDir)) {
    New-Item -ItemType Directory -Path $postsDir | Out-Null
}

$filename = "${date}-${slug}.md"
$filePath = Join-Path $postsDir $filename

# 6. Check if file exists
if (Test-Path $filePath) {
    Write-Host "`nError: A post with the filename '$filename' already exists!" -ForegroundColor Red
    Write-Host "Please choose a different title or delete the existing file." -ForegroundColor Red
    Exit
}

# 7. Generate YAML Front Matter
$categoriesYaml = ""
if ($categories.Count -gt 0) {
    $categoriesYaml = "[" + ($categories -join ", ") + "]"
}

$frontMatter = @"
---
layout: post
title: "$title"
date: $date
categories: $categoriesYaml
tags: []
---

Write your article here...
"@

# 8. Write File
Set-Content -Path $filePath -Value $frontMatter -Encoding utf8

Write-Host "`nSuccess! New post template created:" -ForegroundColor Green
Write-Host "File: _posts/$filename" -ForegroundColor Green
Write-Host "Path: $filePath" -ForegroundColor Gray
Write-Host "`nOpen this file in your text editor to start writing!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
