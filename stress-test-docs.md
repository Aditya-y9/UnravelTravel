# Stress Test Documentation

## Overview
This stress test is designed to measure the performance and reliability of the UnravelTravel web server under high load. It simulates multiple concurrent users accessing the server over a specified period.

## Test Configuration
- **URL**: `http://localhost:3000/` (The main page served by `server.js`)
- **Concurrency**: 50 (Number of simultaneous connections)
- **Duration**: 10000ms (10 seconds)

## Methodology
The test is implemented in `stress-test.js` using Node.js's native `http` module.
1. The script initializes a set number of concurrent requests (defined by `CONCURRENCY`).
2. As soon as a request completes (either successfully or with an error), a new request is immediately dispatched.
3. This process continues until the specified `DURATION_MS` has elapsed.
4. Throughout the test, metrics such as total requests, successful requests, failed requests, and latencies (response times) are recorded.

## Execution
To run the stress test:
1. Ensure the server is running (`node server.js`).
2. Execute the test script: `node stress-test.js`.

## Output
After the test completes (10 seconds + 1 second buffer for lingering requests), the script calculates the final metrics and outputs them to the console and to a `metrics.json` file.

### Metrics Included:
- `testDurationMs`: The actual duration of the test.
- `totalRequests`: Total individual GET requests dispatched.
- `successfulRequests`: Number of requests that returned a 200 HTTP status code.
- `failedRequests`: Number of requests that failed (non-200 status code or network error).
- `requestsPerSecond` (RPS): Throughput of the server (total requests divided by test duration).
- `latencyStats`:
  - `averageMs`: Mean time to receive the full response.
  - `minMs`: The fastest response time.
  - `maxMs`: The slowest response time.
