const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  const fancy = req.query.fancy;

  if (fancy) {
    res.send(`
      <html>
        <head>
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .fancy-text {
              font-size: 24px;
              color: #333;
              animation: fadeIn 2s ease-in-out;
            }
          </style>
        </head>
        <body>
          <div class="fancy-text">Hello, World! Welcome to YVALCORP IT Training Bootcamp.</div>
        </body>
      </html>
    `);
  } else {
    res.send('Hello, World! YVALCORP IT.\n');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
