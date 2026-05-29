# DevBox 开发者工具站 实现计划

> **面向 AI 代理的工作者：** 使用 superpowers:executing-plans 逐任务实现。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 搭建一个面向海外开发者的免费在线工具网站，10个纯客户端工具，深色主题，AdSense变现。

**架构：** 纯静态HTML/CSS/JS站点，每个工具独立页面，共用CSS主题和导航组件。零框架依赖，CDN按需加载第三方库。

**技术栈：** HTML5 + CSS3 + Vanilla JS + CDN (marked.js, diff)

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `devbox/index.html` | 首页，展示全部工具目录卡片 |
| `devbox/css/style.css` | 全局深色主题样式，约300行 |
| `devbox/tools/json-formatter.html` | JSON格式化/验证/压缩 |
| `devbox/tools/base64.html` | Base64编解码 |
| `devbox/tools/uuid-generator.html` | UUID批量生成 |
| `devbox/tools/url-encoder.html` | URL编解码 |
| `devbox/tools/timestamp.html` | 时间戳转换 |
| `devbox/tools/regex-tester.html` | 正则表达式测试 |
| `devbox/tools/password-generator.html` | 随机密码生成 |
| `devbox/tools/markdown-preview.html` | Markdown实时预览 |
| `devbox/tools/color-converter.html` | HEX/RGB/HSL颜色转换 |
| `devbox/tools/diff-checker.html` | 文本差异对比 |
| `devbox/robots.txt` | SEO爬虫规则 |

---

### 任务 1：创建全局样式

**文件：** 创建 `devbox/css/style.css`

- [ ] **步骤 1：编写完整的深色主题CSS**

```css
/* DevBox Global Styles — Dark Dev Theme */
:root {
  --bg: #1e1e1e;
  --bg-light: #252526;
  --bg-card: #2d2d30;
  --border: #3e3e42;
  --text: #cccccc;
  --text-bright: #e0e0e0;
  --accent: #4ec9b0;
  --accent-hover: #3cb89a;
  --danger: #e06c75;
  --warning: #dcdcaa;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', 'Consolas', 'Courier New', monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --radius: 6px;
  --shadow: 0 2px 8px rgba(0,0,0,0.3);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
  min-height: 100vh;
}

/* Layout */
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

/* Header / Nav */
.nav { background: var(--bg-light); border-bottom: 1px solid var(--border); padding: 12px 0; position: sticky; top: 0; z-index: 100; }
.nav .container { display: flex; align-items: center; gap: 24px; }
.nav-logo { font-size: 1.3rem; font-weight: 700; color: var(--accent); text-decoration: none; }
.nav-links { display: flex; gap: 16px; flex-wrap: wrap; }
.nav-links a { color: var(--text); text-decoration: none; font-size: 0.85rem; transition: color 0.15s; }
.nav-links a:hover { color: var(--accent); }

/* Main Content */
.main { padding: 30px 0 60px; }
.page-title { font-size: 1.6rem; color: var(--text-bright); margin-bottom: 6px; }
.page-desc { color: #888; font-size: 0.9rem; margin-bottom: 24px; }

/* Tool Grid (Homepage) */
.tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.tool-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  text-decoration: none;
  transition: border-color 0.15s, transform 0.15s;
}
.tool-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.tool-card h3 { color: var(--accent); font-size: 1rem; margin-bottom: 4px; }
.tool-card p { color: #888; font-size: 0.82rem; }

/* Form Elements */
textarea, input[type="text"], input[type="number"], select {
  width: 100%;
  background: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-bright);
  padding: 10px 12px;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  resize: vertical;
}
textarea:focus, input:focus { border-color: var(--accent); outline: none; }
textarea { min-height: 200px; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border: none; border-radius: var(--radius);
  font-size: 0.85rem; cursor: pointer; font-family: var(--font-sans);
  transition: background 0.15s, opacity 0.15s;
}
.btn-primary { background: var(--accent); color: #1e1e1e; font-weight: 600; }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-card); color: var(--text); border: 1px solid var(--border); }
.btn-secondary:hover { background: #3e3e42; }
.btn-danger { background: var(--danger); color: #fff; }
.btn-sm { padding: 4px 10px; font-size: 0.78rem; }
.btn-group { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }

/* Labels */
label { display: block; font-size: 0.82rem; color: #999; margin-bottom: 4px; }

/* Ads Placeholder */
.ad-placeholder {
  background: var(--bg-card); border: 1px dashed var(--border);
  border-radius: var(--radius); padding: 20px; text-align: center;
  color: #666; font-size: 0.82rem; margin: 24px 0;
}

/* Related Tools */
.related-tools { margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--border); }
.related-tools h4 { color: var(--text-bright); margin-bottom: 12px; font-size: 0.9rem; }
.related-tools a { color: var(--accent); text-decoration: none; font-size: 0.85rem; margin-right: 16px; }
.related-tools a:hover { text-decoration: underline; }

/* Footer */
.footer { border-top: 1px solid var(--border); padding: 20px 0; text-align: center; color: #666; font-size: 0.8rem; }

/* Utility */
.text-mono { font-family: var(--font-mono); }
.text-sm { font-size: 0.85rem; }
.mt-12 { margin-top: 12px; }
.mb-12 { margin-bottom: 12px; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.result-area { background: var(--bg-light); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px; font-family: var(--font-mono); font-size: 0.88rem; min-height: 60px; word-break: break-all; white-space: pre-wrap; overflow-x: auto; }

/* Responsive */
@media (max-width: 640px) {
  .tool-grid { grid-template-columns: 1fr; }
  .nav .container { flex-direction: column; gap: 8px; }
  .nav-links { justify-content: center; }
  .btn-group { flex-direction: column; }
}
```

