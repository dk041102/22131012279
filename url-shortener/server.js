const express = require('express');
const logger = require('./middleware/logger').default;
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger); // Custom logging middleware
app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});