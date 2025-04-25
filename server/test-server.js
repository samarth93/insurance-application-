const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
}); 
 