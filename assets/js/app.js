/**
 * H5 游戏门户网站前端多语言及交互主脚本 (Dark Mode, Hover-Video, i18n & Comments System)
 */

// 1. 多语言翻译字典 (i18n Translations)
const translations = {
    zh: {
        logo: "H5Play",
        nav_home: "首页",
        nav_action: "动作",
        nav_puzzle: "益智",
        nav_casual: "休闲",
        nav_sports: "体育",
        nav_privacy: "隐私政策",
        nav_admin: "管理后台",
        hero_tag: "今日主打推荐",
        hero_play: "立即畅玩",
        section_trending: "热门游戏 🔥",
        section_recent: "新游上线 ⚡",
        section_category: "游戏分类浏览 🎮",
        btn_play: "进入详情",
        ad_placeholder: "赞助商广告 (AdSense Slot)",
        ad_warn_title: "广告合规区",
        ad_warn_desc: "安全间距防误触控制",
        game_players: "人在玩",
        footer_desc: "高品质 H5 小游戏免费在线玩独立站。无需下载，点击即玩。中英双语支持，完美适配移动端与桌面端。",
        footer_rights: "版权所有. 保留所有权利。",
        play_mode_theater: "剧场模式",
        play_mode_window: "新窗口启动",
        play_mode_reload: "重载游戏",
        play_mode_back: "返回大厅",
        game_desc_title: "游戏介绍",
        game_control_title: "操作说明",
        game_control_content: "键盘方向键 / WASD 或 鼠标点击拖动进行操作。手机端直接轻触屏幕即可游玩。",
        privacy_title: "隐私政策 & Cookie 政策",
        privacy_p1: "我们非常重视您的隐私。本页面详细说明了我们在您访问 H5Play 时收集、使用和保护您个人信息的情况。",
        privacy_adsense_title: "Google AdSense 广告与第三方服务",
        privacy_adsense_p: "我们使用 Google AdSense 在本站投放展示广告。Google 作为第三方广告供应商，使用 Cookie 根据您对本站及互联网其他网站的访问情况，向您投放个性化广告。您可以通过访问 Google 广告和内容联盟网络隐私政策，来选择停用个性化广告的 Cookie 使用。",
        privacy_cookie_title: "我们如何使用 Cookie",
        privacy_cookie_p: "我们使用 Cookie 来记住您的语言偏好、分析流量、并优化您的整体浏览体验。继续使用我们的网站即表示您同意我们使用这些 Cookie。",
        
        // 增量评论与丰富化翻译
        comments_section_title: "玩家评论区 💬",
        comments_input_placeholder: "写下你的游戏评价，分享快乐...",
        comments_submit_btn: "提交评价",
        comments_name_placeholder: "玩家昵称",
        comments_no_comments: "暂无玩家评论。快来抢沙发吧！",
        comments_anonymous: "匿名玩家",
        comments_success_toast: "评论提交成功！",
        game_rating: "游戏评分",
        category_all: "全部游戏",
        category_action: "动作射击",
        category_puzzle: "益智解谜",
        category_casual: "休闲益智",
        category_sports: "体育竞速",
        stats_plays: "总播放量",
        stats_category: "分类"
    },
    en: {
        logo: "H5Play",
        nav_home: "Home",
        nav_action: "Action",
        nav_puzzle: "Puzzle",
        nav_casual: "Casual",
        nav_sports: "Sports",
        nav_privacy: "Privacy",
        nav_admin: "Console",
        hero_tag: "FEATURED GAME OF THE DAY",
        hero_play: "PLAY NOW",
        section_trending: "Trending Games 🔥",
        section_recent: "New Releases ⚡",
        section_category: "Browse Categories 🎮",
        btn_play: "View Details",
        ad_placeholder: "Sponsored Advertisement (AdSense)",
        ad_warn_title: "AdSense Compliance Area",
        ad_warn_desc: "Safe Spacing Prevent Accidental Clicks",
        game_players: "playing",
        footer_desc: "High-quality H5 mini-games free online portal. No downloads, instant play in your browser. Dual-language support, perfect for mobile & desktop.",
        footer_rights: "All Rights Reserved.",
        play_mode_theater: "Theater Mode",
        play_mode_window: "New Window Launch",
        play_mode_reload: "Reload Game",
        play_mode_back: "Back to Portal",
        game_desc_title: "About the Game",
        game_control_title: "How to Play",
        game_control_content: "Use WASD / Arrow Keys or mouse click & drag to control. Tap on screen directly when playing on mobile devices.",
        privacy_title: "Privacy & Cookie Policy",
        privacy_p1: "Your privacy is important to us. This privacy policy explains what personal information we collect, use, and safeguard when you browse H5Play.",
        privacy_adsense_title: "Google AdSense & Third-Party Services",
        privacy_adsense_p: "We use Google AdSense to serve ads when you visit our website. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to your website or other websites. Users may opt out of personalized advertising by visiting Google's Ads Settings.",
        privacy_cookie_title: "How We Use Cookies",
        privacy_cookie_p: "We use cookies to remember your language preferences, analyze our site traffic, and optimize your overall browsing experience. By continuing to use our website, you consent to our use of cookies.",
        
        // Comments System & Rich Elements
        comments_section_title: "Player Comments 💬",
        comments_input_placeholder: "Write your review here. What do you think...",
        comments_submit_btn: "Submit Review",
        comments_name_placeholder: "Your Name",
        comments_no_comments: "No reviews yet. Be the first to leave a comment!",
        comments_anonymous: "Anonymous Player",
        comments_success_toast: "Comment posted successfully!",
        game_rating: "Rating",
        category_all: "All Games",
        category_action: "Action",
        category_puzzle: "Puzzle",
        category_casual: "Casual",
        category_sports: "Sports",
        stats_plays: "Plays",
        stats_category: "Category"
    }
};

