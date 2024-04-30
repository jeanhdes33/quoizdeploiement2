const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB not connected', err));

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000' // Autorise les requêtes depuis ce domaine
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const staticDir = path.resolve(); // Obtient le répertoire actuel
app.use(express.static(path.join(staticDir, '/client/build')));
app.get('*', (req, res) => res.sendFile(path.join(staticDir, '/client/build/index.html'))); 
app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
