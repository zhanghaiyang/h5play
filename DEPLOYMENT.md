# H5Play 双语游戏门户网：部署与生产环境配置指南

本指南旨在为您提供关于 **H5Play 高性能双语 H5 游戏门户网站** 完整且专业的部署、网络加速、安全防御、Google AdSense 广告合规及 SEO 优化的生产环境配置说明。

---

## 1. 项目架构概述
* **架构类型**：全静态、无服务器（Serverless）单页/多页 H5 应用。
* **主要优势**：100% 静态文件构成（HTML、CSS、JS、图像与视频），极度适合利用边缘 CDN 节点进行缓存加速。运行无任何数据库或后端容器依赖，维护成本近乎为零，具备天然的防 CC/DDOS 攻击能力。
* **数据流向**：
  * **小游戏数据与评论持久化**：采用浏览器的 `localStorage`（键名分别为 `h5play_games` 以及 `comments_<gameId>`）。
  * **访客 IP 与地理分析**：在前端通过调取免费开源、无并发限制的 `https://freeipapi.com` 客户端地理 API 实时解析，并持久化于 `localStorage`（键名 `h5play_ip_logs`，上限 200 条记录）。

---

## 2. 本地开发与联调测试

由于现代浏览器出于安全原因对 `file://` 协议下的跨域 iframe、视频自动播放及 API 请求做出了严格限制，建议在本地启动轻量级静态 Web 服务器进行联调。

### 推荐工具与运行方法：
1. **VS Code 插件（最简便）**：
   在 VS Code 中安装 **Live Server** 插件，右键点击 `index.html`，选择 `Open with Live Server` 即可一键拉起。
2. **Node.js 工具（适合前端开发者）**：
   在项目根目录下通过终端运行：
   ```bash
   npx http-server -p 8080
   ```
   然后打开浏览器访问 `http://localhost:8080`。
3. **Python 运行命令**：
   如果您的电脑安装了 Python，在项目根目录下运行：
   ```bash
   python -m http.server 8080
   ```
   即可通过 `http://localhost:8080` 进行测试。

---

## 3. 生产环境部署方案选择

根据您的业务规模与运维偏好，我们提供了两种主流部署方案。为了获取极致的性能和最低的运营门槛，**强烈推荐使用“方案 A（全静态边缘托管）”**。

### 方案 A：全球边缘托管服务（强烈推荐 🌟）

适合希望实现全球超低延迟，且不希望购买、配置和维护云服务器的开发者。

| 托管平台 | 推荐理由 | 免费额度 |
| :--- | :--- | :--- |
| **Cloudflare Pages** | 全球 Anycast 节点加速，抗 DDOS 能力业界第一，国内与海外访问均非常迅速。 | 100% 免费，不限带宽与请求数 |
| **Vercel** | 接入速度极快，自带静态资源优化，配置极为简便。 | 100% 免费，每月 100GB 流量 |
| **GitHub Pages** | 适合纯开源项目托管。 | 100% 免费，部分地区有网络抖动 |

