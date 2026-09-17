<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/atom:feed/atom:title"/> // RSS Syndication Wire</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; }
          body {
            background-color: #fbf9f4;
            color: #141413;
            font-family: Georgia, 'Times New Roman', serif;
            padding: 3rem 1.5rem;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.7;
          }
          a {
            color: #141413;
            text-decoration: underline;
            text-decoration-color: #991b1b;
          }
          a:hover { color: #991b1b; }
          .back-link {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.82rem;
            display: inline-block;
            margin-bottom: 2rem;
            color: #991b1b;
            font-weight: 700;
            text-decoration: none;
          }
          .back-link:hover { text-decoration: underline; }
          .feed-notice {
            background: #f3eee3;
            border: 1px solid #ded8cb;
            border-left: 4px solid #991b1b;
            padding: 1.5rem;
            margin-bottom: 3rem;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.88rem;
          }
          .feed-notice h2 {
            font-size: 1.15rem;
            margin: 0 0 0.5rem 0;
            color: #141413;
            font-weight: 700;
          }
          .feed-notice p {
            margin: 0 0 0.75rem 0;
            color: #54504a;
            line-height: 1.6;
          }
          .feed-notice p:last-child { margin-bottom: 0; }
          .feed-entry {
            border-bottom: 1px solid #ded8cb;
            padding-bottom: 2.25rem;
            margin-bottom: 2.25rem;
          }
          .feed-date {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.75rem;
            color: #7c776e;
            font-weight: 700;
            letter-spacing: 0.05em;
          }
          .feed-title {
            font-size: 2rem;
            font-weight: 700;
            margin: 0.4rem 0 0.75rem 0;
            line-height: 1.25;
          }
          .feed-title a {
            color: #141413;
            text-decoration: none;
          }
          .feed-title a:hover {
            color: #991b1b;
            text-decoration: underline;
          }
          .feed-summary {
            color: #54504a;
            font-size: 1.05rem;
            line-height: 1.7;
          }
        </style>
      </head>
      <body>
        <a href="/jme.log/" class="back-link">&larr; Return to jme.log Front Page</a>
        
        <header class="feed-notice">
          <h2>📡 jme.log // RSS &amp; Atom Syndication Wire</h2>
          <p>
            This is the raw RSS/Atom syndication feed for <strong>jme.log</strong>.
          </p>
          <p>
            To receive dispatches automatically, copy this URL into your preferred feed reader application (such as <em>Feedly</em>, <em>NetNewsWire</em>, or <em>Inoreader</em>).
          </p>
        </header>

        <main>
          <xsl:for-each select="/atom:feed/atom:entry">
            <article class="feed-entry">
              <div class="feed-date">
                FILED: <xsl:value-of select="substring(atom:published, 1, 10)"/>
              </div>
              <h2 class="feed-title">
                <a href="{atom:link/@href}">
                  <xsl:value-of select="atom:title"/>
                </a>
              </h2>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