// 2. 模拟本地小游戏数据库 (充实到 12 款小游戏，增加游戏评分与更多视频)
const INITIAL_GAMES_DATABASE = [
    {
        id: "cyber-surfer",
        title_en: "Cyber Surfer 2088",
        title_zh: "赛博冲浪者 2088",
        category: "action",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-gaming-lead-moving-forward-with-a-gun-40019-large.mp4",
        url: "https://m.h5play.com/demo/cyber-surfer",
        players: "124K",
        rating: "4.8",
        desc_en: "An intense high-speed cybernetic endless runner. Jump over neon block grids, slice obstacles with energy blades, and race to cyberpunk beats.",
        desc_zh: "一款极具速度感的科幻风无限跑酷游戏。在霓虹流光中跃过障碍、挥舞光刃斩断阻碍，伴随着动感节奏冲向赛博之城。"
    },
    {
        id: "tile-matching",
        title_en: "Zen Block Matching",
        title_zh: "禅意方块消消乐",
        category: "puzzle",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-game-on-a-smartphone-40040-large.mp4",
        url: "https://m.h5play.com/demo/zen-matching",
        players: "89K",
        rating: "4.6",
        desc_en: "Clear the board by matching beautiful hand-crafted wooden tiles. Pure tactical puzzle gameplay designed to relieve anxiety.",
        desc_zh: "通过配对手工质感的禅意木块来清空棋盘。纯粹的策略消除玩法，旨在帮助您放松身心、缓解压力。"
    },
    {
        id: "retro-drift",
        title_en: "Retro Neon Drift",
        title_zh: "复古霓虹漂移",
        category: "sports",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-car-drifting-in-an-arcade-style-retro-game-40101-large.mp4",
        url: "https://m.h5play.com/demo/retro-drift",
        players: "210K",
        rating: "4.9",
        desc_en: "Arcade-style retro racing with realistic drifting physics. Beat lap times, unlock iconic retro cars, and listen to synthwave synth music.",
        desc_zh: "街机风格的复古赛车游戏，拥有真实的漂移物理引擎。挑战单圈记录、解锁复古跑车，享受极速狂飙。"
    },
    {
        id: "word-connect",
        title_en: "Word Connect Bilingual",
        title_zh: "中英单词接龙",
        category: "puzzle",
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-playing-a-game-40045-large.mp4",
        url: "https://m.h5play.com/demo/word-connect",
        players: "45K",
        rating: "4.3",
        desc_en: "Swipe letters to form words and train your brain. Perfect for English vocabulary practice or dual-language enthusiasts.",
        desc_zh: "滑动手指连接字母，组成正确的单词。非常适合练习英语词汇或双语学习爱好者进行脑力训练。"
    },
    {
        id: "hyper-bounce",
        title_en: "Hyper Gravity Bounce",
        title_zh: "重力无极限弹球",
        category: "casual",
        image: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-arcade-game-of-a-ball-bouncing-against-blocks-40097-large.mp4",
        url: "https://m.h5play.com/demo/gravity-bounce",
        players: "67K",
        rating: "4.5",
        desc_en: "Manipulate gravity in real-time to bounce the glowing energy sphere into target bins. Compete in 50+ gravity-defying stages.",
        desc_zh: "实时操控重力方向，引导发光的能量球落入目标区域。挑战超过50个颠覆物理法则的奇妙关卡。"
    },
    {
        id: "pixel-dungeon",
        title_en: "Pixel Rogue Dungeon",
        title_zh: "像素地牢大师",
        category: "action",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-game-on-a-smartphone-40040-large.mp4",
        url: "https://m.h5play.com/demo/pixel-rogue",
        players: "154K",
        rating: "4.7",
        desc_en: "A challenging classic pixel rogue-like. Delve deep, fight monsters, find chest items, and level up to unlock unique classes.",
        desc_zh: "一款高难度传统像素风地牢冒险。探索无尽迷宫、收集宝箱道具、提升角色等级并解锁专属职业。"
    },
    {
        id: "space-defense",
        title_en: "Galactic Star Defender",
        title_zh: "银河星战防御",
        category: "action",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-gaming-lead-moving-forward-with-a-gun-40019-large.mp4",
        url: "https://m.h5play.com/demo/space-defense",
        players: "98K",
        rating: "4.6",
        desc_en: "Command your starship, deploy drone barriers, and defend the outer rim colony from endless alien insect waves.",
        desc_zh: "指挥你的星际战舰，部署无人机护盾，保卫外环殖民地免受无穷无尽的外星虫族侵袭。"
    },
    {
        id: "sudoku-zen",
        title_en: "Zen Sudoku Daily",
        title_zh: "每日禅意数独",
        category: "puzzle",
        image: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-game-on-a-smartphone-40040-large.mp4",
        url: "https://m.h5play.com/demo/sudoku",
        players: "34K",
        rating: "4.4",
        desc_en: "Classic numbers grid with varying difficulty. Train logical thinking skills, unlock daily badges and soothing melodies.",
        desc_zh: "经典数独九宫格挑战。训练逻辑思维能力，解锁每日成就徽章以及舒缓心灵的和弦乐曲。"
    },
    {
        id: "fruit-match",
        title_en: "Fruit Splat Frenzy",
        title_zh: "水果切切狂欢",
        category: "casual",
        image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-playing-a-game-40045-large.mp4",
        url: "https://m.h5play.com/demo/fruit-splat",
        players: "142K",
        rating: "4.7",
        desc_en: "Slice juicy flying fruits, avoid explosive bombs, and perform multi-slash combos in this satisfying arcade action.",
        desc_zh: "切碎迎面飞来的多汁水果，避开危险的炸弹，连击打出超高得分。畅享极致丝滑的解压快感。"
    },
    {
        id: "kart-fever",
        title_en: "Mini Kart Racing Pro",
        title_zh: "微型卡丁车大赛",
        category: "sports",
        image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-car-drifting-in-an-arcade-style-retro-game-40101-large.mp4",
        url: "https://m.h5play.com/demo/kart-fever",
        players: "115K",
        rating: "4.8",
        desc_en: "Drift through colorful toy courses, pick up explosive powerups, and target your friends in extreme arcade racing.",
        desc_zh: "在色彩斑斓的玩具跑道上漂移过弯，收集奇妙道具轰翻对手。支持双人同屏游玩的派对极速赛车。"
    },
    {
        id: "solitaire-zen",
        title_en: "Solitaire Classic Calm",
        title_zh: "禅意经典纸牌",
        category: "casual",
        image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-playing-a-game-on-a-smartphone-40040-large.mp4",
        url: "https://m.h5play.com/demo/solitaire",
        players: "53K",
        rating: "4.5",
        desc_en: "The legendary card game with smooth dragging animations, customized table skins, and optional auto-solve assistance.",
        desc_zh: "传奇纸牌推移玩法。拥有平滑的手指拖拽动画，可定制背景主题、卡背样式，并包含智能通关提示。"
    },
    {
        id: "chess-royale",
        title_en: "Chess Masters Club",
        title_zh: "大师国际象棋",
        category: "puzzle",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80",
        video: "https://assets.mixkit.co/videos/preview/mixkit-arcade-game-of-a-ball-bouncing-against-blocks-40097-large.mp4",
        url: "https://m.h5play.com/demo/chess",
        players: "28K",
        rating: "4.6",
        desc_en: "Challenge sophisticated AI opponents or play friendly chess rounds globally. Includes detailed game replays and tips.",
        desc_zh: "向高度智能的AI棋手发起挑战，或是与全球国际象棋爱好者在线友好对局。提供详细的复盘分析与博弈提示。"
    }
];

