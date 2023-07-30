function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
                minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances) {
        const play = playFor(perf);
        let thisAMount = amountFor(perf, play);

        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // ...
    }
}

function amountFor(aPerformance, play) {
    let result = 0;
    switch (play.type) {
        case "tragedy": // 비극
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
        default:
            throw new Error (`알 수 없는 장르: ${play.type}`)
    }
}