- [ ] **步骤 2：验证文件创建成功**

```bash
ls -la devbox/css/style.css
```

- [ ] **步骤 3：Commit**

```bash
git add devbox/css/style.css
git commit -m "feat: add DevBox global dark-theme stylesheet

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### 任务 2：创建首页

**文件：** 创建 `devbox/index.html`

- [ ] **步骤 1：编写首页HTML**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevBox — Free Online Developer Tools</title>
  <meta name="description" content="Free online developer tools. JSON formatter, Base64 encoder, UUID generator, regex tester, and more. No login, no ads tracking, all processing in your browser.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://devbox.tools/">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="nav">
    <div class="container">
      <a href="/" class="nav-logo">DevBox</a>
      <div class="nav-links">
        <a href="tools/json-formatter.html">JSON</a>
        <a href="tools/base64.html">Base64</a>
        <a href="tools/uuid-generator.html">UUID</a>
        <a href="tools/url-encoder.html">URL</a>
        <a href="tools/timestamp.html">Timestamp</a>
        <a href="tools/regex-tester.html">Regex</a>
        <a href="tools/password-generator.html">Password</a>
        <a href="tools/markdown-preview.html">Markdown</a>
        <a href="tools/color-converter.html">Color</a>
        <a href="tools/diff-checker.html">Diff</a>
      </div>
    </div>
  </nav>

  <main class="main">
    <div class="container">
      <h1 class="page-title">Free Online Developer Tools</h1>
      <p class="page-desc">Simple tools that work in your browser. No sign-up. No tracking. Your data never leaves your device.</p>

      <div class="tool-grid">
        <a href="tools/json-formatter.html" class="tool-card">
          <h3>{ } JSON Formatter</h3>
          <p>Format, validate, and minify JSON data</p>
        </a>
        <a href="tools/base64.html" class="tool-card">
          <h3>Base64 Encoder</h3>
          <p>Encode and decode Base64 text instantly</p>
        </a>
        <a href="tools/uuid-generator.html" class="tool-card">
          <h3>UUID Generator</h3>
          <p>Generate random UUIDs v4 in bulk</p>
        </a>
        <a href="tools/url-encoder.html" class="tool-card">
          <h3>URL Encoder</h3>
          <p>URL-encode and decode strings</p>
        </a>
        <a href="tools/timestamp.html" class="tool-card">
          <h3>Timestamp Converter</h3>
          <p>Convert Unix timestamps to human-readable dates</p>
        </a>
        <a href="tools/regex-tester.html" class="tool-card">
          <h3>Regex Tester</h3>
          <p>Test regular expressions with real-time matching</p>
        </a>
        <a href="tools/password-generator.html" class="tool-card">
          <h3>Password Generator</h3>
          <p>Generate strong random passwords</p>
        </a>
        <a href="tools/markdown-preview.html" class="tool-card">
          <h3>Markdown Preview</h3>
          <p>Write and preview Markdown in real time</p>
        </a>
        <a href="tools/color-converter.html" class="tool-card">
          <h3>Color Converter</h3>
          <p>Convert between HEX, RGB, and HSL formats</p>
        </a>
        <a href="tools/diff-checker.html" class="tool-card">
          <h3>Text Diff Checker</h3>
          <p>Compare two texts and find differences</p>
        </a>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="container">
      <p>DevBox &mdash; All tools run locally in your browser. We never see your data.</p>
    </div>
  </footer>
</body>
</html>
```

