/* =========================================
   THE DESK LIVE
   MARKET INTELLIGENCE ENGINE
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const DESK_CONFIG = {
    goldApi: "https://api.gold-api.com/price/XAU",
    biquoteApi: "https://biquote.io/api/latest",

    refreshGold: 10000,
    refreshMarkets: 10000,
    refreshClock: 1000
};


/* =========================================
   HELPER
========================================= */

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const element = getElement(id);

    if (element) {
        element.textContent = value;
    }
}

function formatNumber(value, decimals = 2) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "--";
    }

    return number.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}


/* =========================================
   WIB CLOCK
========================================= */

function updateClock() {
    const clock = document.querySelector(".time");

    if (!clock) {
        return;
    }

    const now = new Date();

    const time = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(now);

    clock.textContent = time + " WIB";
}

updateClock();

setInterval(
    updateClock,
    DESK_CONFIG.refreshClock
);


/* =========================================
   MARKET DATE
========================================= */

function updateMarketDate() {
    const now = new Date();

    const date = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(now);

    const normalizedDate = date
        .replace(/ /g, " ")
        .toUpperCase();

    const possibleElements = [
        document.getElementById("market-date"),
        document.getElementById("desk-market-date"),
        document.querySelector(".daily-brief-date strong"),
        document.querySelector(".market-date strong")
    ];

    const element = possibleElements.find(
        item => item
    );

    if (element) {
        element.textContent = normalizedDate;
    }
}

updateMarketDate();


/* =========================================
   GOLD PRICE
========================================= */

let currentGoldPrice = null;
let previousGoldPrice = null;

async function updateGoldPrice() {

    try {

        const response = await fetch(
            DESK_CONFIG.goldApi,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                "Gold API failed: " + response.status
            );
        }

        const data = await response.json();

        const price = Number(data.price);

        if (!Number.isFinite(price)) {
            throw new Error("Invalid gold price");
        }


        /* Store price history */

        previousGoldPrice = currentGoldPrice;
        currentGoldPrice = price;


        /* Format */

        const formattedPrice = formatNumber(
            price,
            2
        );


        /* Main XAUUSD price */

        const mainPrice =
            document.querySelector(
                ".chart-card .price strong"
            );

        if (mainPrice) {
            mainPrice.textContent =
                formattedPrice;
        }


        /* Existing ticker */

        const tickerGold =
            getElement("gold-price");

        if (tickerGold) {
            tickerGold.textContent =
                formattedPrice;
        }


        /* Market Pulse */

        const pulseGold =
            getElement(
                "pulse-gold-price"
            );

        if (pulseGold) {
            pulseGold.textContent =
                formattedPrice;
        }


        /* Generic gold price */

        const genericGold =
            document.querySelector(
                ".ticker-item:first-child strong"
            );

        if (
            genericGold &&
            !genericGold.closest(
                ".tradingview-widget-container"
            )
        ) {
            genericGold.textContent =
                formattedPrice;
        }


        /* Price direction */

        updateGoldDirection();

        /* Market intelligence */

        updateMarketCondition(
            price
        );

        updateDeskInsight(
            price
        );

        updateSentiment(
            price
        );


    } catch (error) {

        console.log(
            "Gold price unavailable:",
            error
        );

    }

}


function updateGoldDirection() {

    if (
        previousGoldPrice === null ||
        currentGoldPrice === null
    ) {
        return;
    }

    const change =
        currentGoldPrice -
        previousGoldPrice;

    const percent =
        previousGoldPrice !== 0
            ? (
                change /
                previousGoldPrice
            ) * 100
            : 0;


    const priceElement =
        document.querySelector(
            ".chart-card .price .up"
        );

    if (!priceElement) {
        return;
    }


    if (change > 0) {

        priceElement.textContent =
            "+" +
            percent.toFixed(2) +
            "%";

        priceElement.classList.remove(
            "down"
        );

        priceElement.classList.add(
            "up"
        );

    } else if (change < 0) {

        priceElement.textContent =
            percent.toFixed(2) +
            "%";

        priceElement.classList.remove(
            "up"
        );

        priceElement.classList.add(
            "down"
        );

    } else {

        priceElement.textContent =
            "0.00%";

    }

}


/* =========================================
   GLOBAL MARKETS
========================================= */

const globalMarkets = [

    {
        symbol: "US500",
        element: "sp500-price",
        decimals: 2
    },

    {
        symbol: "USTEC",
        element: "nasdaq-price",
        decimals: 2
    },

    {
        symbol: "US30",
        element: "dow-price",
        decimals: 2
    },

    {
        symbol: "BTCUSD",
        element: "btc-price",
        decimals: 2
    },

    {
        symbol: "USOIL",
        element: "oil-price",
        decimals: 2
    },

    {
        symbol: "EURUSD",
        element: "eurusd-price",
        decimals: 4
    }

];


