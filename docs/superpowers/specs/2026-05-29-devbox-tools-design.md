# DevBox — 开发者在线工具站 设计规格说明

## 项目目标

面向海外开发者，搭建免费在线工具网站。通过 AI 搜索（ChatGPT/Claude）和 Google SEO 获取流量，Google AdSense 变现。

## 约束条件

- 零后端：全部客户端运算，不需要服务器
- 托管：Cloudflare Pages（免费）
- 收款：Google AdSense 电汇到中国银行卡
- 域名：年费约 ¥60
- 用户无需注册/登录，打开即用

## 工具清单

### 第一批（MVP，10个工具）

1. JSON Formatter/Validator — 格式化、压缩、验证 JSON
2. Base64 Encoder/Decoder — 文本/Base64 互转
3. UUID Generator — 批量生成 UUID v1/v4
4. URL Encoder/Decoder — URL 编解码
5. Timestamp Converter — Unix 时间戳 ↔ 日期互转
6. Regex Tester — 正则表达式实时测试（JS 引擎）
7. Password Generator — 随机密码生成
8. Markdown Preview — Markdown 实时预览
9. Color Converter — HEX/RGB/HSL 互相转换
10. Text Diff Checker — 文本差异对比

### 第二批（8个工具，后续迭代）

11. JWT Decoder — JWT Token 解析
12. QR Code Generator — 二维码生成
13. SQL Formatter — SQL 格式化
14. CSV ↔ JSON Converter — 数据格式互转
15. HTML Entity Encoder/Decoder — HTML 实体编解码
16. Lorem Ipsum Generator — 占位文本生成
17. Code Formatter — JS/HTML/CSS 格式化
18. Image to Base64 — 图片转 Base64

## 技术架构

- 纯 HTML/CSS/JS，零框架依赖
- CDN 按需加载：marked.js（Markdown）、diff（文本对比）、qrcode.js（二维码）
- 所有工具页面共用一套 CSS 主题和导航组件
- 每个工具独立 HTML 页面，利于 SEO 收录

## 网站结构

```
/
├── index.html              # 首页工具目录
├── json-formatter.html     # JSON 格式化
├── base64.html             # Base64 编解码
├── uuid-generator.html     # UUID 生成器
├── url-encoder.html        # URL 编解码
├── timestamp.html          # 时间戳转换
├── regex-tester.html       # 正则测试器
├── password-generator.html # 密码生成器
├── markdown-preview.html   # Markdown 预览
├── color-converter.html    # 颜色转换器
├── diff-checker.html       # 文本对比
├── css/
│   └── style.css           # 全局样式（深色主题）
├── js/
│   └── common.js           # 公共脚本
└── robots.txt              # SEO
```

## 设计风格

- 深色主题（#1e1e1e 底色，模拟 VS Code）
- 等宽字体（JetBrains Mono / Consolas）
- 绿色强调色（#4ec9b0）
- 极简布局，零干扰
- 响应式设计，支持移动端

## 页面布局（每页统一）

```
┌─────────────────────────────┐
│  导航栏：首页 + 工具列表      │
├─────────────────────────────┤
│  工具标题 + 一句话说明        │
├─────────────────────────────┤
│                             │
│  工具主体区域                │
│  （输入框 / 输出区 / 操作按钮）│
│                             │
├─────────────────────────────┤
│  AdSense 广告位（横幅）      │
├─────────────────────────────┤
│  相关工具推荐（3-5个链接）    │
└─────────────────────────────┘
```

## 广告策略

- 每页1个横幅广告位，位于工具区下方
- 不弹窗、不悬浮、不遮挡工具
- 首页可放1个广告位在工具列表中间
- AdSense 审核通过后再加入广告代码（初期先上线工具）

## SEO 策略

- 每页独立 title、description meta 标签
- 语义化 HTML 结构
- 合理的内部链接（每页底部推荐相关工具）
- robots.txt + sitemap.xml（后续自动生成）
- 结构化数据（HowTo / SoftwareApplication schema）
- 针对 AI 搜索优化：清晰的工具说明文字，方便 ChatGPT 理解并推荐

## 部署方案

- 代码托管：GitHub（公开仓库）
- 托管平台：Cloudflare Pages（连接 GitHub 自动部署）
- 域名绑定：Cloudflare DNS
- 自定义域名（如 devbox.tools）

## 实施计划

1. 创建项目结构和全局样式
2. 实现首页工具目录
3. 逐个实现10个工具页面
4. 添加 SEO meta 标签和 robots.txt
5. 部署到 Cloudflare Pages
6. 申请 Google AdSense（等流量达标后）
7. 持续添加新工具和优化

## 成功指标

| 时间节点 | 目标 |
|----------|------|
| 第1周 | 10个工具全部上线，网站可访问 |
| 第1个月 | 日访问 100+ 独立访客 |
| 第3个月 | 日访问 500+，申请 AdSense |
| 第6个月 | 月收入 $200+ |
| 第12个月 | 月收入 $1000+ |