// 从 localStorage 加载或初始化
let gamesDatabase = JSON.parse(localStorage.getItem("h5play_games")) || INITIAL_GAMES_DATABASE;
if (!localStorage.getItem("h5play_games")) {
    localStorage.setItem("h5play_games", JSON.stringify(INITIAL_GAMES_DATABASE));
}

// 监听 storage 事件在多页面间实时同步数据
window.addEventListener("storage", () => {
    gamesDatabase = JSON.parse(localStorage.getItem("h5play_games")) || INITIAL_GAMES_DATABASE;
    currentLang = localStorage.getItem("h5play_lang") || "en";
    
    renderCategoryFilter();
    renderGamesGrid();
    renderHeroSection();
    renderActiveGameDetail();
    renderComments();
});

// 初始化模拟评论数据 (Pre-populated comments)
const defaultComments = {
    "cyber-surfer": [
        { name: "NeonRider", content_zh: "太酷炫了！音乐带感，操作也很顺滑，停不下来！", content_en: "So cool! The music is awesome and controls are extremely smooth, can't stop playing!", date: "2026-10-17" },
        { name: "Alex_Game", content_zh: "在新窗口玩确实爽，不卡顿而且视野极好！", content_en: "Playing in a new tab is amazing, zero lag and great view space!", date: "2026-10-18" }
    ],
    "tile-matching": [
        { name: "静心木木", content_zh: "超级解压，下班玩几局特别舒服。", content_en: "Super relaxing. Love playing a few rounds after work.", date: "2026-10-15" }
    ],
    "retro-drift": [
        { name: "SpeedyPro", content_zh: "卡丁车和霓虹跑道都画得很精致，给漂移物理赞一个！", content_en: "Great car designs and neon tracks, drift physics is spot on!", date: "2026-10-16" }
    ]
};

