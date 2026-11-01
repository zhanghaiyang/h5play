# H5 游戏独立站产品需求文档 (PRD)

## 1. 项目概述 & 盈利模式
本项目致力于打造一个轻量、美观、响应式的高品质 H5 小游戏独立站。
- **盈利模式**：主要依靠 **Google AdSense** 变现（展示广告、插屏广告、视频前贴片广告等）。
- **语言支持**：原生中英文双语界面（手动无缝切换）。
- **游戏载入**：提供双通道载入和前台解耦运行。
  - **渠道 1：直接外链运行**：后台支持配置游戏第三方或自建 H5 托管的绝对 URL。
  - **渠道 2：自包上传解压**：后台支持直接上传含有 `index.html` 的 H5 小游戏 ZIP 压缩包，系统自动解压并托管到网站独立子目录。
  - **前台交互（New Tab 策略）**：为了提供极佳的游戏操作空间并彻底规避主站 CLS/页面广告干扰引发的误触违规，用户在首页或详情页点击游戏后，**直接在新标签页 (target="_blank") 打开游戏容器页**，全屏、纯净、无任何冗余广告遮挡，畅享沉浸游戏。主站则保持展示状态并在详情页停留，继续展示 AdSense 收益位。

---

## 2. 行业竞品分析与“避坑指南”
在小游戏独立站（如 CrazyGames、Poki）中，最核心的雷区与变现矛盾如下，本设计在框架层予以规避：

### 2.1 AdSense 违规防封（最关键）
*   **坑点 1：诱导点击 (Accidental Clicks)**  
    *   *问题*：广告距离游戏 canvas 太近，或者“开始游戏”按钮刚好被延迟加载的广告顶偏，导致用户误点，极易被 AdSense 判定为无效流量封号。
    *   *对策*：在游戏 iframe 四周留出至少 32px 的安全边界。游戏区域上方及侧边广告位必须采用**固定高度**的容器占位，绝对避免游戏加载时布局发生抖动（CLS 累积布局偏移）。
*   **坑点 2：空白页面投放广告**  
    *   *问题*：游戏全屏后，页面主体内容被遮挡，此时若弹出未在可视区内的浮动广告，违反 AdSense 流量政策。
    *   *对策*：全屏模式（Maximized Mode）不使用浏览器原生原生 Fullscreen API。而是采用**“网页内全屏” (Theater Mode)**，在游戏区域两旁/底部优雅展示广告，或在全屏下自动隐藏普通 AdSense，改用 AdSense for Games (AFG) 规范的插屏广告。

### 2.2 性能与加载优化（影响留存）
*   **坑点 3：H5 游戏 iframe 阻塞主线程**  
    *   *问题*：首页一次性加载多个小游戏的 iframe，或者页面一打开就初始化重型 H5 游戏，导致整站卡死、FCP 极差。
    *   *对策*：**延迟加载 (Lazy Load) & 占位图**。初始页面只展示“精美游戏封面占位图 + 预载轻量 MP4 宣传片”。只有当用户鼠标悬停、点击“PLAY”时，才动态创建并向 DOM 插入 iframe。
*   **坑点 4：移动端体验割裂**  
    *   *问题*：很多 H5 游戏在手机上比例失调，或者两边有巨大白边。
    *   *对策*：游戏播放器容器支持 **16:9** 与 **4:3** 自适应响应式比例（使用 CSS `aspect-ratio`）。在移动端进入游戏后，自动显示“旋转提示”（针对横屏游戏）。

---

## 3. 核心功能与页面结构

### 3.1 页面划分
本期项目采用极简高内聚结构，共规划三个核心页面：
1.  **Home Page (首页)**:
    *   头部：Logo、中英文切换、分类导航（益智、动作、休闲等）、暗黑/明亮模式切换。
    *   主视觉区 (Hero Section)：**主打推荐游戏（带视频宣传片播放）**。用户点击“开始玩”直接在当前位置用 iframe 替换视频。
    *   游戏网格列表 (Game Grid)：卡片式布局，鼠标悬浮展现微小动态缩放或短片预览。
    *   广告位配置：顶部 Banner、侧边栏 Skyscraper、游戏列表间隙 Feeds 广告流。
2.  **Game Play Page (游戏详情及播放页)**:
    *   主播放器容器：上方是标题/分类，中部是播放器（默认视频，点击后无缝载入游戏），底部是控制栏（全屏/网页剧场模式、点赞、分享、重新加载）。
    *   相关游戏推荐：右侧/下方卡片流。
    *   广告防误触安全区：播放器左右各留出标准的广告白边。
3.  **About / Terms (关于/隐私权政策页)**:
    *   AdSense 准入必备的 Privacy Policy（包含 Cookie 使用声明），确保通过 Google 审核。

