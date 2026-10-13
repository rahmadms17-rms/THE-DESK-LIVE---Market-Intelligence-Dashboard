"use strict";

/* ==================================================
   THE DESK — MAIN JAVASCRIPT
================================================== */

const DESK_CONFIG = {
    goldApi: "https://api.gold-api.com/price/XAU",
    refreshGold: 30000,
    defaultReferral:
        "https://cp2.aimsdagang.com/register?referral2=30062655"
};

/* REFERRAL CONFIGURATION */

const deskSales = {
    ST: {
        name: "Siti Fatima",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30069425"
    },
    HN: {
        name: "Hana",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30064266"
    },
    IK: {
        name: "Ikis",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30067725"
    },
    YD: {
        name: "Yodha Mahatva",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30066317"
    },
    EL: {
        name: "Elsa",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30060744"
    },
    RM: {
        name: "Rama",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30065359"
    },
    SH: {
        name: "Shinta",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30063169"
    },
    AK: {
        name: "Akbar",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30076600"
    },
    AM: {
        name: "Amir",
        referral:
            "https://cp2.aimsdagang.com/register?referral2=30061414"
    }
};

/* ==================================================
   BILINGUAL CONTENT
================================================== */

const DESK_TRANSLATIONS = {
    id: {
        tagline: "MARKET INTELLIGENCE & STRATEGIC INSIGHTS",
        marketMonitor: "PEMANTAUAN PASAR",
        calendarLink: "Kalender Ekonomi ↗",

        heroEyebrow: "PERSPEKTIF PASAR INDEPENDEN",
        heroTitle: "Pahami pasar.<br><em>Sebelum mengambil keputusan.</em>",
        heroDescription:
            "Data, konteks makro, dan edukasi pasar untuk membantu memahami faktor yang menggerakkan harga sebelum mengambil keputusan.",
        exploreMarket: "Jelajahi Pasar",
        learnDesk: "Belajar bersama THE DESK",
        dataNotice:
            "Data pasar berasal dari penyedia pihak ketiga dan dapat mengalami keterlambatan.",

        todaysFocus: "FOKUS HARI INI",
        briefTitle: "Gold, USD & Treasury Yields",
        briefDescription:
            "Pantau hubungan antara pergerakan harga, dolar AS, imbal hasil obligasi, dan agenda makroekonomi.",
        primaryAsset: "ASET UTAMA",
        approach: "PENDEKATAN",
        contextFirst: "Context First",
        tickerNotice: "Harga mengikuti feed penyedia data.",

        overviewTitle: "Pasar dalam Sekilas",
        overviewDescription:
            "Pantau aset utama dan kondisi pasar dalam satu tampilan.",
        thirdPartyWidgets: "WIDGET LIVE · TRADINGVIEW",
        preciousMetal: "LOGAM MULIA",
        goldSpot: "Gold Spot",
        goldContext:
            "Emas dapat bereaksi terhadap perubahan real yields, kekuatan dolar AS, dan sentimen risiko.",
        goldDisclaimer:
            "Harga indikatif dari penyedia data pihak ketiga.",
        priceChart: "GRAFIK HARGA",
        goldDollar: "Emas / Dolar AS",
        globalEquities: "PASAR SAHAM GLOBAL",
        worldMarket: "Pasar Global",
        worldDescription:
            "Gambaran sejumlah indeks saham global.",

        contextTitle: "Apa yang Menggerakkan Pasar?",
        contextDescription:
            "Pahami faktor di balik pergerakan harga, bukan hanya arah pergerakannya.",
        frameworkNote: "KERANGKA ANALISIS, BUKAN SINYAL",
        dollarTitle: "Dolar AS",
        dollarDescription:
            "Dolar yang menguat dapat menjadi tekanan bagi aset berdenominasi dolar seperti emas, meskipun hubungannya tidak selalu konsisten.",
        yieldTitle: "Treasury Yields",
        yieldDescription:
            "Kenaikan real yields dapat meningkatkan biaya peluang memegang aset yang tidak memberikan imbal hasil.",
        dataTitle: "Data Ekonomi",
        dataDescription:
            "CPI, payrolls, dan keputusan bank sentral dapat mengubah ekspektasi suku bunga, volatilitas, serta likuiditas.",

        calendarTitle: "Kalender Ekonomi",
        calendarDescription:
            "Pantau rilis ekonomi yang berpotensi memengaruhi volatilitas pasar.",
        highImpact: "Dampak Tinggi",
        mediumImpact: "Dampak Menengah",
        calendarProvider: "AGENDA EKONOMI PIHAK KETIGA",
        openCalendar: "Buka kalender lengkap",
        calendarDisclaimer:
            "Jadwal dan label dampak disediakan oleh pihak ketiga. Periksa kembali waktu rilis dan sumber resmi sebelum mengambil keputusan trading.",

        educationTitle: "Kejelasan sebelum bertindak.",
        educationDescription:
            "Pisahkan berita, reaksi harga, dan konteks pasar untuk membangun proses pengambilan keputusan yang lebih disiplin.",
        exploreFramework: "Pelajari kerangka analisis",
        stepOneTitle: "Identifikasi katalis",
        stepOneDescription:
            "Apa yang berubah: data, kebijakan, yields, mata uang, atau sentimen risiko?",
        stepTwoTitle: "Amati reaksi pasar",
        stepTwoDescription:
            "Apakah pergerakan harga mengonfirmasi berita atau justru bergerak berlawanan?",
        stepThreeTitle: "Kelola risiko",
        stepThreeDescription:
            "Volatilitas dapat meningkat saat berita dirilis. Pandangan pasar bukan kepastian.",

        ctaTitle: "Pahami dahulu.<br>Putuskan dengan konteks.",
        ctaDescription:
            "Pelajari informasi pendaftaran akun melalui tautan referral yang tersedia.",
        openAccount: "Buka Akun Trading",

        footerDisclaimer:
            "Informasi pasar disediakan untuk tujuan edukasi dan bukan merupakan saran investasi personal atau jaminan hasil trading.",

        toastLink: "Lihat kalender ekonomi ↗"
    },

    en: {
        tagline: "MARKET INTELLIGENCE & STRATEGIC INSIGHTS",
        marketMonitor: "MARKET MONITOR",
        calendarLink: "Economic Calendar ↗",

        heroEyebrow: "INDEPENDENT MARKET PERSPECTIVE",
        heroTitle: "Understand the market.<br><em>Before you make a decision.</em>",
        heroDescription:
            "Data, macro context and market education to help you understand what moves prices before making a decision.",
        exploreMarket: "Explore the Market",
        learnDesk: "Learn with THE DESK",
        dataNotice:
            "Market data is supplied by third-party providers and may be delayed.",

        todaysFocus: "TODAY'S FOCUS",
        briefTitle: "Gold, USD & Treasury Yields",
        briefDescription:
            "Track the relationship between price action, the US dollar, Treasury yields and macroeconomic events.",
        primaryAsset: "PRIMARY ASSET",
        approach: "APPROACH",
        contextFirst: "Context First",
        tickerNotice: "Prices follow the selected data provider's feed.",

        overviewTitle: "Markets at a Glance",
        overviewDescription:
            "Monitor key assets and market conditions in one view.",
        thirdPartyWidgets: "LIVE WIDGETS · TRADINGVIEW",
        preciousMetal: "PRECIOUS METAL",
        goldSpot: "Gold Spot",
        goldContext:
            "Gold can react to changes in real yields, US dollar strength and risk sentiment.",
        goldDisclaimer:
            "Indicative price from a third-party data provider.",
        priceChart: "PRICE CHART",
        goldDollar: "Gold / US Dollar",
        globalEquities: "GLOBAL EQUITIES",
        worldMarket: "World Market",
        worldDescription:
            "A broad view of selected global equity indices.",

        contextTitle: "What Moves the Market?",
        contextDescription:
            "Understand the drivers behind price movements, not just their direction.",
        frameworkNote: "A FRAMEWORK, NOT A SIGNAL",
        dollarTitle: "US Dollar",
        dollarDescription:
            "A stronger dollar can create headwinds for dollar-priced assets such as gold, although the relationship is not constant.",
        yieldTitle: "Treasury Yields",
        yieldDescription:
            "Higher real yields can increase the opportunity cost of holding non-yielding assets.",
        dataTitle: "Economic Data",
        dataDescription:
            "CPI, payrolls and central bank decisions can shift rate expectations, volatility and liquidity.",

        calendarTitle: "Economic Calendar",
        calendarDescription:
            "Monitor scheduled releases that may affect market volatility.",
        highImpact: "High Impact",
        mediumImpact: "Medium Impact",
        calendarProvider: "THIRD-PARTY ECONOMIC EVENTS",
        openCalendar: "Open full calendar",
        calendarDisclaimer:
            "Schedules and impact labels are provided by a third party. Verify release times and official sources before trading.",

        educationTitle: "Clarity before action.",
        educationDescription:
            "Separate the headline, the price reaction and the broader market context to build a more disciplined decision-making process.",
        exploreFramework: "Explore the analysis framework",
        stepOneTitle: "Identify the catalyst",
        stepOneDescription:
            "What changed: data, policy, yields, currency or risk sentiment?",
        stepTwoTitle: "Observe the reaction",
        stepTwoDescription:
            "Did price confirm the headline, or did the market move in the opposite direction?",
        stepThreeTitle: "Manage the risk",
        stepThreeDescription:
            "Volatility can expand around news releases. A market view is not a certainty.",

        ctaTitle: "Understand first.<br>Decide with context.",
        ctaDescription:
            "Explore account registration through the available referral link.",
        openAccount: "Open Trading Account",

        footerDisclaimer:
            "Market information is provided for educational purposes only. It is not personalized investment advice and does not guarantee trading outcomes.",

        toastLink: "View economic calendar ↗"
    }
};