// 当前选中的分类过滤
let activeCategory = "all";

// 当前语言偏好
let currentLang = localStorage.getItem("h5play_lang") || "en";

// 3. 执行语言翻译替换
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("h5play_lang", lang);
    document.documentElement.lang = lang;

    // 翻译带 data-i18n 属性的标签
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // 切换按钮状态激活效果
    document.querySelectorAll(".lang-btn").forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("bg-indigo-600", "text-white");
            btn.classList.remove("bg-gray-800", "text-gray-300");
        } else {
            btn.classList.remove("bg-indigo-600", "text-white");
            btn.classList.add("bg-gray-800", "text-gray-300");
        }
    });

    // 渲染或更新页面内容
    renderCategoryFilter();
    renderGamesGrid();
    renderHeroSection();
    renderActiveGameDetail();
    
    // 如果存在评论，刷新评论区语言
    renderComments();
}

// 4. 渲染分类过滤菜单 (Category Filter)
function renderCategoryFilter() {
    const filterContainer = document.getElementById("category-filter-container");
    if (!filterContainer) return;

    const categories = ["all", "action", "puzzle", "casual", "sports"];

    filterContainer.innerHTML = categories.map(cat => {
        const isActive = activeCategory === cat;
        const text = translations[currentLang][`category_${cat}`] || translations[currentLang][`nav_${cat}`] || cat;
        return `
            <button onclick="setCategoryFilter('${cat}')" 
                    class="px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                        isActive 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                    }">
                ${text}
            </button>
        `;
    }).join("");
}

function setCategoryFilter(category) {
    activeCategory = category;
    renderCategoryFilter();
    renderGamesGrid();
}

// 5. 动态渲染 Hero 首屏主打（支持后台动态配置数量与自动轮播控制器）
let currentHeroSlide = 0;
let heroAutoplayTimer = null;
let totalHeroSlides = 5;

window.goToHeroSlide = function(idx) {
    currentHeroSlide = idx;
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    if (!slides.length) return;
    
    slides.forEach((slide, sIdx) => {
        if (sIdx === idx) {
            slide.classList.remove("opacity-0", "scale-95", "pointer-events-none", "z-0");
            slide.classList.add("opacity-100", "scale-100", "z-10");
            const video = slide.querySelector("video");
            if (video) {
                video.currentTime = 0;
                video.play().catch(() => {});
            }
        } else {
            slide.classList.add("opacity-0", "scale-95", "pointer-events-none", "z-0");
            slide.classList.remove("opacity-100", "scale-100", "z-10");
            const video = slide.querySelector("video");
            if (video) video.pause();
        }
    });

    dots.forEach((dot, dIdx) => {
        if (dIdx === idx) {
            dot.classList.remove("bg-white/30", "w-2");
            dot.classList.add("bg-indigo-500", "w-6");
        } else {
            dot.classList.add("bg-white/30", "w-2");
            dot.classList.remove("bg-indigo-500", "w-6");
        }
    });
};

window.nextHeroSlide = function() {
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    window.goToHeroSlide(currentHeroSlide);
};

window.prevHeroSlide = function() {
    currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
    window.goToHeroSlide(currentHeroSlide);
};

window.startHeroAutoplay = function() {
    window.stopHeroAutoplay();
    heroAutoplayTimer = setInterval(() => {
        window.nextHeroSlide();
    }, 5000);
};

window.stopHeroAutoplay = function() {
    if (heroAutoplayTimer) {
        clearInterval(heroAutoplayTimer);
        heroAutoplayTimer = null;
    }
};