### 3.2 核心交互：后台上传与前台新标签页播放流程
```
[ 站长后台管理 ]:
1. 录入游戏信息（标题、分类、中英文描述、视频/封面图地址）
2. 模式 A: 输入外部 H5 链接URL (如 https://play.game.com/run)
3. 模式 B: 直接上传游戏 .ZIP 压缩包 -> 系统自动解压存放在 /games/<game_slug>/

[ 前台用户访问 ]:
1. 首页 / 详情页展示，用户可静音循环预览游戏宣传视频或精美海报
2. 用户点击 "PLAY NOW" (点击封面、图标或播放键)
3. 触发 window.open() 唤起独立、干净的游戏纯净播放器（在新 Tab 页面中自适应高宽播放）
4. 主站点详情页保留，用户退回后可继续浏览其他游戏或广告位
```

---

## 4. 技术与视觉风格
- **视觉风格**：极简暗色调（Dark Mode 优先，类似于 Steam 或 Poki 风格，更能衬托出游戏的丰富色彩）。
- **多语言机制**：采用无缝前端多语言管理，通过 `data-i18n` 属性和 JSON 翻译字典实现即时切换，无需重新加载页面。
- **技术栈**：
  *  - Vanilla Tailwind CSS (提供极致响应式支持与性能)
  *   HTML5, CSS Custom Properties
  *   ES6 Javascript (轻量、无第三方框架冗余)

---

## 5. 后台H5压缩包自动托管与分发架构

为了实现管理员便捷上传小游戏，系统后台设计了一套自动化解压与静态资源托管流程：

### 5.1 压缩包自动解压分发流程
1. **ZIP上传校验**：
   * 后台支持通过控制面板上传 `.zip` 格式的打包 H5 游戏。
   * **文件验证**：后台接收后，检测压缩包大小（通常限制在 50MB 以内），并扫描压缩包根目录，确保其中包含主入口文件 `index.html`。
2. **自动化目录解压**：
   * 系统利用后端解压库（如 Node.js 中的 `adm-zip` 或 `unzipper`），将 ZIP 解压至服务器的静态托管目录中。
   * **本地托管路径**：`/public/games/<game-slug>/`（如 `/public/games/cyber-surfer/`）。
   * **资源权限控制**：设置解压目录的读取权限（只读不可写），防御潜在的恶意脚本跨站修改同级文件。
3. **动态链接生成**：
   * 自动生成对应的 H5 小游戏独立运行 URL：`https://domain.com/games/<game-slug>/index.html`。
   * 将该生成的链接连同管理员录入的游戏标题、分类、中英文描述、宣传视频等数据保存到数据库。
4. **前端无缝加载**：
   * 前端小游戏纯净容器页 `play.html` 通过路由或 query 传参获取该游戏 URL，用 `iframe` 指向该托管地址，即可实现即开即玩。

---

## 6. SEO & GEO (Generative Engine Optimization) 深度优化方案

针对 Google 传统搜索引擎收录习惯以及新兴 AI 搜索引擎（如 Perplexity, SearchGPT, Gemini 等）的检索偏好，本网站采取双重检索优化策略。

### 6.1 传统谷歌 SEO 优化
1. **伪静态独立 Pretty URL (PRG 结构)**：
   * 避免使用动态 Query 字符串（如 `/detail.html?id=cyber-surfer`）供搜索引擎爬取。
   * 通过服务端路由（Nginx 重写或后端 Express 路由），将详情页路径转化为：
     * **详情页**：`/game/<game-slug>`
     * **运行页**：`/play/<game-slug>`
   * 确保 Googlebot 能够为每一款游戏索引一个独特的静态页面。
2. **多语言 Hreflang 关联标签**：
   * 在详情页头部注入 `hreflang` 标签，声明页面中英文版本，防止 Google 判定为重复内容（Duplicate Content）：
     ```html
     <link rel="alternate" hreflang="zh" href="https://domain.com/zh/game/cyber-surfer" />
     <link rel="alternate" hreflang="en" href="https://domain.com/en/game/cyber-surfer" />
     <link rel="alternate" hreflang="x-default" href="https://domain.com/en/game/cyber-surfer" />
     ```
3. **JSON-LD 结构化数据 (Structured Schema)**：
   * 在每个详情页中嵌入 Schema.org 的 `VideoGame` 结构化标记，帮助 Google 在搜索结果中生成 Rich Snippets（富媒体摘要，展示星级、游戏分类、在玩人数等）：
     ```json
     {
       "@context": "https://schema.org",
       "@type": "VideoGame",
       "name": "Cyber Surfer 2088",
       "description": "An intense high-speed cybernetic endless runner...",
       "genre": "Action",
       "operatingSystem": "HTML5, Web Browser",
       "aggregateRating": {
         "@type": "AggregateRating",
         "ratingValue": "4.8",
         "reviewCount": "124"
       }
     }
     ```
