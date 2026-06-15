export type Locale = "en" | "zh";

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "zh", label: "中文", flag: "中文" },
];

export type Translations = typeof translations.en;

export const translations = {
  en: {
    header: {
      announcement: "New Scraping API is here — control power and cost per request.",
      tryNow: "Try now →",
      nav: {
        proxies: "Proxies",
        scraping: "Scraping",
        pricing: "Pricing",
        dataForAi: "Data for AI",
        resources: "Resources",
      },
      talkToExpert: "Talk to expert",
      login: "Log in",
      startFree: "View pricing",
      dashboard: "Dashboard",
      logout: "Log out",
    },
    hero: {
      title: "AI-Ready Proxy &",
      titleHighlight: "Scraping Solutions",
      subtitle:
        "The most efficient way to test, launch, and scale your web data projects.",
      startFree: "Buy IP proxy",
      login: "Log in",
      stats: {
        speed: "avg. speed",
        ips: "IPs",
        uptime: "uptime",
        locations: "locations",
        compatible: "compatible",
      },
    },
    features: {
      items: [
        {
          title: "New Web Scraping API",
          description:
            "Scraping that adapts to your targets – control power and cost per request with our unified API.",
        },
        {
          title: "Residential Proxies from Just $2/GB",
          description:
            "No promo codes, no countdowns – just better prices for 115M+ ethically-sourced IPs worldwide.",
        },
        {
          title: "AI Integrations",
          description:
            "Connect with n8n, MCP server, or LangChain – turn web data into live, intelligent workflows.",
        },
        {
          title: "IP Proxy from $7/day",
          description:
            "No free trial — purchase a time-based IP proxy plan with unlimited bandwidth to use the platform.",
        },
      ],
      startFree: "View pricing →",
      diagram: {
        chatTrigger: "When chat message received",
        aiModel: "AI Model",
        chatModel: "Chat Model",
        memory: "Memory",
        tool: "Tool",
        postScrape: "POST /v2/scrape",
        okResponse: "200 OK — Structured JSON",
        residentialIps: "115M+ Residential IPs",
        noHiddenFees: "No hidden fees",
        freeTrial: "IP Proxy — from $7/day",
        freeTrialDesc: "Unlimited bandwidth · Purchase required to start",
      },
    },
    products: {
      title: "Start collecting data with the right solution, fast",
      subtitle:
        "Choose from proxies, scraping APIs, or Site Unblocker — built for quick onboarding and automation-friendly workflows.",
      startTrial: "Buy plan",
      items: [
        {
          name: "Residential Proxies",
          price: "from $2/GB",
          description:
            "Real household IP addresses connected to local networks, offering genuine residential locations and user-like behavior.",
        },
        {
          name: "Static Residential",
          price: "from $0.27/IP",
          description:
            "ISP-issued static IPs from premium ASNs that combine residential authenticity with datacenter-like stability.",
        },
        {
          name: "Mobile Proxies",
          price: "from $2.25/GB",
          description:
            "Real smartphone IPs from 3G/4G/5G carrier networks, providing genuine mobile traffic footprints.",
        },
        {
          name: "Datacenter Proxies",
          price: "from $0.020/IP",
          description:
            "High-speed IP addresses from enterprise-grade data centers, offering lightning-fast response times.",
        },
        {
          name: "Site Unblocker",
          price: "from $0.95/1K req",
          description:
            "Advanced proxy solution engineered to bypass anti-bot defenses and automatically handle CAPTCHAs.",
        },
        {
          name: "Web Scraping API",
          price: "from $0.09/1K req",
          description:
            "Extract structured data from any website – without CAPTCHAs, IP blocks, or complex setup.",
        },
      ],
    },
    pricing: {
      title: "IP Proxy Plans",
      subtitle:
        "Daily or monthly IP proxy access with unlimited bandwidth. Pick a plan and start after payment.",
      tabs: { daily: "Daily", monthly: "Monthly" },
      popular: "Popular",
      mostPopular: "Most Popular",
      save10: "SAVE 10%",
      savePercent: "SAVE {n}%",
      bestValue: "BEST VALUE",
      startTrial: "Buy plan",
      buyNow: "Buy now",
      unlimited: "Unlimited bandwidth · no GB limit",
      unlimitedShort: "No GB cap",
      oneTime: "One-time payment",
      durationOne: "{n} Day",
      durationMany: "{n} Days",
      monthOne: "{n} Month",
      monthMany: "{n} Months",
      dayUnit: "day",
      daysUnit: "days",
      monthUnit: "mo",
      monthsUnit: "mos",
      total: "Total: {amount}",
      perDay: "~{price}/day",
      perMonth: "~{price}/mo",
      allPlansInclude: "Every plan includes",
      includes: "Plan includes:",
      features: [
        "Popular regions: UK, US, BR, MX",
        "Avg. 99.5% success rate",
        "50+ regions worldwide",
        "HTTP & SOCKS5 protocol",
        "Unlimited bandwidth",
        "Rotating IP proxy access",
      ],
    },
    locations: {
      title: "Discover ethically-sourced IPs worldwide",
      subtitle:
        "Access 125M+ proxy IPs across 195+ countries. Use state-, country-, city-, and ASN-level targeting for restriction-free web data collection.",
      explore: "Explore all locations",
      countries: [
        { name: "United States", ips: "16.1M+" },
        { name: "United Kingdom", ips: "5M+" },
        { name: "Germany", ips: "5.6M+" },
        { name: "France", ips: "4.6M+" },
        { name: "Canada", ips: "3.1M+" },
        { name: "Netherlands", ips: "870K+" },
      ],
    },
    useCases: {
      title: "Discover how our solutions power your use cases",
      subtitle:
        "From AI model training to SEO monitoring and ad verification — our products adapt to your needs with scale, precision targeting, and anti-block resilience.",
      learnMore: "Learn more →",
      items: [
        {
          title: "Artificial Intelligence",
          description:
            "Fuel AI models with clean, structured training data. Use high-speed proxies and Scraping APIs to automate large-scale data pipelines.",
        },
        {
          title: "Multi-accounting",
          description:
            "Run and manage unlimited eCommerce or social accounts safely. Sticky proxies and session control help avoid bans.",
        },
        {
          title: "Price Aggregation",
          description:
            "Track competitor and market prices in real time. Our proxies deliver localized, accurate data for smarter pricing models.",
        },
        {
          title: "SEO Marketing",
          description:
            "Audit SERPs and localized content at scale. Monitor keyword rankings, backlinks, and page performance across regions.",
        },
        {
          title: "Web Scraping",
          description:
            "Collect public web data at scale with zero hassle. Site Unblocker and Web Scraping API handle CAPTCHAs and IP bans.",
        },
        {
          title: "AdTech",
          description:
            "Validate ad placement, monitor competitors, and fight fraud. Top-quality proxies with precise geo-targeting ensure accurate ad testing.",
        },
      ],
    },
    testimonials: {
      title: "Learn what people are saying about us",
      subtitle:
        "We're thrilled to have the support of our 135K+ clients and the industry's best.",
      items: [
        {
          quote:
            "The professional expertise of the solution has significantly boosted our business growth while enhancing overall efficiency.",
          author: "Novabeyond",
        },
        {
          quote:
            "Provides great service with a simple setup and friendly support team. Easy to get things done.",
          author: "RoiDynamic",
        },
        {
          quote:
            "Enables us to develop and test applications in varied environments while supporting precise data collection for research.",
          author: "Cybereg",
        },
      ],
      awards: [
        "Best Usability 2025",
        "Best User Adoption 2025",
        "Best Value 2025",
        "TechRadar Top Pick",
      ],
    },
    cta: {
      title: "Start Your Web Scraping and Proxy Journey",
      subtitle:
        "Seamlessly test, launch, and scale your data collection projects with reliable, easy-to-use, and affordable proxy infrastructure.",
      startNow: "View pricing",
      note: "No free plan · IP proxy from $7/day, unlimited bandwidth",
    },
    footer: {
      tagline:
        "AI-ready proxy and scraping infrastructure for developers, data teams, and automation workflows worldwide.",
      copyright: "© 2026 VeloProxy. All rights reserved.",
      builtWith: "Built with Next.js · Inspired by modern proxy infrastructure",
      sections: {
        products: "Products",
        resources: "Resources",
        company: "Company",
      },
      links: {
        products: [
          "Residential Proxies",
          "ISP Proxies",
          "Mobile Proxies",
          "Datacenter Proxies",
          "Web Scraping API",
        ],
        resources: ["Documentation", "Blog", "FAQ", "Knowledge Hub", "Case Studies"],
        company: ["About us", "Careers", "Privacy Policy", "Terms of Service", "Contact"],
      },
    },
    chat: {
      title: "Support Team",
      subtitle: "We typically reply within minutes",
      placeholder: "Type your message...",
      send: "Send",
      welcome:
        "Hi! 👋 I'm here to help with proxy plans, pricing, or technical questions. How can I assist you today?",
      typing: "Admin is typing...",
      quickReplies: ["Pricing info", "Starter plan", "Technical support", "Contact sales"],
      offline: "Leave a message and we'll get back to you soon.",
      you: "You",
      admin: "Admin",
    },
    auth: {
      login: {
        title: "Welcome back",
        subtitle: "Sign in to manage your proxy infrastructure",
        email: "Email address",
        password: "Password",
        submit: "Sign in",
        submitting: "Signing in...",
        noAccount: "Don't have an account?",
        register: "Create account",
        google: "Continue with Google",
        or: "or continue with email",
        errors: {
          invalid: "Invalid email or password",
          generic: "Something went wrong. Please try again.",
        },
      },
      register: {
        title: "Create your account",
        subtitle: "Create an account, then purchase a plan to start using proxies",
        name: "Full name",
        email: "Email address",
        password: "Password",
        confirmPassword: "Confirm password",
        submit: "Create account",
        submitting: "Creating account...",
        hasAccount: "Already have an account?",
        login: "Sign in",
        google: "Sign up with Google",
        or: "or sign up with email",
        passwordHint: "At least 8 characters",
        errors: {
          mismatch: "Passwords do not match",
          exists: "An account with this email already exists",
          generic: "Something went wrong. Please try again.",
        },
      },
      dashboard: {
        title: "Dashboard",
        welcome: "Welcome back",
        subtitle: "Purchase a plan to activate proxy access and manage your usage",
        noPlanBanner: "You don't have an active plan yet",
        noPlanDesc: "Buy an IP proxy plan (from $7/day, unlimited bandwidth) to activate access.",
        pendingPlanBanner: "Payment under review",
        pendingPlanDesc: "Your payment is being verified by admin. You'll get access once approved.",
        activePlanBanner: "Plan active",
        activePlanDesc: "Your {plan} plan is active. Manage usage below.",
        buyStarter: "View plans",
        adminPanel: "Admin panel",
        stats: {
          bandwidth: "Bandwidth used",
          requests: "Requests today",
          ips: "Active IPs",
          plan: "Current plan",
        },
        statValues: {
          bandwidth: "0 GB",
          requests: "0",
          ips: "0",
          plan: "No plan",
        },
        quickActions: "Quick actions",
        actions: {
          buyProxy: "Buy IP proxy",
          docs: "View documentation",
          support: "Contact support",
        },
        account: "Account",
        memberSince: "Member since",
        logout: "Sign out",
        backHome: "Back to home",
      },
    },
    checkout: {
      title: "Pay with Binance",
      subtitle: "Scan the QR code and send USDT to complete your purchase",
      scanQr: "Binance USDT QR Payment",
      scanDesc: "Open Binance app → Scan QR → Send exact USDT amount",
      address: "USDT Wallet Address",
      amount: "Amount",
      orderId: "Order ID (Memo)",
      copied: "Copied!",
      orderSummary: "Order summary",
      plan: "Plan",
      price: "Price",
      total: "Total",
      account: "Account",
      confirmPayment: "Confirm payment",
      confirmDesc: "After paying, paste your Binance transaction ID / TxID below",
      txPlaceholder: "Paste Binance TxID or Order ID",
      submit: "Submit payment proof",
      submitting: "Verifying payment...",
      submittingHint: "Checking transaction on network. This may take up to 2 minutes.",
      submittingElapsed: "Elapsed: {time}",
      successTitle: "Payment submitted!",
      successDesc: "Admin will verify your payment shortly. Redirecting to dashboard...",
      backPricing: "Back to pricing",
      invalidPlan: "Invalid plan selected",
      note: "Payment is verified manually by admin within 24 hours. Include Order ID in transfer memo if possible.",
      errors: {
        generic: "Something went wrong. Please try again.",
        overload: "The system is temporarily overloaded. Please try again in a few minutes.",
      },
    },
    admin: {
      title: "Admin Panel",
      stats: { users: "Total users", orders: "Total orders", pending: "Pending review" },
      tabs: { orders: "Payments", users: "Users" },
      table: {
        orderId: "Order ID",
        user: "User",
        plan: "Plan",
        amount: "Amount",
        txHash: "TxID",
        status: "Status",
        actions: "Actions",
        role: "Role",
        joined: "Joined",
      },
      approve: "Approve",
      reject: "Reject",
    },
    bill: {
      backDashboard: "Back to dashboard",
      noBills: "No bills yet.",
      statusPaid: "PAID",
      statusUnpaid: "UNPAID",
      invoicedTo: "Invoiced To",
      payTo: "Pay To",
      companyName: "VeloProxy OÜ",
      companyAddress: "Sepapaja tn 6, Tallinn 15551, Estonia",
      companyVat: "VAT: not VAT payer",
      invoiceDate: "Invoice Date",
      paymentMethod: "Payment Method",
      invoiceItems: "Invoice Items",
      description: "Description",
      amount: "Amount",
      subTotal: "Sub Total",
      credit: "Credit",
      total: "Total",
      transactionDate: "Transaction Date",
      gateway: "Gateway",
      transactionId: "Transaction ID",
      invoiceNo: "Invoice No",
      print: "Print",
      download: "Download",
      period: "{plan} ({start} - {end})",
    },
  },
  zh: {
    header: {
      announcement: "全新 Scraping API 已上线 — 按请求灵活控制能力与成本。",
      tryNow: "立即体验 →",
      nav: {
        proxies: "代理服务",
        scraping: "数据采集",
        pricing: "价格",
        dataForAi: "AI 数据",
        resources: "资源中心",
      },
      talkToExpert: "咨询专家",
      login: "登录",
      startFree: "查看价格",
      dashboard: "控制台",
      logout: "退出登录",
    },
    hero: {
      title: "AI 就绪的",
      titleHighlight: "代理与数据采集解决方案",
      subtitle: "最高效的方式，帮您测试、启动并扩展网络数据项目。",
      startFree: "购买 IP 代理",
      login: "登录",
      stats: {
        speed: "平均速度",
        ips: "IP 数量",
        uptime: "正常运行",
        locations: "覆盖地区",
        compatible: "LLM 兼容",
      },
    },
    features: {
      items: [
        {
          title: "全新 Web Scraping API",
          description: "采集能力随目标自适应 — 通过统一 API 按请求控制能力与成本。",
        },
        {
          title: "住宅代理低至 $2/GB",
          description: "无需优惠码、无需倒计时 — 1.15 亿+ 合规 IP，价格更优。",
        },
        {
          title: "AI 集成",
          description: "对接 n8n、MCP 服务器或 LangChain — 将网络数据转化为智能工作流。",
        },
        {
          title: "IP 代理 $7/天起",
          description: "无免费试用 — 购买按时长计费的 IP 代理套餐，流量不限，即可使用平台。",
        },
      ],
      startFree: "查看价格 →",
      diagram: {
        chatTrigger: "收到聊天消息时",
        aiModel: "AI 模型",
        chatModel: "对话模型",
        memory: "记忆",
        tool: "工具",
        postScrape: "POST /v2/scrape",
        okResponse: "200 OK — 结构化 JSON",
        residentialIps: "1.15 亿+ 住宅 IP",
        noHiddenFees: "无隐藏费用",
        freeTrial: "IP 代理 — $7/天起",
        freeTrialDesc: "流量不限 · 需购买套餐后方可使用",
      },
    },
    products: {
      title: "快速选择合适方案，开始采集数据",
      subtitle: "代理、采集 API 或 Site Unblocker — 专为快速上手与自动化工作流设计。",
      startTrial: "购买套餐",
      items: [
        {
          name: "住宅代理",
          price: "低至 $2/GB",
          description: "真实家庭 IP，连接本地网络，提供真实住宅位置与用户行为特征。",
        },
        {
          name: "静态住宅代理",
          price: "低至 $0.27/IP",
          description: "优质 ASN 的 ISP 静态 IP，兼具住宅真实性与数据中心级稳定性。",
        },
        {
          name: "移动代理",
          price: "低至 $2.25/GB",
          description: "来自 3G/4G/5G 运营商网络的真实手机 IP，提供真实移动流量特征。",
        },
        {
          name: "数据中心代理",
          price: "低至 $0.020/IP",
          description: "企业级数据中心的高速 IP，响应时间极快。",
        },
        {
          name: "Site Unblocker",
          price: "低至 $0.95/1K 次",
          description: "高级代理方案，自动绕过反爬防御并处理 CAPTCHA。",
        },
        {
          name: "Web Scraping API",
          price: "低至 $0.09/1K 次",
          description: "从任意网站提取结构化数据 — 无需 CAPTCHA、IP 封锁或复杂配置。",
        },
      ],
    },
    pricing: {
      title: "IP 代理套餐",
      subtitle: "按天或按月计费的 IP 代理，流量不限。选择套餐，付款审核通过后即可使用。",
      tabs: { daily: "按天套餐", monthly: "按月套餐" },
      popular: "热门",
      mostPopular: "最受欢迎",
      save10: "省 10%",
      savePercent: "省 {n}%",
      bestValue: "最超值",
      startTrial: "购买套餐",
      buyNow: "立即购买",
      unlimited: "流量不限 · 无 GB 上限",
      unlimitedShort: "不限流量",
      oneTime: "一次性付款",
      durationOne: "{n} 天",
      durationMany: "{n} 天",
      monthOne: "{n} 个月",
      monthMany: "{n} 个月",
      dayUnit: "天",
      daysUnit: "天",
      monthUnit: "月",
      monthsUnit: "月",
      total: "合计：{amount}",
      perDay: "约 {price}/天",
      perMonth: "约 {price}/月",
      allPlansInclude: "所有套餐均包含",
      includes: "套餐包含：",
      features: [
        "热门地区：英国、美国、巴西、墨西哥",
        "平均 99.5% 成功率",
        "覆盖 50+ 国家/地区",
        "HTTP 与 SOCKS5 协议",
        "流量不限",
        "轮换 IP 代理访问",
      ],
    },
    locations: {
      title: "全球合规 IP 资源",
      subtitle:
        "覆盖 195+ 国家/地区的 1.25 亿+ 代理 IP。支持州、国家、城市及 ASN 级精准定位。",
      explore: "查看全部地区",
      countries: [
        { name: "美国", ips: "1610 万+" },
        { name: "英国", ips: "500 万+" },
        { name: "德国", ips: "560 万+" },
        { name: "法国", ips: "460 万+" },
        { name: "加拿大", ips: "310 万+" },
        { name: "荷兰", ips: "87 万+" },
      ],
    },
    useCases: {
      title: "了解我们的方案如何赋能您的业务",
      subtitle:
        "从 AI 模型训练到 SEO 监测与广告验证 — 我们的产品具备规模、精准定位与反封锁能力。",
      learnMore: "了解更多 →",
      items: [
        {
          title: "人工智能",
          description: "为 AI 模型提供干净、结构化的训练数据。高速代理与采集 API 自动化大规模数据管道。",
        },
        {
          title: "多账号管理",
          description: "安全运行和管理无限电商或社交账号。粘性代理与会话控制有效避免封号。",
        },
        {
          title: "价格聚合",
          description: "实时追踪竞品与市场定价。代理提供本地化精准数据，助力智能定价模型。",
        },
        {
          title: "SEO 营销",
          description: "大规模审计 SERP 与本地化内容。监测关键词排名、外链与各区域页面表现。",
        },
        {
          title: "网络采集",
          description: "轻松大规模采集公开网络数据。Site Unblocker 与 Web Scraping API 处理 CAPTCHA 与 IP 封锁。",
        },
        {
          title: "广告科技",
          description: "验证广告投放、监测竞品、打击欺诈。高质量代理与精准地理定位确保广告测试准确。",
        },
      ],
    },
    testimonials: {
      title: "听听用户怎么说",
      subtitle: "我们很荣幸获得 13.5 万+ 客户及行业顶尖机构的认可。",
      items: [
        {
          quote: "专业的解决方案显著推动了业务增长，同时提升了整体效率与效果。",
          author: "Novabeyond",
        },
        {
          quote: "配置简单、支持团队友好，服务优质，办事高效。",
          author: "RoiDynamic",
        },
        {
          quote: "帮助我们在多种环境中开发与测试应用，同时支持精准的数据采集与研究。",
          author: "Cybereg",
        },
      ],
      awards: ["2025 最佳易用性", "2025 最佳用户采纳", "2025 最佳性价比", "TechRadar 编辑推荐"],
    },
    cta: {
      title: "开启您的代理与数据采集之旅",
      subtitle: "可靠、易用、实惠的代理基础设施，助您测试、启动并扩展数据采集项目。",
      startNow: "查看价格",
      note: "无免费套餐 · IP 代理 $7/天起，流量不限",
    },
    footer: {
      tagline: "面向开发者、数据团队与自动化工作流的 AI 就绪代理与采集基础设施。",
      copyright: "© 2026 VeloProxy. 保留所有权利。",
      builtWith: "基于 Next.js 构建 · 现代代理基础设施",
      sections: {
        products: "产品",
        resources: "资源",
        company: "公司",
      },
      links: {
        products: ["住宅代理", "ISP 代理", "移动代理", "数据中心代理", "Web Scraping API"],
        resources: ["文档", "博客", "常见问题", "知识库", "案例研究"],
        company: ["关于我们", "招聘", "隐私政策", "服务条款", "联系我们"],
      },
    },
    chat: {
      title: "客服团队",
      subtitle: "我们通常会在几分钟内回复",
      placeholder: "输入消息...",
      send: "发送",
      welcome: "您好！👋 我可以帮您了解代理方案、价格或技术问题。请问有什么可以帮您？",
      typing: "客服正在输入...",
      quickReplies: ["价格咨询", "入门套餐", "技术支持", "联系销售"],
      offline: "留言后我们会尽快回复您。",
      you: "您",
      admin: "客服",
    },
    auth: {
      login: {
        title: "欢迎回来",
        subtitle: "登录以管理您的代理基础设施",
        email: "邮箱地址",
        password: "密码",
        submit: "登录",
        submitting: "登录中...",
        noAccount: "还没有账号？",
        register: "创建账号",
        google: "使用 Google 继续",
        or: "或使用邮箱登录",
        errors: {
          invalid: "邮箱或密码错误",
          generic: "出错了，请重试",
        },
      },
      register: {
        title: "创建账号",
        subtitle: "创建账号后，需购买套餐才能开始使用代理服务",
        name: "姓名",
        email: "邮箱地址",
        password: "密码",
        confirmPassword: "确认密码",
        submit: "创建账号",
        submitting: "创建中...",
        hasAccount: "已有账号？",
        login: "登录",
        google: "使用 Google 注册",
        or: "或使用邮箱注册",
        passwordHint: "至少 8 个字符",
        errors: {
          mismatch: "两次密码不一致",
          exists: "该邮箱已被注册",
          generic: "出错了，请重试",
        },
      },
      dashboard: {
        title: "控制台",
        welcome: "欢迎回来",
        subtitle: "购买套餐以激活代理访问并管理您的用量",
        noPlanBanner: "您尚未激活任何套餐",
        noPlanDesc: "购买 IP 代理套餐（$7/天起，流量不限）以激活访问。",
        pendingPlanBanner: "付款审核中",
        pendingPlanDesc: "您的付款正在由管理员审核，通过后即可使用。",
        activePlanBanner: "套餐已激活",
        activePlanDesc: "您的 {plan} 套餐已激活，可在下方管理用量。",
        buyStarter: "查看套餐",
        adminPanel: "管理后台",
        stats: {
          bandwidth: "已用流量",
          requests: "今日请求",
          ips: "活跃 IP",
          plan: "当前套餐",
        },
        statValues: {
          bandwidth: "0 GB",
          requests: "0",
          ips: "0",
          plan: "未购买",
        },
        quickActions: "快捷操作",
        actions: {
          buyProxy: "购买 IP 代理",
          docs: "查看文档",
          support: "联系支持",
        },
        account: "账户信息",
        memberSince: "注册时间",
        logout: "退出登录",
        backHome: "返回首页",
      },
    },
    checkout: {
      title: "Binance 扫码支付",
      subtitle: "扫描二维码并发送 USDT 完成购买",
      scanQr: "Binance USDT 二维码支付",
      scanDesc: "打开 Binance App → 扫码 → 发送准确 USDT 金额",
      address: "USDT 钱包地址",
      amount: "金额",
      orderId: "订单号 (Memo)",
      copied: "已复制!",
      orderSummary: "订单摘要",
      plan: "套餐",
      price: "单价",
      total: "合计",
      account: "账户",
      confirmPayment: "确认付款",
      confirmDesc: "付款后，请在下方粘贴 Binance 交易 ID / TxID",
      txPlaceholder: "粘贴 Binance TxID 或订单号",
      submit: "提交付款凭证",
      submitting: "正在验证付款...",
      submittingHint: "正在链上核对交易，最多可能需要 2 分钟。",
      submittingElapsed: "已等待：{time}",
      successTitle: "付款已提交!",
      successDesc: "管理员将尽快审核，正在跳转控制台...",
      backPricing: "返回价格页",
      invalidPlan: "无效的套餐",
      note: "付款由管理员在 24 小时内人工审核。建议在转账备注中填写订单号。",
      errors: {
        generic: "出错了，请重试",
        overload: "系统暂时过载，请稍后再试。",
      },
    },
    admin: {
      title: "管理后台",
      stats: { users: "总用户", orders: "总订单", pending: "待审核" },
      tabs: { orders: "付款管理", users: "用户管理" },
      table: {
        orderId: "订单号",
        user: "用户",
        plan: "套餐",
        amount: "金额",
        txHash: "TxID",
        status: "状态",
        actions: "操作",
        role: "角色",
        joined: "注册时间",
      },
      approve: "通过",
      reject: "拒绝",
    },
    bill: {
      backDashboard: "返回控制台",
      noBills: "暂无账单。",
      statusPaid: "已付款",
      statusUnpaid: "未付款",
      invoicedTo: "账单寄送至",
      payTo: "收款方",
      companyName: "VeloProxy OÜ",
      companyAddress: "Sepapaja tn 6, Tallinn 15551, Estonia",
      companyVat: "增值税：非增值税纳税人",
      invoiceDate: "发票日期",
      paymentMethod: "支付方式",
      invoiceItems: "账单项目",
      description: "描述",
      amount: "金额",
      subTotal: "小计",
      credit: "抵扣",
      total: "合计",
      transactionDate: "交易日期",
      gateway: "支付渠道",
      transactionId: "交易编号",
      invoiceNo: "发票号",
      print: "打印",
      download: "下载",
      period: "{plan}（{start} - {end}）",
    },
  },
};

