const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const publicDir = __dirname;
const instrumentedDir = path.join(__dirname, 'instrumented');

// Serve instrumented JS if it exists, otherwise serve from original
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        const jsFile = path.basename(req.url);
        const instrumentedPath = path.join(instrumentedDir, jsFile);
        if (require('fs').existsSync(instrumentedPath)) {
            return res.sendFile(instrumentedPath);
        }
    }
    next();
});

app.use(express.static(publicDir));

app.listen(port, () => {
    console.log(`Test server running at http://localhost:${port}`);
});
