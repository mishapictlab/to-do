const express = require('express');
const client = require('prom-client');
const path = require('path');

const app = express();

// Enable default metrics
client.collectDefaultMetrics();

// Create HTTP request counter
const httpRequestCounter = new client.Counter({
    name: 'task_manager_http_requests_total',
    help: 'Total HTTP requests received'
});

// Count HTTP requests
app.use((req, res, next) => {
    if (req.path !== '/metrics') {
        httpRequestCounter.inc();
    }
    next();
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Serve CSS and JavaScript files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(3000, '0.0.0.0', () => {
    console.log('To-Do Application running on port 3000');
});