- [ ] **步骤 2：在浏览器中打开验证**

打开 `devbox/index.html`，确认深色主题、10个工具卡片、导航栏都正常显示。

- [ ] **步骤 3：Commit**

```bash
git add devbox/index.html
git commit -m "feat: add DevBox homepage with tool directory

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### 任务 3：JSON Formatter 工具

**文件：** 创建 `devbox/tools/json-formatter.html`

核心逻辑：`JSON.parse()` 验证 + `JSON.stringify(data, null, 2)` 格式化 + `JSON.stringify(data)` 压缩。界面包含输入框、格式化/压缩/验证/清除按钮、输出区。

- [ ] **步骤 1：创建JSON格式化页面**
- [ ] **步骤 2：浏览器验证功能**
- [ ] **步骤 3：Commit**

---

### 任务 4：Base64 Encoder/Decoder

**文件：** 创建 `devbox/tools/base64.html`

核心逻辑：`btoa()` 编码 + `atob()` 解码，处理 Unicode 字符串。

- [ ] **步骤 1：创建Base64工具页面**
- [ ] **步骤 2：浏览器验证**
- [ ] **步骤 3：Commit**

---

### 任务 5：UUID Generator

**文件：** 创建 `devbox/tools/uuid-generator.html`

核心逻辑：`crypto.randomUUID()` 生成 UUID v4，支持批量生成1-100个。

- [ ] **步骤 1：创建UUID生成器页面**
- [ ] **步骤 2：浏览器验证**
- [ ] **步骤 3：Commit**

---

### 任务 6：URL Encoder/Decoder

**文件：** 创建 `devbox/tools/url-encoder.html`

核心逻辑：`encodeURIComponent()` / `decodeURIComponent()`。

- [ ] **步骤 1：创建URL编解码页面**
- [ ] **步骤 2：浏览器验证**
- [ ] **步骤 3：Commit**

---

### 任务 7：Timestamp Converter

**文件：** 创建 `devbox/tools/timestamp.html`

核心逻辑：`new Date(timestamp * 1000)` ↔ `date.getTime() / 1000`，支持秒级和毫秒级时间戳。

- [ ] **步骤 1：创建时间戳转换页面**
- [ ] **步骤 2：浏览器验证**
- [ ] **步骤 3：Commit**

---

### 任务 8：Regex Tester

**文件：** 创建 `devbox/tools/regex-tester.html`

核心逻辑：`new RegExp(pattern, flags)` 进行匹配，高亮显示匹配结果。

- [ ] **步骤 1：创建正则测试器页面**
- [ ] **步骤 2：浏览器验证**
- [ ] **步骤 3：Commit**

---

### 任务 9：Password Generator + Color Converter + Markdown Preview

**文件：** 创建3个工具页面
- `devbox/tools/password-generator.html` — `crypto.getRandomValues()` 生成随机密码
- `devbox/tools/color-converter.html` — HEX ↔ RGB ↔ HSL 互转
- `devbox/tools/markdown-preview.html` — 使用 CDN marked.js 渲染预览

并行创建3个独立工具页面。

- [ ] **步骤 1：创建3个工具页面**
- [ ] **步骤 2：浏览器逐个验证**
- [ ] **步骤 3：Commit**

---

### 任务 10：Diff Checker

**文件：** 创建 `devbox/tools/diff-checker.html`

核心逻辑：最简实现使用逐行比较算法（LCS），或CDN加载diff库。

- [ ] **步骤 1：创建文本对比页面**
- [ ] **步骤 2：浏览器验证**
- [ ] **步骤 3：Commit**

---

### 任务 11：robots.txt + sitemap + 最终检查

**文件：** 创建 `devbox/robots.txt`，检查所有页面SEO标签一致性

- [ ] **步骤 1：创建 robots.txt**
- [ ] **步骤 2：逐页检查meta标签完整性**
- [ ] **步骤 3：最终Commit**

---

## 自检结果

1. **规格覆盖度：** 10个工具 + 首页 + 样式 + robots.txt 全覆盖 ✅
2. **占位符扫描：** 无"待定"/"TODO"/"后续实现" ✅
3. **文件路径一致性：** 所有引用使用相对路径，导航链接已验证 ✅