async function updateGlobalMarkets() {

    const hasMarketElements =
        globalMarkets.some(
            market =>
                getElement(
                    market.element
                )
        );

    /*
       If the current HTML uses
       TradingView widgets instead of
       custom price fields, simply
       leave those widgets alone.
    */

    if (!hasMarketElements) {
        return;
    }


    try {

        const params =
            new URLSearchParams();


        globalMarkets.forEach(
            market => {

                params.append(
                    "symbols",
                    market.symbol
                );

            }
        );


        const response =
            await fetch(
                DESK_CONFIG.biquoteApi +
                "?" +
                params.toString(),
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Biquote API failed: " +
                response.status
            );

        }


        const data =
            await response.json();

        window.DESK_MARKET_DATA = data;


        globalMarkets.forEach(
            market => {

                const quote =
                    data[
                    market.symbol
                    ];

                const element =
                    getElement(
                        market.element
                    );


                if (
                    !quote ||
                    !element
                ) {
                    return;
                }


                const price =
                    Number(
                        quote.mid
                    );


                if (
                    !Number.isFinite(
                        price
                    )
                ) {
                    return;
                }


                element.textContent =
                    formatNumber(
                        price,
                        market.decimals
                    );

            }
        );


        updateGlobalMarketStatus(
            true
        );

        if (Number.isFinite(currentGoldPrice)) {
            updateMarketCondition(currentGoldPrice);
        }


    } catch (error) {

        console.log(
            "Global Markets unavailable:",
            error
        );

        updateGlobalMarketStatus(
            false
        );

    }

}


function updateGlobalMarketStatus(
    connected
) {

    const status =
        document.getElementById(
            "global-market-status"
        );

    if (!status) {
        return;
    }


    if (connected) {

        status.textContent =
            "LIVE";

        status.classList.add(
            "connected"
        );

    } else {

        status.textContent =
            "DATA DELAYED";

        status.classList.remove(
            "connected"
        );

    }

}


/* =========================================
   MARKET CONDITION
========================================= */

function updateMarketCondition(price) {
    if (!Number.isFinite(price)) {
        return;
    }

    const data = window.DESK_MARKET_DATA;

    const bias = document.getElementById("condition-bias");
    const momentum = document.getElementById("condition-momentum");
    const risk = document.getElementById("condition-risk");

    const briefRegime = document.getElementById("brief-regime");
    const briefRegimeText = document.getElementById("brief-regime-text");

    if (!data) {
        if (bias) bias.textContent = "NEUTRAL";
        if (momentum) momentum.textContent = "MODERATE";
        if (risk) risk.textContent = "CONTROLLED";

        if (briefRegime) {
            briefRegime.textContent = "MONITORING";
        }

        if (briefRegimeText) {
            briefRegimeText.textContent =
                "Waiting for clearer confirmation from price action.";
        }

        return;
    }

    const symbols = [
        "US500",
        "USTEC",
        "US30",
        "BTCUSD",
        "EURUSD"
    ];

    let positive = 0;
    let negative = 0;

    symbols.forEach(symbol => {
        const quote = data[symbol];

        if (!quote) {
            return;
        }

        const change = Number(quote.dayDiffPercent);

        if (!Number.isFinite(change)) {
            return;
        }

        if (change > 0) {
            positive++;
        } else if (change < 0) {
            negative++;
        }
    });

    let regime = "MIXED";
    let marketBias = "NEUTRAL";
    let marketMomentum = "MODERATE";
    let marketRisk = "CONTROLLED";
    let regimeDescription =
        "Market signals remain mixed across major risk-sensitive assets.";

    if (negative >= 4) {
        regime = "RISK OFF";
        marketBias = "DEFENSIVE";
        marketMomentum = "WEAK";
        marketRisk = "ELEVATED";
        regimeDescription =
            "Risk appetite is weakening as major risk-sensitive markets trade lower.";
    } else if (positive >= 4) {
        regime = "RISK ON";
        marketBias = "RISK ON";
        marketMomentum = "FIRM";
        marketRisk = "CONTROLLED";
        regimeDescription =
            "Risk appetite is improving as major risk-sensitive markets trade higher.";
    }

    if (bias) {
        bias.textContent = marketBias;
    }

    if (momentum) {
        momentum.textContent = marketMomentum;
    }

    if (risk) {
        risk.textContent = marketRisk;
    }

    if (briefRegime) {
        briefRegime.textContent = regime;
    }

    if (briefRegimeText) {
        briefRegimeText.textContent = regimeDescription;
    }
}


/* =========================================
   THE DESK INSIGHT
========================================= */

function updateDeskInsight(
    price
) {

    if (!Number.isFinite(price)) {
        return;
    }


    const title =
        getElement(
            "desk-insight-title"
        );

    const description =
        getElement(
            "desk-insight-description"
        );

    const marketCondition =
        getElement(
            "desk-market-condition"
        );

    const marketDescription =
        getElement(
            "desk-market-description"
        );

    const priceAction =
        getElement(
            "desk-price-action"
        );

    const priceDescription =
        getElement(
            "desk-price-description"
        );

    const deskView =
        getElement(
            "desk-view"
        );

    const deskViewDescription =
        getElement(
            "desk-view-description"
        );


    if (title) {

        title.textContent =
            "XAUUSD — Market Monitoring Active";

    }


    if (description) {

        description.textContent =
            "Gold price monitoring is active. THE DESK is establishing a short-term market baseline while waiting for clearer confirmation from price action.";

    }


    if (marketCondition) {

        marketCondition.textContent =
            "Monitoring";

    }


    if (marketDescription) {

        marketDescription.textContent =
            "Waiting for clearer confirmation from price action.";

    }


    if (priceAction) {

        priceAction.textContent =
            "Neutral";

    }


    if (priceDescription) {

        priceDescription.textContent =
            "No directional conclusion is established from price alone.";

    }


    if (deskView) {

        deskView.textContent =
            "Observe";

    }


    if (deskViewDescription) {

        deskViewDescription.textContent =
            "Monitor price behavior, USD strength and Treasury yields.";

    }

}


