const express = require('express')
const app = express()

const port = 8080
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

require('./router')(app);

app.listen(port || 3000, () => {
  console.log(`Server listening on port ${port || 3000}`);
})