function renderHeroSection() {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) return;

    let featuredGames = JSON.parse(localStorage.getItem("h5play_carousel_config"));
    if (!featuredGames || !featuredGames.length) {
        // 如果没有后台配置，则读取默认前 5 款游戏
        const rawGames = gamesDatabase.slice(0, 5);
        featuredGames = rawGames.map(game => ({
            id: game.id,
            title_zh: game.title_zh,
            title_en: game.title_en,
            desc_zh: game.desc_zh,
            desc_en: game.desc_en,
            image: game.image,
            video: game.video,
            type: game.video ? "video" : "image"
        }));
    }

    // 修复无配置或空配置时的兜底渲染逻辑
    if (!featuredGames || !featuredGames.length) {
        heroSection.innerHTML = `
            <div class="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 flex items-center justify-center">
                <span class="text-gray-500 text-sm">No featured slides. Configure them in Admin Console.</span>
            </div>
        `;
        return;
    }

    totalHeroSlides = featuredGames.length;
    if (currentHeroSlide >= totalHeroSlides) {
        currentHeroSlide = 0;
    }

    let slidesHTML = "";
    let dotsHTML = "";

    featuredGames.forEach((game, idx) => {
        const title = currentLang === "zh" ? game.title_zh : game.title_en;
        const desc = currentLang === "zh" ? game.desc_zh : game.desc_en;
        const isActive = idx === currentHeroSlide;

        const activeClasses = isActive 
            ? "opacity-100 scale-100 z-10" 
            : "opacity-0 scale-95 pointer-events-none z-0";

        // 判定背景类型 (视频或是图片)
        let backgroundHTML = "";
        if (game.type === "video" && game.video) {
            backgroundHTML = `
                <video class="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-1000" 
                       src="${game.video}" ${isActive ? 'autoplay' : ''} loop muted playsinline></video>
            `;
        } else {
            backgroundHTML = `
                <img class="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-1000" 
                     src="${game.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'}" alt="${title}">
            `;
        }

        slidesHTML += `
            <div class="hero-slide absolute inset-0 w-full h-full transition-all duration-1000 transform ${activeClasses}">
                <!-- 背景渲染区 -->
                ${backgroundHTML}
                <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                
                <!-- 内容展示区 -->
                <div class="absolute bottom-0 left-0 p-4 md:p-12 max-w-2xl text-left">
                    <span class="inline-block px-3 py-1 bg-indigo-600 text-[10px] md:text-xs font-bold text-white tracking-widest rounded-full uppercase mb-2 md:mb-4">
                        ${translations[currentLang].hero_tag}
                    </span>
                    <h2 class="text-xl md:text-5xl font-black text-white leading-tight mb-2 md:mb-4 select-none drop-shadow">
                        ${title}
                    </h2>
                    <p class="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                        ${desc}
                    </p>
                    <button onclick="viewGameDetail('${game.id}')" 
                            class="px-4 py-2 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs md:text-sm font-bold rounded-lg shadow-lg flex items-center gap-2 md:gap-3 transition">
                        <svg class="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        <span>${translations[currentLang].btn_play}</span>
                    </button>
                </div>
            </div>
        `;

        dotsHTML += `
            <button onclick="goToHeroSlide(${idx}); stopHeroAutoplay(); startHeroAutoplay();" 
                    class="hero-dot h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-500 w-6' : 'bg-white/30 w-2'}"
                    title="Slide ${idx + 1}"></button>
        `;
    });

    // 修复多余的空配置判断在错误位置，前面已有了 featuredGames 的空兜底判断，此时 totalHeroSlides 绝不为 0
    heroSection.innerHTML = `
        <div class="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group"
             onmouseenter="stopHeroAutoplay()" 
             onmouseleave="startHeroAutoplay()">
            
            <!-- 幻灯片容器 -->
            <div class="absolute inset-0 w-full h-full">
                ${slidesHTML}
            </div>

            <!-- 左/右切换控制箭头 -->
            <button onclick="prevHeroSlide(); stopHeroAutoplay(); startHeroAutoplay();" 
                    class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 rounded-full bg-black/30 hover:bg-indigo-600 border border-white/10 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90 select-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button onclick="nextHeroSlide(); stopHeroAutoplay(); startHeroAutoplay();" 
                    class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 rounded-full bg-black/30 hover:bg-indigo-600 border border-white/10 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90 select-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <!-- 底部导航圆点指示器 -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                ${dotsHTML}
            </div>
        </div>
    `;

    // 启动自动播放
    startHeroAutoplay();
}