#### 🚀 以 Cloudflare Pages 为例的部署步骤：
1. 注册并登录 [Cloudflare 官网](https://dash.cloudflare.com/)。
2. 在左侧导航栏点击 **Workers & Pages** -> 选择 **Pages** -> 点击 **Create an Application**。
3. **连接代码仓库**（推荐）：
   * 选择 **Connect to Git**，绑定您的 GitHub 仓库。
   * 选择分支（如 `main`），构建设置（Build settings）全部留空即可（因为是纯静态项目）。
   * 点击 **Save and Deploy**，后续每次您推送代码都会自动增量更新。
4. **直接上传压缩包**（适合不使用 Git 的用户）：
   * 选择 **Upload assets**。
   * 将压缩好的项目源码包（如 `h5play-production-source.zip` 里的所有文件，注意必须让 `index.html` 处于压缩包根目录）直接拖入上传。
   * 点击 **Deploy Site**，发布即刻上线。

---

### 方案 B：云服务器自建托管（Nginx 方案）

适用于您已有国内或海外云服务器（如阿里云、腾讯云、AWS 等）并希望统一运维的场景。

#### 📋 软件环境：
* 推荐使用 **Linux CentOS 7+** 或 **Ubuntu 20.04+**。
* Web 服务器：**Nginx 1.18+**。

#### 🛠️ Nginx 核心性能与安全优化配置示例：
请将以下配置写入您的 Nginx virtual host 配置文件中（如 `/etc/nginx/conf.d/h5play.conf`）：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # 强制所有流量跳转 HTTPS（保障 AdSense 与 iframe 安全）
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/h5play; # 指向您的 H5Play 源码解压路径
    index index.html;

    # SSL 证书配置 (推荐使用 Let's Encrypt 免费证书)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # 开启 Gzip 静态压缩（大幅减少静态 JS/CSS 首次加载延迟）
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 安全响应头设置 (AdSense 合规与防点击劫持)
    add_header X-Frame-Options "SAMEORIGIN"; # 允许自家页面嵌套
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Content-Security-Policy "upgrade-insecure-requests; frame-src 'self' https://m.h5play.com https://*.google.com https://*.doubleclick.net;";

    # 静态媒体文件长效缓存配置 (提升重复访问效率)
    location ~* \.(jpg|jpeg|png|gif|ico|webp|mp4|webm|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # 前端路由与文件映射
    location / {
        try_files $uri $uri/ =404;
    }

    # 错误页面友好跳转
    error_page 404 /index.html;
}
```

---

## 4. 域名、DNS 缓存与网络加速优化

为了让 Google AdSense 顺利审批，并且获得最好的 SEO 收录权重，您需要配置专属顶级域名并做好 DNS 解析。

1. **域名购买**：推荐注册简短、好记的 `.com` / `.net` / `.org` / `.co` 域名（AdSense 对此类通用顶级域名的信任度及通过率明显高于免费或冷门域名）。
2. **托管 DNS 解析至 Cloudflare（推荐）**：
   * 将您的域名 DNS 服务器（NS）修改为 Cloudflare 提供的地址，以便利用 CF 提供的全球 DNS 边缘解析、CDN 加速以及 DDoS 攻击防御。
   * **SSL/TLS 模式**：在 Cloudflare 中设置为 **Full（严格）** 或 **Full** 模式，确保全链路 HTTPS。
3. **启用浏览器缓存与页面提速（Cloudflare 优化）**：
   * 在 Cloudflare 控制面板的 **Caching** 页面，设置 **Browser Cache TTL** 为 `1 Day` 以上。
   * 开启 **Minify**（自动压缩 HTML、CSS 和 JavaScript 文件），节约网络传输体积。
   * 启用 **Brotli 压缩** 以获取优于传统 Gzip 的更高压缩比率。

---

## 5. Google AdSense 变现合规配置

H5Play 门户在设计上专门针对 **Google AdSense** 的高标准合规规则进行了精细化布局，消除了所有导致意外点击（Accidental Clicks）的违规设计。

### 🌟 页面已内置的合规设计：
* **CLS-Free（无累积布局偏移）广告占位**：顶部及侧边广告位固定了高度和宽度，采用骨架屏背景。即使广告加载缓慢，也不会导致页面内容瞬间下移从而被 Google 判定为“引导用户误触广告”。
* **32px 防误触安全间距**：根据 AdSense 最新游戏政策，游戏卡片/详情页与广告容器间距均维持在安全距离，最大程度降低由于点击游戏或详情页按钮时不小心误触广告的几率。

### 🛠️ 部署上线的必备合规操作：
1. **配置 `ads.txt` 文件**：
   当您的 AdSense 申请通过后，Google 会要求您在网站根目录下放置 `ads.txt` 声明。请在项目根目录下创建一个名为 `ads.txt` 的普通文本文件，内容格式如下：
   ```text
   google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0
   ```
   *(请将 `pub-xxxxxxxxxxxxxxxx` 替换为您专属的 AdSense 发布商 ID。放置后，可通过 `https://yourdomain.com/ads.txt` 访问验证。)*
2. **遵守隐私协议（Privacy Policy）声明**：
   Google 强制要求加入隐私声明。本网站已为您在根目录准备了高合规的 `privacy.html` 隐私及 Cookie 声明文件。
   * 声明中已明确列出对 Google AdSense、第三方服务 Cookie、和收集用户语言偏好的法律陈述，确保您的网站完全合规，顺利通过审核。

---

## 6. SEO 搜索引擎收录优化

本站点采用静态化结构，对 Googlebot 等各大搜索引擎爬虫极为友好，极速秒收录。

1. **元数据（Meta Tags）配置**：
   * 网站在 `index.html` 与 `detail.html` 的头部已经设置好了语义清晰的 `title`、`keywords` 以及 `description` 标签。
   * 支持 **Open Graph 协议**（`og:title`、`og:description`、`og:image` 等），便于用户将网站转发到 Twitter (X)、Facebook 或 Discord 时，自动生成精美的富媒体卡片卡。
2. **提供 Sitemap.xml 站点地图**：
   推荐在根目录创建一个 `sitemap.xml`，将首页、隐私页以及主要游戏详情页列出。例如：
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
           <loc>https://yourdomain.com/index.html</loc>
           <priority>1.0</priority>
           <changefreq>daily</changefreq>
       </url>
       <url>
           <loc>https://yourdomain.com/privacy.html</loc>
           <priority>0.5</priority>
           <changefreq>monthly</changefreq>
       </url>
       <url>
           <loc>https://yourdomain.com/detail.html?id=cyber-surfer</loc>
           <priority>0.8</priority>
       </url>
       <url>
           <loc>https://yourdomain.com/detail.html?id=retro-drift</loc>
           <priority>0.8</priority>
       </url>
   </urlset>
   ```
   之后，注册 [Google Search Console](https://search.google.com/search-console)，将您的域名添加进去，并在“站点地图”栏提交此链接（如 `https://yourdomain.com/sitemap.xml`），可加速详情页的收录进程。

---

## 7. 安全与运营微调要点

### 🔒 管理后台按钮隐蔽机制（Security by Obscurity）
为了防止无关访客恶意猜解或频繁访问管理后台：
* **前台链接隐藏**：我们已经移除了前台公共页面（`index.html`、`detail.html`、`privacy.html`）顶部的“Console/管理后台”导航按钮。
* **访问入口**：作为管理员，您只需要直接在浏览器地址栏手动输入 `/admin.html` 拼接即可进入（如 `https://yourdomain.com/admin.html`）。建议将此页面加入您个人的浏览器收藏夹。

### 📊 运营数据导出备份
由于游戏配置、玩家评论、访客日志数据均存储在当前浏览器的 `localStorage` 中：
* **注意点**：当您在管理后台新发布了小游戏，这些数据存放在当前设备的 `localStorage` 中。其他访客在公共页面访问时，由于这是静态站点，默认会获取系统自带的 12 款小游戏展示。
* **分发小游戏至访客端的方法**：
  * **快速测试/演示**：直接在您的浏览器中访问，体验流畅的前后端闭环。
  * **生产环境数据上线**：本系统基于单文件核心配置。当您在本地或后台设计好了最新的游戏列表、并确认满意后，建议直接在 `assets/js/app.js` 文件的 `INITIAL_GAMES_DATABASE` 数组中更新静态小游戏列表（或者用您导出的配置去替换），这样全球用户访问时，即可同步展示您发布配置的小游戏。