/* ==================================================
   CLOCK AND DATE — JAKARTA TIME
================================================== */

function updateClock() {
    const now = new Date();

    const clock = document.getElementById("desk-clock");
    const date = document.getElementById("brief-date");

    if (clock) {
        clock.textContent =
            new Intl.DateTimeFormat("id-ID", {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }).format(now) + " WIB";
    }

    if (date) {
        date.textContent =
            new Intl.DateTimeFormat(
                document.documentElement.lang === "id"
                    ? "id-ID"
                    : "en-GB",
                {
                    timeZone: "Asia/Jakarta",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            ).format(now).toUpperCase();
    }
}

/* ==================================================
   LANGUAGE SWITCHER
================================================== */

function setLanguage(language) {
    if (!DESK_TRANSLATIONS[language]) {
        return;
    }

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translation = DESK_TRANSLATIONS[language][key];

        if (typeof translation === "string") {
            element.innerHTML = translation;
        }
    });

    const idButton = document.getElementById("lang-id");
    const enButton = document.getElementById("lang-en");

    if (idButton) {
        idButton.classList.toggle("active", language === "id");
        idButton.setAttribute(
            "aria-pressed",
            String(language === "id")
        );
    }

    if (enButton) {
        enButton.classList.toggle("active", language === "en");
        enButton.setAttribute(
            "aria-pressed",
            String(language === "en")
        );
    }

    try {
        localStorage.setItem("desk_language", language);
    } catch (error) {
        // Language switching still works without browser storage.
    }

    updateClock();
}