export function getAdminReply(message: string, locale: Locale): string {
  const lower = message.toLowerCase();
  const isZh = locale === "zh";

  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("价格") ||
    lower.includes("多少钱") ||
    lower.includes("费用")
  ) {
    return isZh
      ? "IP 代理套餐：按天 1天$7、7天$49、15天省5%($100)、30天省10%($189)；按月 3个月省15%($510)、6个月省25%($900)、12个月省30%($1680)。流量不限，可在价格页购买。"
      : "IP proxy plans: Daily — 1d $7, 7d $49, 15d save 5% ($100), 30d save 10% ($189). Monthly — 3mo save 15% ($510), 6mo save 25% ($900), 12mo save 30% ($1680). Unlimited bandwidth.";
  }

  if (
    lower.includes("trial") ||
    lower.includes("free") ||
    lower.includes("试用") ||
    lower.includes("免费")
  ) {
    return isZh
      ? "我们暂无免费试用。请购买 IP 代理套餐（$7/天起，流量不限）即可开始。注册后在价格页面选择套餐。"
      : "We don't offer a free trial. Purchase an IP proxy plan from $7/day with unlimited bandwidth. Create an account and choose a plan on the pricing page.";
  }

  if (
    lower.includes("support") ||
    lower.includes("help") ||
    lower.includes("technical") ||
    lower.includes("技术") ||
    lower.includes("帮助") ||
    lower.includes("问题")
  ) {
    return isZh
      ? "我们的技术团队 7×24 在线支持。请描述您遇到的具体问题（如连接失败、速度慢、目标网站封锁等），我会尽快为您排查。"
      : "Our technical team is available 24/7. Please describe your issue (connection failures, slow speed, site blocks, etc.) and I'll help troubleshoot right away.";
  }

  if (
    lower.includes("sales") ||
    lower.includes("contact") ||
    lower.includes("enterprise") ||
    lower.includes("销售") ||
    lower.includes("联系") ||
    lower.includes("企业")
  ) {
    return isZh
      ? "如需企业定制方案或大批量采购，请留下您的邮箱和预计用量，我们的销售团队会在 1 个工作日内联系您。"
      : "For enterprise plans or bulk orders, leave your email and expected usage — our sales team will reach out within 1 business day.";
  }

  if (
    lower.includes("proxy") ||
    lower.includes("ip") ||
    lower.includes("代理") ||
    lower.includes("住宅") ||
    lower.includes("移动")
  ) {
    return isZh
      ? "我们提供住宅、移动、数据中心、静态住宅等多种代理，覆盖 195+ 国家/地区。您主要的使用场景是什么？我可以帮您选择最合适的类型。"
      : "We offer residential, mobile, datacenter, and static residential proxies across 195+ countries. What's your main use case? I can help you pick the right type.";
  }

  return isZh
    ? "感谢您的消息！我已收到您的咨询，会尽快为您处理。如需即时帮助，也可以点击上方快捷按钮或直接描述您的需求。"
    : "Thanks for your message! I've received your inquiry and will follow up shortly. For faster help, use the quick buttons above or describe your needs in detail.";
}
