const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Test server is working' });
});

app.post('/test', (req, res) => {
  res.json({ received: req.body });
});

app.listen(3000, () => {
  console.log('Test server running on port 3000');
});