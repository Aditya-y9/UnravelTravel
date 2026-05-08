const http = require('http');
const fs = require('fs');

const URL = 'http://localhost:3000/';
const CONCURRENCY = 50;
const DURATION_MS = 10000; // 10 seconds

let totalRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;
const latencies = [];

const startTime = Date.now();
const endTime = startTime + DURATION_MS;

function makeRequest() {
    if (Date.now() >= endTime) {
        return;
    }

    const reqStart = Date.now();
    totalRequests++;

    const req = http.get(URL, (res) => {
        res.on('data', () => {}); // Consume response
        res.on('end', () => {
            if (res.statusCode === 200) {
                successfulRequests++;
            } else {
                failedRequests++;
            }
            latencies.push(Date.now() - reqStart);
            makeRequest();
        });
    });

    req.on('error', (err) => {
        failedRequests++;
        makeRequest();
    });
}

console.log(`Starting stress test on ${URL}`);
console.log(`Concurrency: ${CONCURRENCY}, Duration: ${DURATION_MS}ms...`);

for (let i = 0; i < CONCURRENCY; i++) {
    makeRequest();
}

setTimeout(() => {
    const testEndTime = Date.now();
    const actualDuration = testEndTime - startTime;
    
    // Calculate metrics
    const avgLatency = latencies.length ? latencies.reduce((a, b) => a + b, 0) / latencies.length : 0;
    
    let maxLatency = 0;
    let minLatency = latencies.length > 0 ? latencies[0] : 0;
    for (let i = 0; i < latencies.length; i++) {
        if (latencies[i] > maxLatency) maxLatency = latencies[i];
        if (latencies[i] < minLatency) minLatency = latencies[i];
    }
    
    const rps = (totalRequests / (actualDuration / 1000));

    const metrics = {
        testDurationMs: actualDuration,
        totalRequests,
        successfulRequests,
        failedRequests,
        requestsPerSecond: rps.toFixed(2),
        latencyStats: {
            averageMs: avgLatency.toFixed(2),
            minMs: minLatency,
            maxMs: maxLatency
        }
    };

    console.log('Stress test complete. Writing metrics to metrics.json');
    fs.writeFileSync('metrics.json', JSON.stringify(metrics, null, 2));
    console.log(metrics);
    process.exit(0);
}, DURATION_MS + 1000);