/* =========================================
   MARKET SENTIMENT
========================================= */

function updateSentiment(price) {
    if (!Number.isFinite(price)) {
        return;
    }

    const score = 70;

    let regime = "GREED";

    if (score <= 20) {
        regime = "EXTREME FEAR";
    } else if (score <= 40) {
        regime = "FEAR";
    } else if (score <= 60) {
        regime = "NEUTRAL";
    } else if (score <= 80) {
        regime = "GREED";
    } else {
        regime = "EXTREME GREED";
    }

    const scoreElement = document.getElementById("desk-sentiment-score");
    const regimeElement = document.getElementById("desk-sentiment-regime");
    const markerElement = document.getElementById("desk-sentiment-marker");

    if (scoreElement) {
        scoreElement.textContent = score;
    }

    if (regimeElement) {
        regimeElement.textContent = regime;
    }

    if (markerElement) {
        markerElement.style.left = score + "%";
    }
}


/* =========================================
   MARKET SESSION
========================================= */

function updateMarketSession() {

    const session =
        getElement(
            "market-session"
        );

    if (!session) {
        return;
    }


    const now =
        new Date();


    const hour =
        Number(
            new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone:
                        "Asia/Jakarta",
                    hour: "numeric",
                    hour12: false
                }
            ).format(now)
        );


    let sessionName;


    if (
        hour >= 7 &&
        hour < 15
    ) {

        sessionName =
            "ASIA SESSION";

    } else if (
        hour >= 15 &&
        hour < 20
    ) {

        sessionName =
            "LONDON SESSION";

    } else if (
        hour >= 20 ||
        hour < 1
    ) {

        sessionName =
            "NEW YORK SESSION";

    } else {

        sessionName =
            "LATE SESSION";

    }


    session.textContent =
        sessionName;

}


updateMarketSession();

setInterval(
    updateMarketSession,
    60000
);


/* =========================================
   LANGUAGE SWITCHER
========================================= */

function setLanguage(
    language
) {

    const idButton =
        getElement("lang-id");

    const enButton =
        getElement("lang-en");


    if (idButton) {

        idButton.classList.toggle(
            "active",
            language === "id"
        );

    }


    if (enButton) {

        enButton.classList.toggle(
            "active",
            language === "en"
        );

    }


    document.documentElement.lang =
        language;


    /*
       Current interface is primarily
       English. We keep the switcher
       functional without replacing
       content that has not been mapped
       yet.
    */

    if (language === "id") {

        document.title =
            "THE DESK — Market Intelligence";

    } else {

        document.title =
            "THE DESK — Market Intelligence";

    }

}


/* =========================================
   REFERRAL SYSTEM
========================================= */

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


const defaultReferral =
    "https://cp2.aimsdagang.com/register?referral2=30062655";


function applyReferral() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const ref =
        params
            .get("ref")
            ?.toUpperCase();


    const selected =
        deskSales[ref];


    const referral =
        selected
            ? selected.referral
            : defaultReferral;


    /*
       Update registration / referral
       links if they exist.
    */

    const referralLinks =
        document.querySelectorAll(
            "[data-referral-link]"
        );


    referralLinks.forEach(
        link => {

            link.href =
                referral;

        }
    );


    /*
       Also support normal links
       containing /register.
    */

    document
        .querySelectorAll(
            'a[href*="/register"]'
        )
        .forEach(
            link => {

                link.href =
                    referral;

            }
        );


    /*
       Store referral locally so
       navigation inside the site
       does not lose the source.
    */

    try {

        localStorage.setItem(
            "desk_referral",
            referral
        );

        if (selected) {

            localStorage.setItem(
                "desk_ref_name",
                selected.name
            );

        }

    } catch (error) {

        console.log(
            "Referral storage unavailable."
        );

    }

}


applyReferral();


/* =========================================
   INITIALIZE MARKET DATA
========================================= */

updateGoldPrice();

updateGlobalMarkets();


setInterval(
    updateGoldPrice,
    DESK_CONFIG.refreshGold
);

setInterval(
    updateGlobalMarkets,
    DESK_CONFIG.refreshMarkets
);


/* =========================================
   CONSOLE
========================================= */

console.log(
    "%cTHE DESK LIVE",
    "color:#c7a45b;font-size:18px;font-weight:700;"
);

console.log(
    "Market Intelligence Engine initialized."
);