// 6. 动态渲染游戏列表 (并初始化 Hover 视频播放事件监听)
function renderGamesGrid() {
    const trendingGrid = document.getElementById("trending-grid");
    const recentGrid = document.getElementById("recent-grid");

    // 根据选择的品类对游戏进行过滤
    const filteredGames = activeCategory === "all" 
        ? gamesDatabase 
        : gamesDatabase.filter(g => g.category === activeCategory);

    if (trendingGrid) {
        // 展示精选热门（取前 6 个或过滤后的前一半）
        const trendList = filteredGames.slice(0, 6);
        trendingGrid.innerHTML = trendList.length > 0 
            ? trendList.map(game => createGameCard(game)).join("") 
            : `<div class="col-span-full py-12 text-center text-gray-500 text-sm">No games found under this category.</div>`;
    }
    if (recentGrid) {
        // 展示最近新游（取剩余的游戏）
        const recentList = filteredGames.slice(6);
        recentGrid.innerHTML = recentList.length > 0 
            ? recentList.map(game => createGameCard(game)).join("") 
            : "";
    }

    // 绑定 Hover 卡片自动静音播放视频事件
    initHoverVideoPlay();
}

// 拼接游戏卡片 HTML (具有静态海报和隐藏 video 的重叠层结构)
function createGameCard(game) {
    const title = currentLang === "zh" ? game.title_zh : game.title_en;
    const categoryText = translations[currentLang][`category_${game.category}`] || game.category;
    
    return `
        <div class="game-card bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-600/5 transition-all duration-300 group flex flex-col" data-id="${game.id}">
            <!-- 媒体层（鼠标悬浮时：图片淡出，视频自动静音播放） -->
            <div class="relative aspect-video w-full overflow-hidden bg-gray-950">
                
                <!-- 静态海报封面 -->
                <img src="${game.image}" alt="${title}" class="card-img w-full h-full object-cover group-hover:scale-105 transition-all duration-500 absolute inset-0 z-10">
                
                <!-- 悬浮播放的视频元素 (静音, loop, 隐藏) -->
                ${game.video ? `
                    <video class="card-video w-full h-full object-cover absolute inset-0 z-0 opacity-0 transition-opacity duration-300" 
                           src="${game.video}" loop muted playsinline></video>
                ` : ""}

                <!-- 悬停渐入的遮罩与播放按钮 -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300 z-20">
                    <button onclick="viewGameDetail('${game.id}')" 
                            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300 text-xs">
                        ${translations[currentLang].btn_play}
                    </button>
                </div>
            </div>
            
            <!-- 内容介绍区 -->
            <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between gap-2">
                        <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">${categoryText}</span>
                        <span class="text-amber-400 text-xs font-bold">⭐ ${game.rating}</span>
                    </div>
                    <h3 class="text-sm font-bold text-white mt-1 group-hover:text-indigo-400 transition line-clamp-1">${title}</h3>
                </div>
                <div class="flex items-center justify-between mt-4 text-[10px] text-gray-400">
                    <span>🔥 ${game.players} ${translations[currentLang].game_players}</span>
                </div>
            </div>
        </div>
    `;
}

// 7. Hover 卡片自动播放逻辑 (精细化淡入淡出、零卡顿延迟)
function initHoverVideoPlay() {
    document.querySelectorAll(".game-card").forEach(card => {
        const img = card.querySelector(".card-img");
        const video = card.querySelector(".card-video");
        
        if (!video) return; // 如果该游戏没有配置视频则不执行

        let playTimeout;

        card.addEventListener("mouseenter", () => {
            // 设定微小延时，防止用户鼠标快速划过页面时频繁触发视频加载导致的开销
            playTimeout = setTimeout(() => {
                video.currentTime = 0;
                video.play().then(() => {
                    // 视频播放成功后，图片淡出，视频淡入，获得平滑交替动效
                    img.classList.add("opacity-0");
                    video.classList.remove("opacity-0");
                    video.classList.add("opacity-100");
                }).catch(err => console.log("Hover video play blocked:", err));
            }, 250);
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(playTimeout);
            // 鼠标移出，停止视频，封面瞬间拉回，视频淡出
            video.pause();
            img.classList.remove("opacity-0");
            video.classList.remove("opacity-100");
            video.classList.add("opacity-0");
        });
    });
}

// 8. 详情页渲染与核心交互 (进入详情页面)
function viewGameDetail(gameId) {
    window.location.href = `detail.html?id=${gameId}`;
}

