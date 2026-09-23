function updateClock() {
    const clock = document.querySelector(".time");

    if (!clock) return;

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

setInterval(updateClock, 1000);

async function updateGoldPrice() {
    try {
        const response = await fetch("https://api.gold-api.com/price/XAU");
        const data = await response.json();

        if (!data.price) return;
        const currentGoldPrice = Number(data.price);

        updateDeskInsight(currentGoldPrice);

        updateMarketCondition(currentGoldPrice);

        const price = Number(data.price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Harga di card LIVE MARKET
        const mainPrice = document.querySelector(".chart-card .price strong");
        const tickerGold = document.getElementById("gold-price");

if (tickerGold) {
    tickerGold.textContent = price;
}

        if (mainPrice) {
            mainPrice.textContent = price;
        }

        // Harga GOLD di MARKET PULSE
        const pulseGoldPrice = document.getElementById("pulse-gold-price");

        if (pulseGoldPrice) {
        pulseGoldPrice.textContent = price;
}

        // Harga di ticker XAUUSD
        const tickerPrice = document.querySelector(".ticker-item:first-child strong");

        if (tickerPrice) {
            tickerPrice.textContent = price;
        }

    } catch (error) {
        console.log("Gold price unavailable:", error);
    }
}

updateGoldPrice();

setInterval(updateGoldPrice, 10000);

// ================================
// DXY — MARKET PULSE
// ================================

async function updateDXY() {
    try {
        const response = await fetch(
            "https://query1.finance.yahoo.com/v8/finance/chart/DX-Y.NYB?range=1d&interval=1m"
        );

        const data = await response.json();
        const result = data.chart.result[0];
        const meta = result.meta;

        const price = meta.regularMarketPrice;
        const previousClose = meta.previousClose;

        if (!price || !previousClose) return;

        const change = ((price - previousClose) / previousClose) * 100;

        const dxyPrice = document.getElementById("pulse-usd-price");
        const dxyChange = document.getElementById("pulse-usd-change");

        if (dxyPrice) {
            dxyPrice.textContent = price.toFixed(2);
        }

        if (dxyChange) {
            const arrow = change >= 0 ? "▲" : "▼";

            dxyChange.textContent =
                `${arrow} ${Math.abs(change).toFixed(2)}%`;

            dxyChange.style.color =
                change >= 0 ? "var(--green)" : "var(--red)";
        }

    } catch (error) {
        console.log("DXY unavailable:", error);
    }
}

updateDXY();

setInterval(updateDXY, 10000);

/* =================================
   THE DESK — DYNAMIC INSIGHT
================================= */

/* =================================
   THE DESK — DYNAMIC INSIGHT V2
================================= */

let insightBaselinePrice = null;
let insightBaselineTime = null;

function updateDeskInsight(currentPrice) {

    const title = document.getElementById("desk-insight-title");
    const description = document.getElementById("desk-insight-description");

    const condition = document.getElementById("desk-market-condition");
    const conditionDescription = document.getElementById("desk-market-description");

    const priceAction = document.getElementById("desk-price-action");
    const priceDescription = document.getElementById("desk-price-description");

    const deskView = document.getElementById("desk-view");
    const deskViewDescription = document.getElementById("desk-view-description");

    if (!currentPrice) return;

    const now = Date.now();

    /*
        FIRST READING
    */

    if (insightBaselinePrice === null) {

        insightBaselinePrice = currentPrice;
        insightBaselineTime = now;

        if (title) {
            title.textContent =
                "Gold price monitoring is active.";
        }

        if (description) {
            description.textContent =
                "THE DESK is establishing a short-term market baseline.";
        }

        if (condition) {
            condition.textContent = "Monitoring";
        }

        if (conditionDescription) {
            conditionDescription.textContent =
                "Building a short-term price reference.";
        }

        if (priceAction) {
            priceAction.textContent = "Neutral";
        }

        if (priceDescription) {
            priceDescription.textContent =
                "Waiting for meaningful price movement.";
        }

        if (deskView) {
            deskView.textContent = "Observe";
        }

        if (deskViewDescription) {
            deskViewDescription.textContent =
                "Wait for clearer price movement before forming a directional view.";
        }

        return;
    }

    /*
        WAIT UNTIL 60 SECONDS
    */

    const elapsed = now - insightBaselineTime;

    if (elapsed < 60000) {
        return;
    }

    /*
        CALCULATE PRICE MOVEMENT
    */

    const priceChange = currentPrice - insightBaselinePrice;
    const absoluteChange = Math.abs(priceChange);

    /*
        HIGH VOLATILITY
    */

    if (absoluteChange >= 2.00) {

        if (title) {
            title.textContent =
                "Gold is showing elevated short-term volatility.";
        }

        if (description) {
            description.textContent =
                `XAUUSD has moved ${priceChange >= 0 ? "+" : ""}${priceChange.toFixed(2)} from the previous one-minute reading.`;
        }

        if (condition) {
            condition.textContent = "High Volatility";
        }

        if (conditionDescription) {
            conditionDescription.textContent =
                "Price movement has expanded beyond the normal short-term range.";
        }

        if (priceAction) {
            priceAction.textContent =
                priceChange > 0 ? "Strong Upside Pressure" : "Strong Downside Pressure";
        }

        if (priceDescription) {
            priceDescription.textContent =
                priceChange > 0
                    ? "Gold is moving sharply higher from the previous reading."
                    : "Gold is moving sharply lower from the previous reading.";
        }

        if (deskView) {
            deskView.textContent =
                priceChange > 0 ? "Watch Continuation" : "Watch Rejection";
        }

        if (deskViewDescription) {
            deskViewDescription.textContent =
                "Higher volatility requires confirmation before interpreting the move as sustained direction.";
        }

    /*
        MODERATE UPWARD MOVEMENT
    */

    } else if (priceChange >= 0.50) {

        if (title) {
            title.textContent =
                "Gold is showing upward short-term momentum.";
        }

        if (description) {
            description.textContent =
                `XAUUSD is ${priceChange.toFixed(2)} higher than the previous one-minute reading.`;
        }

        if (condition) {
            condition.textContent = "Positive Momentum";
        }

        if (conditionDescription) {
            conditionDescription.textContent =
                "Gold is currently trading above its short-term reference.";
        }

        if (priceAction) {
            priceAction.textContent = "Bullish Pressure";
        }

        if (priceDescription) {
            priceDescription.textContent =
                "Short-term upside pressure is currently visible.";
        }

        if (deskView) {
            deskView.textContent = "Watch Continuation";
        }

        if (deskViewDescription) {
            deskViewDescription.textContent =
                "Monitor whether upward movement develops into sustained momentum.";
        }

    /*
        MODERATE DOWNWARD MOVEMENT
    */

    } else if (priceChange <= -0.50) {

        if (title) {
            title.textContent =
                "Gold is showing downward short-term momentum.";
        }

        if (description) {
            description.textContent =
                `XAUUSD is ${Math.abs(priceChange).toFixed(2)} lower than the previous one-minute reading.`;
        }

        if (condition) {
            condition.textContent = "Negative Momentum";
        }

        if (conditionDescription) {
            conditionDescription.textContent =
                "Gold is currently trading below its short-term reference.";
        }

        if (priceAction) {
            priceAction.textContent = "Bearish Pressure";
        }

        if (priceDescription) {
            priceDescription.textContent =
                "Short-term downside pressure is currently visible.";
        }

        if (deskView) {
            deskView.textContent = "Watch Rejection";
        }

        if (deskViewDescription) {
            deskViewDescription.textContent =
                "Monitor whether downward movement develops into sustained momentum.";
        }

    /*
        LOW MOMENTUM
    */

    } else {

        if (title) {
            title.textContent =
                "Gold is currently showing limited short-term movement.";
        }

        if (description) {
            description.textContent =
                `XAUUSD has moved only ${absoluteChange.toFixed(2)} from the previous one-minute reading.`;
        }

        if (condition) {
            condition.textContent = "Low Momentum";
        }

        if (conditionDescription) {
            conditionDescription.textContent =
                "Price movement remains relatively contained.";
        }

        if (priceAction) {
            priceAction.textContent = "Sideways";
        }

        if (priceDescription) {
            priceDescription.textContent =
                "No meaningful directional change detected.";
        }

        if (deskView) {
            deskView.textContent = "Wait";
        }

        if (deskViewDescription) {
            deskViewDescription.textContent =
                "Wait for stronger price movement and structure confirmation.";
        }
    }

    /*
        RESET BASELINE
    */

    insightBaselinePrice = currentPrice;
    insightBaselineTime = now;
}

/* =================================
   THE DESK — MARKET SESSION
================================= */

function updateMarketSession() {

    const sessionElement = document.getElementById("market-session");

    if (!sessionElement) return;

    const now = new Date();

    const hour = Number(
        new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            hour12: false
        }).format(now)
    );

    let session = "";

    if (hour >= 7 && hour < 14) {

        session = "ASIA SESSION";

    } else if (hour >= 14 && hour < 21) {

        session = "LONDON SESSION";

    } else {

        session = "NEW YORK SESSION";

    }

    sessionElement.textContent = session;
}