function initializeLanguage() {
    let language = "id";

    try {
        const savedLanguage = localStorage.getItem("desk_language");

        if (DESK_TRANSLATIONS[savedLanguage]) {
            language = savedLanguage;
        }
    } catch (error) {
        // Use Indonesian as the default language.
    }

    const idButton = document.getElementById("lang-id");
    const enButton = document.getElementById("lang-en");

    if (idButton) {
        idButton.addEventListener("click", () => setLanguage("id"));
    }

    if (enButton) {
        enButton.addEventListener("click", () => setLanguage("en"));
    }

    setLanguage(language);
}

/* ==================================================
   GOLD PRICE
================================================== */

async function updateGoldPrice() {
    const priceElement = document.getElementById("gold-price");
    const updatedElement = document.getElementById("gold-updated");

    if (!priceElement || !updatedElement) {
        return;
    }

    try {
        const controller = new AbortController();

        const timeout = window.setTimeout(() => {
            controller.abort();
        }, 10000);

        let response;

        try {
            response = await fetch(DESK_CONFIG.goldApi, {
                cache: "no-store",
                signal: controller.signal
            });
        } finally {
            window.clearTimeout(timeout);
        }

        if (!response.ok) {
            throw new Error(
                `Gold API responded with ${response.status}`
            );
        }

        const data = await response.json();
        const price = Number(data.price);

        if (!Number.isFinite(price) || price <= 0) {
            throw new Error("Invalid gold price received");
        }

        priceElement.textContent = price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const checkedAt = new Intl.DateTimeFormat("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).format(new Date());

        updatedElement.textContent =
            `Pemeriksaan feed: ${checkedAt} WIB`;

    } catch (error) {
        console.warn("Gold price could not be refreshed:", error);

        if (priceElement.textContent === "Memuat harga...") {
            priceElement.textContent = "Harga tidak tersedia";
        }

        updatedElement.textContent =
            "Feed harga tidak tersedia. Gunakan grafik sebagai referensi.";
    }
}

/* ==================================================
   REFERRAL MANAGEMENT
================================================== */

function getReferralSelection() {
    const params = new URLSearchParams(window.location.search);

    const refCode = (params.get("ref") || "")
        .trim()
        .toUpperCase();

    const selected = deskSales[refCode];

    if (selected) {
        return {
            url: selected.referral,
            name: selected.name
        };
    }

    try {
        const savedUrl = localStorage.getItem("desk_referral");
        const savedName = localStorage.getItem("desk_ref_name");

        if (
            savedUrl &&
            /^https:\/\/cp2\.aimsdagang\.com\/register\?referral2=\d+$/.test(
                savedUrl
            )
        ) {
            return {
                url: savedUrl,
                name: savedName || ""
            };
        }
    } catch (error) {
        console.warn("Referral storage is unavailable.");
    }

    return {
        url: DESK_CONFIG.defaultReferral,
        name: ""
    };
}

function applyReferral() {
    const selection = getReferralSelection();

    document.querySelectorAll("[data-referral-link]").forEach((link) => {
        link.href = selection.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    const referralNote = document.getElementById("referral-note");

    if (referralNote) {
        if (selection.name) {
            referralNote.textContent =
                `Referral: ${selection.name}`;
            referralNote.hidden = false;
        } else {
            referralNote.textContent = "";
            referralNote.hidden = true;
        }
    }

    try {
        localStorage.setItem("desk_referral", selection.url);

        if (selection.name) {
            localStorage.setItem("desk_ref_name", selection.name);
        }
    } catch (error) {
        console.warn("Referral storage is unavailable.");
    }
}

/* ==================================================
   INFORMATION TOAST
   This is an informational notice, not a live event alert.
================================================== */

function showNewsToast({
    title = "THE DESK Market Note",
    message = "Periksa kalender ekonomi untuk jadwal rilis penting.",
    impact = "MARKET NOTE"
} = {}) {
    const toast = document.getElementById("news-toast");

    if (!toast) {
        return;
    }

    const titleElement = document.getElementById("toast-title");
    const messageElement = document.getElementById("toast-message");
    const badgeElement = document.getElementById("toast-badge");

    if (titleElement) {
        titleElement.textContent = title;
    }

    if (messageElement) {
        messageElement.textContent = message;
    }

    if (badgeElement) {
        badgeElement.textContent = impact;

        badgeElement.classList.toggle(
            "medium",
            impact.toUpperCase().includes("MEDIUM")
        );
    }

    toast.classList.add("visible");
    toast.setAttribute("aria-hidden", "false");
}

function hideNewsToast() {
    const toast = document.getElementById("news-toast");

    if (!toast) {
        return;
    }

    toast.classList.remove("visible");
    toast.setAttribute("aria-hidden", "true");
}

/* ==================================================
   INITIALIZATION
================================================== */

function initializeDesk() {
    initializeLanguage();
    updateClock();
    updateGoldPrice();
    applyReferral();

    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    const closeButton = document.getElementById("toast-close");

    if (closeButton) {
        closeButton.addEventListener("click", hideNewsToast);
    }

    // Informational welcome notice, not a live economic-event alert.
    let previewAlreadySeen = false;

    try {
        previewAlreadySeen =
            sessionStorage.getItem("desk_notice_seen") === "1";
    } catch (error) {
        // The site remains usable without session storage.
    }

    if (!previewAlreadySeen) {
        window.setTimeout(() => {
            showNewsToast({
                title: "THE DESK | Market Note",
                message:
                    "Pantau jadwal CPI, payrolls, keputusan bank sentral, dan rilis ekonomi lainnya melalui kalender.",
                impact: "MARKET NOTE"
            });

            try {
                sessionStorage.setItem("desk_notice_seen", "1");
            } catch (error) {
                // Notification does not depend on browser storage.
            }
        }, 4500);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDesk);
} else {
    initializeDesk();
}

window.setInterval(updateClock, 1000);
window.setInterval(updateGoldPrice, DESK_CONFIG.refreshGold);


/* THE DESK - Native Market Watch Gold Feed */

async function updateNativeGoldTicker() {
    const priceElement = document.getElementById("native-gold-price");
    const statusElement = document.getElementById("native-gold-status");

    if (!priceElement || !statusElement) return;

    try {
        const response = await fetch(
            "https://api.gold-api.com/price/XAU",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Gold feed unavailable");
        }

        const data = await response.json();
        const price = Number(data.price);

        if (!Number.isFinite(price) || price <= 0) {
            throw new Error("Invalid Gold price");
        }

        priceElement.textContent = price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        statusElement.textContent = "Feed connected";
        statusElement.classList.add("is-live");
    } catch (error) {
        statusElement.textContent = "Feed unavailable";
        statusElement.classList.remove("is-live");
        console.warn("Native Gold ticker:", error);
    }
}

updateNativeGoldTicker();
setInterval(updateNativeGoldTicker, 30000);

/* THE DESK - Additional Market Watch Feeds */


async function updateNativeMarketItem(symbol, priceId, statusId, digits) {
    const priceElement = document.getElementById(priceId);
    const statusElement = document.getElementById(statusId);

    if (!priceElement || !statusElement) return;

    try {
        const response = await fetch(
            `https://biquote.io/api/${encodeURIComponent(symbol)}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const bid = Number(data.bid);
        const ask = Number(data.ask);
        const last = Number(data.last);

        // Gunakan harga tengah jika bid dan ask tersedia.
        // Jika tidak, gunakan last, bid, atau ask yang valid.
        let price = 0;

        if (
            Number.isFinite(bid) &&
            Number.isFinite(ask) &&
            bid > 0 &&
            ask > 0
        ) {
            price = (bid + ask) / 2;
        } else if (Number.isFinite(last) && last > 0) {
            price = last;
        } else if (Number.isFinite(bid) && bid > 0) {
            price = bid;
        } else if (Number.isFinite(ask) && ask > 0) {
            price = ask;
        }

        if (!Number.isFinite(price) || price <= 0) {
            throw new Error(`Invalid price: ${symbol}`);
        }

        priceElement.textContent = price.toLocaleString("en-US", {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        });

        statusElement.textContent = "Feed connected";
        statusElement.classList.add("is-live");

    } catch (error) {
        statusElement.textContent = "Feed unavailable";
        statusElement.classList.remove("is-live");

        console.warn(`THE DESK feed ${symbol}:`, error);
    }
}


function updateNativeMarketWatch() {
    // Forex
    updateNativeMarketItem(
        "EURUSD",
        "native-eurusd-price",
        "native-eurusd-status",
        5
    );

    updateNativeMarketItem(
        "GBPUSD",
        "native-gbpusd-price",
        "native-gbpusd-status",
        5
    );

    // Indeks pasar
    updateNativeMarketItem(
        "DXY",
        "native-dxy-price",
        "native-dxy-status",
        3
    );

    updateNativeMarketItem(
        "US500",
        "native-sp500-price",
        "native-sp500-status",
        2
    );

    // Crypto
    updateNativeMarketItem(
        "BTCUSD",
        "native-btc-price",
        "native-btc-status",
        2
    );

    // Nasdaq 100
    updateNativeMarketItem(
        "USTEC",
        "native-nasdaq-price",
        "native-nasdaq-status",
        2
    );

}

updateNativeMarketWatch();
setInterval(updateNativeMarketWatch, 30000);