// 9. 详情页与播放器页面渲染
function renderActiveGameDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");
    if (!gameId) return;

    const game = gamesDatabase.find(g => g.id === gameId);
    if (!game) return;

    const titleEl = document.getElementById("detail-title");
    const descEl = document.getElementById("detail-desc");
    const previewContainer = document.getElementById("game-preview-container");
    const previewVideo = document.getElementById("detail-preview-video");
    const ratingEl = document.getElementById("detail-rating");
    const playsEl = document.getElementById("detail-plays");
    const categoryEl = document.getElementById("detail-category");

    if (titleEl) {
        titleEl.innerText = currentLang === "zh" ? game.title_zh : game.title_en;
    }
    if (descEl) {
        descEl.innerText = currentLang === "zh" ? game.desc_zh : game.desc_en;
    }
    if (ratingEl) {
        ratingEl.innerText = `⭐ ${game.rating}`;
    }
    if (playsEl) {
        playsEl.innerText = game.players;
    }
    if (categoryEl) {
        categoryEl.innerText = translations[currentLang][`category_${game.category}`] || game.category;
    }
    
    // 设置详情页大视频或海报背景
    if (previewContainer) {
        previewContainer.style.backgroundImage = `url('${game.image}')`;
        
        // 如果游戏含有视频，则在详情首屏循环静音播放视频预览
        if (game.video && previewVideo) {
            previewVideo.src = game.video;
            previewVideo.classList.remove("hidden");
            previewVideo.play().catch(e => console.log("Detail autoplay blocked:", e));
        }
    }

    // 渲染当前游戏的评论
    renderComments();
}

// 10. 玩家评论系统 (Comments System - 采用 localStorage 持久化)
function getCommentsForGame(gameId) {
    const localComments = localStorage.getItem(`comments_${gameId}`);
    if (localComments) {
        return JSON.parse(localComments);
    }
    return defaultComments[gameId] || [];
}

function saveCommentForGame(gameId, comment) {
    const currentList = getCommentsForGame(gameId);
    currentList.unshift(comment); // 插入到评论列表首部（最新评论置顶）
    localStorage.setItem(`comments_${gameId}`, JSON.stringify(currentList));
}

function renderComments() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");
    const listContainer = document.getElementById("comments-list");
    if (!gameId || !listContainer) return;

    const comments = getCommentsForGame(gameId);

    if (comments.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-10 text-gray-500 text-sm">
                <p data-i18n="comments_no_comments">${translations[currentLang].comments_no_comments}</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = comments.map(comm => {
        const content = currentLang === "zh" 
            ? (comm.content_zh || comm.content) 
            : (comm.content_en || comm.content);
        const name = comm.name || translations[currentLang].comments_anonymous;
        return `
            <div class="border-b border-gray-800/60 py-4 flex flex-col gap-1 last:border-b-0">
                <div class="flex items-center justify-between gap-4">
                    <span class="font-bold text-gray-200 text-sm flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                            ${name.charAt(0).toUpperCase()}
                        </span>
                        ${name}
                    </span>
                    <span class="text-[10px] text-gray-500">${comm.date}</span>
                </div>
                <p class="text-gray-300 text-sm pl-8 leading-relaxed">${content}</p>
            </div>
        `;
    }).join("");
}

// 提交新评论
function submitNewComment() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");
    const nameInput = document.getElementById("comment-name-input");
    const contentInput = document.getElementById("comment-content-input");

    if (!gameId || !contentInput) return;

    const nameVal = nameInput.value.trim() || translations[currentLang].comments_anonymous;
    const contentVal = contentInput.value.trim();

    if (!contentVal) return;

    const today = new Date().toISOString().split('T')[0];

    const newComment = {
        name: nameVal,
        content: contentVal, // 双语内容默认一致，提供单字段存储
        content_zh: contentVal,
        content_en: contentVal,
        date: today
    };

    saveCommentForGame(gameId, newComment);

    // 清空输入框
    contentInput.value = "";
    nameInput.value = "";

    // 重新渲染评论区并展示提示
    renderComments();
    showToast(translations[currentLang].comments_success_toast);
}

