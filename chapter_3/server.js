import express from 'express';

const app = express();
app.use(express.static('public'));

let currentPrice = 60;
let lastPrice = currentPrice;
let priceHistory = [currentPrice];

app.get('/get-price', (req, res) => {
    // Simulate price fluctuation
    const delta = Math.random() * 2 - 1;
    lastPrice = currentPrice;
    currentPrice = currentPrice + delta;

    // Store price history (keep the last 30 records)
    priceHistory.push(currentPrice);
    if (priceHistory.length > 30) {
        priceHistory.shift();
    }

    // Determine price change direction
    const direction = currentPrice > lastPrice ? 'up' : 'down';
    const arrow = direction === 'up' ? '↑' : '↓';
    const className = direction === 'up' ? 'price-change-up' : 'price-change-down';

    // Mocking global stats
    const marketCap = currentPrice * 180000000; // Example calculation
    const volume = currentPrice * 5000000000; // Example calculation

    // Send response as plain text (fixing the JSX/HTML issue)
    res.send(`
        <h2 id="price" class="${className}" hx-get="/get-price" hx-trigger="every 5s" hx-swap="outerHTML">
            ${arrow} $${currentPrice.toFixed(2)}
        </h2>
        <script>
            const priceHistory = ${JSON.stringify(priceHistory)};
            const chart = window.chart;
            if (chart) {
                chart.data.datasets[0].data = priceHistory;
                chart.update();
            }

            // Update stats
            document.getElementById('marketCap').textContent = '$${(marketCap / 1e9).toFixed(2)} B';
            document.getElementById('volume').textContent = '$${(volume / 1e9).toFixed(2)} B';
        </script>
    `);
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