updateMarketSession();

setInterval(updateMarketSession, 60000);

/* =================================
   THE DESK — MARKET CONDITION ENGINE
================================= */

let marketPriceHistory = [];

function updateMarketCondition(currentPrice) {

    if (!currentPrice) return;

    marketPriceHistory.push({
        price: currentPrice,
        time: Date.now()
    });

    const threeMinutesAgo =
        Date.now() - (3 * 60 * 1000);

    marketPriceHistory =
        marketPriceHistory.filter(
            item => item.time >= threeMinutesAgo
        );

    if (marketPriceHistory.length < 6) {
        return;
    }

    const current =
        currentPrice;

    const oldest =
        marketPriceHistory[0].price;

    const changePercent =
        ((current - oldest) / oldest) * 100;

    const biasElement =
        document.getElementById("market-bias");

    const biasDescription =
        document.getElementById("market-bias-description");

    const momentumElement =
        document.getElementById("market-momentum");

    const momentumDescription =
        document.getElementById("market-momentum-description");

    const priceActionElement =
        document.getElementById("market-price-action");

    const priceDescription =
        document.getElementById("market-price-description");

    const stateElement =
        document.getElementById("market-state");

    const stateDescription =
        document.getElementById("market-state-description");


    /* ==============================
       BIAS
    ============================== */

    /* ================================
   BIAS
================================ */

if (changePercent > 0.03) {

    biasElement.textContent = "BULLISH";

    biasElement.className =
        "status-bullish";

    biasDescription.textContent =
        "Price is showing positive short-term direction.";

} else if (changePercent < -0.03) {

    biasElement.textContent = "BEARISH";

    biasElement.className =
        "status-bearish";

    biasDescription.textContent =
        "Price is showing negative short-term direction.";

} else {

    biasElement.textContent = "NEUTRAL";

    biasElement.className =
        "status-neutral";

    biasDescription.textContent =
        "Price movement remains relatively balanced.";

}


    /* ==============================
       MOMENTUM
    ============================== */

    const absoluteChange =
        Math.abs(changePercent);

    if (absoluteChange >= 0.10) {

    momentumElement.textContent =
        "STRONG";

    momentumElement.className =
        "status-strong";

        momentumDescription.textContent =
            "Short-term price movement is expanding.";

    } else if (absoluteChange >= 0.03) {

        momentumElement.textContent =
            "MODERATE";

        momentumElement.className =
        "status-moderate";

        momentumDescription.textContent =
            "Price is showing directional movement.";

    } else {

        momentumElement.textContent =
            "WEAK";

        momentumElement.className =
        "status-weak";

        momentumDescription.textContent =
            "Price movement remains limited.";
    }


    /* ==============================
       PRICE ACTION
    ============================== */

    if (changePercent > 0.03) {

        priceActionElement.textContent =
            "RISING";

        priceActionElement.className =
        "status-rising";

        priceDescription.textContent =
            "Recent observations show upward movement.";

    } else if (changePercent < -0.03) {

        priceActionElement.textContent =
            "FALLING";

        priceActionElement.className =
        "status-falling";

        priceDescription.textContent =
            "Recent observations show downward movement.";

    } else {

        priceActionElement.textContent =
            "SIDEWAYS";

        priceActionElement.className =
        "status-sideways";

        priceDescription.textContent =
            "No meaningful directional change detected.";
    }


    /* ==============================
       MARKET STATE
    ============================== */

    if (absoluteChange >= 0.10) {

        stateElement.textContent =
            "EXPANSION";

        stateElement.className =
        "status-expansion";

        stateDescription.textContent =
            "Price movement is becoming more active.";

    } else {

        stateElement.textContent =
            "COMPRESSION";

        stateElement.className =
        "status-compression";

        stateDescription.textContent =
            "Price movement remains relatively contained.";
    }
}