// 弹出式提示组件 (Toast Component)
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-xl z-50 transition-opacity duration-300 opacity-0 pointer-events-none";
    toast.innerText = message;
    document.body.appendChild(toast);

    // 触发淡入
    setTimeout(() => {
        toast.classList.remove("opacity-0", "pointer-events-none");
        toast.classList.add("opacity-100");
    }, 100);

    // 3秒后淡出删除
    setTimeout(() => {
        toast.classList.add("opacity-0");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 11. 纯净容器启动（在新标签页被拉起时执行）
function initPurePlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");
    const playerFrame = document.getElementById("pure-player-frame");
    const loader = document.getElementById("player-loader");
    const titleEl = document.getElementById("player-title");

    if (!gameId || !playerFrame) return;

    const game = gamesDatabase.find(g => g.id === gameId);
    if (!game) return;

    const titleText = currentLang === "zh" ? game.title_zh : game.title_en;

    // 更新页面标题和播放条标题为小游戏名称
    document.title = `${titleText} - H5Play`;
    if (titleEl) {
        titleEl.innerText = titleText;
    }

    // 动态注入 H5 iframe 链接
    playerFrame.src = game.url;

    // 监听加载事件，隐藏 loading
    playerFrame.onload = function() {
        if (loader) {
            loader.classList.add("opacity-0", "pointer-events-none");
            setTimeout(() => loader.remove(), 500);
        }
    };
}

// 12. 前台最核心：新标签页独立启动游戏 (New Tab Launch)
function launchGame(gameId) {
    const game = gamesDatabase.find(g => g.id === gameId);
    if (!game) return;
    
    // 打开独立的纯净运行播放页，传递游戏 ID 
    window.open(`play.html?id=${gameId}`, "_blank");
}

// 13. 智能访客 IP 与地理位置收集模块 (Visitor IP & GEO Analytics)
const INITIAL_IP_LOGS = [
    { ip: "172.56.21.89", country_code: "US", country: "United States", region: "California", city: "Los Angeles", device: "Desktop", timestamp: "2026-10-18 16:45", page: "Home" },
    { ip: "114.247.50.22", country_code: "CN", country: "China", region: "Beijing", city: "Beijing", device: "Mobile", timestamp: "2026-10-18 16:30", page: "Detail: cyber-surfer" },
    { ip: "82.165.19.141", country_code: "DE", country: "Germany", region: "Berlin", city: "Berlin", device: "Desktop", timestamp: "2026-10-18 16:12", page: "Home" },
    { ip: "122.211.45.10", country_code: "JP", country: "Japan", region: "Tokyo", city: "Shinjuku", device: "Mobile", timestamp: "2026-10-18 15:55", page: "Detail: retro-drift" },
    { ip: "203.116.12.5", country_code: "SG", country: "Singapore", region: "Central", city: "Singapore", device: "Desktop", timestamp: "2026-10-18 15:20", page: "Home" },
    { ip: "86.12.140.23", country_code: "GB", country: "United Kingdom", region: "England", city: "London", device: "Mobile", timestamp: "2026-10-18 14:40", page: "Detail: tile-matching" },
    { ip: "198.162.0.12", country_code: "CA", country: "Canada", region: "Ontario", city: "Toronto", device: "Desktop", timestamp: "2026-10-18 14:15", page: "Home" },
    { ip: "1.120.45.98", country_code: "AU", country: "Australia", region: "New South Wales", city: "Sydney", device: "Mobile", timestamp: "2026-10-18 13:50", page: "Home" },
    { ip: "103.241.12.8", country_code: "CN", country: "China", region: "Guangdong", city: "Shenzhen", device: "Mobile", timestamp: "2026-10-18 13:10", page: "Detail: cyber-surfer" }
];

function recordVisitorLog() {
    if (window.location.pathname.includes("play.html") || window.location.pathname.includes("admin.html") || window.location.pathname.includes("publish.html")) {
        return;
    }

    let logs = JSON.parse(localStorage.getItem("h5play_ip_logs"));
    if (!logs) {
        logs = INITIAL_IP_LOGS;
        localStorage.setItem("h5play_ip_logs", JSON.stringify(logs));
    }

    let pageName = "Home";
    if (window.location.pathname.includes("detail.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get("id");
        pageName = gameId ? `Detail: ${gameId}` : "Detail";
    } else if (window.location.pathname.includes("privacy.html")) {
        pageName = "Privacy Policy";
    }

    const ua = navigator.userAgent;
    const deviceType = /Mobile|Android|iPhone|iPad/i.test(ua) ? "Mobile" : "Desktop";

    const now = new Date();
    const shanghaiTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
    const formatZero = (num) => num < 10 ? '0' + num : num;
    const timestampStr = `${shanghaiTime.getFullYear()}-${formatZero(shanghaiTime.getMonth() + 1)}-${formatZero(shanghaiTime.getDate())} ${formatZero(shanghaiTime.getHours())}:${formatZero(shanghaiTime.getMinutes())}`;

    fetch("https://freeipapi.com/api/json")
        .then(res => {
            if (!res.ok) throw new Error("API Limit");
            return res.json();
        })
        .then(data => {
            if (data && data.ipAddress) {
                const newLog = {
                    ip: data.ipAddress,
                    country_code: data.countryCode || "UN",
                    country: data.countryName || "Unknown",
                    region: data.regionName || "Unknown",
                    city: data.cityName || "Unknown",
                    device: deviceType,
                    timestamp: timestampStr,
                    page: pageName
                };

                if (logs.length > 0) {
                    const lastLog = logs[0];
                    if (lastLog.ip === newLog.ip && lastLog.page === newLog.page) {
                        return;
                    }
                }

                logs.unshift(newLog);
                if (logs.length > 200) logs.pop();
                localStorage.setItem("h5play_ip_logs", JSON.stringify(logs));
                window.dispatchEvent(new Event("storage"));
            }
        })
        .catch(err => {
            console.warn("Failed to fetch client IP. Using mock entry.", err);
        });
}

// 页面加载就绪
document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
    recordVisitorLog();

    // 绑定多语言切换
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const selectedLang = e.currentTarget.getAttribute("data-lang");
            applyLanguage(selectedLang);
        });
    });
});