4. **自动生成 Sitemap.xml 与 Robots.txt**：
   * 每次后台录入新游戏时，自动更新 `sitemap.xml`。
   * 在 `robots.txt` 中允许抓取主站和游戏详情页 `/game/*`，但对 `/play/*`（纯净容器页）和 `/games/*`（小游戏解压资源路径）设置 `Disallow`，将 Google 抓取预算（Crawl Budget）100% 集中在内容和广告丰富的详情页，最大化权重。

### 6.2 新兴 GEO (Generative Engine Optimization / 生成式引擎优化)
AI 搜索引擎更倾向于提取逻辑清晰、事实结构化、直接可回答的文本。为此设计以下内容优化：
1. **极简问答式（Q&A）与 FAQ 结构**：
   * 在详情页中加入 FAQ 折叠面板（例如："如何玩这个游戏？"、"可以用手机玩吗？"），并使用标准的 `<details>` 语义化标签或结构化段落，方便 AI 提取为直接回答。
2. **清晰的“操作说明”列表 (Listicles)**：
   * AI 极其偏好有序步骤。我们将游戏操作说明格式化为严格的 HTML `ol/li` 步骤，不使用模糊的图标，如：
     * 1. 使用键盘方向键或 WASD 操控方向。
     * 2. 鼠标点击屏幕释放光刃。
3. **关键数据一览表 (Key Facts)**：
   * 使用 Markdown/HTML 原生 `<table>` 或名值对显示关键元数据（如开发商、发布时间、引擎、支持设备），提高 AI 直接检索生成卡片的概率。

### 6.3 边缘 GEO-Targeting (地域化加载速度优化)
* **全球边缘 CDN 节点 (Cloudflare)**：
  由于 H5 小游戏包含大量图片、音频和 JS 代码，传统服务器全球访问延迟极高。通过部署 Cloudflare 全球 CDN，对静态托管的 `/games/*` 解压资源进行 100% 边缘缓存。
* **延迟与 LCP 指标控制**：
  保持游戏 iframe 动态载入，确保主站的 Largest Contentful Paint (LCP) 在 1.2 秒内，Google 算法会为此类极速响应的页面分配极高的自然排名权重。

---

## 7. H5小游戏加载器与沙箱安全规范

在独立站中加载第三方或上传的 H5 小游戏，最核心的技术是使用 `<iframe>` 标签。为了保障主站的安全以及防止广告受干扰，必须使用严苛的安全加载工具和规范：

### 7.1 iframe 沙箱隔离属性 (`sandbox`)
不能直接加载未经限制的 iframe，必须配置 `sandbox` 属性，仅开放核心功能：
```html
<iframe id="pure-player-frame"
        src="https://domain.com/games/cyber-surfer/index.html"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
        allow="autoplay; gamepad; keyboard-map; fullscreen;"
        class="w-full h-full border-none bg-black">
</iframe>
```
*   **`allow-scripts`**：允许 H5 游戏运行其 JavaScript 逻辑。
*   **`allow-same-origin`**：允许游戏加载其同源下的本地图片、音视频等资源（若去掉此属性，很多使用 WebGL 的游戏会因跨域报错）。
*   **`allow-pointer-lock`**：允许射击类游戏或 3D 游戏锁定玩家鼠标视角，大幅提升操作手感。
*   **禁止 `allow-top-navigation`**：**极度关键！** 绝对不能允许游戏脚本重定向主站页面。防止有些恶意 H5 游戏劫持用户的浏览器，跳出套壳站，导致 Google 判定主站违规。

### 7.2 H5 加载器工具推荐
为了实现丝滑加载、加载进度控制、键盘焦点捕捉和通信，我们推荐并采用以下封装工具/机制：

1. **Vanilla Custom JS Loader (系统内置，最推荐、性能最高)**：
   * *原理*：无需引入臃肿的三方库，利用 ES6 原生 `MessageChannel` 和 `postMessage`，以及原生 `iframe.onload` 事件。
   * *机制*：在 `play.html` 中通过骨架屏占位，在 iframe `onload` 触发后，通过平滑渐变动效淡出 loading 层（我们已在 `play.html` 完美实现该方案，加载速度业内最快）。
2. **Focus Capturer (键盘焦点捕获)**：
   * *痛点*：很多玩家点击开始后，按 WASD 键发现游戏没反应，需要重新用鼠标点一下游戏区域才能玩（因为焦点在父页面）。
   * *对策*：通过 JS 实现焦点自动捕获：
     ```javascript
     const frame = document.getElementById("pure-player-frame");
     frame.addEventListener("mouseenter", () => {
         frame.focus();
     });
     // 加载完成后也自动赋予焦点
     frame.onload = () => {
         frame.contentWindow.focus();
     };
     ```
3. **Pace.js (进度条加载库)**：
   * 如果想在加载大型 H5 小游戏时给玩家极度高级的“游戏载入中”进度指示，可以引入 `pace.min.js` 插件。它能自动追踪 iframe 内部子资源的 Ajax 和加载进度，在父级渲染出一个像素级的加载进度条。
