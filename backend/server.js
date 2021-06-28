const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoConnect = require('./config/db');

// env config
dotenv.config({ path: './backend/config/.env' });

// DB Connection
mongoConnect();

// Routes
const auth = require('./routes/auth.route');
const conference = require('./routes/conference.route');
const researcher = require('./routes/researcher.route');
const workshop = require('./routes/workshop.route');
const keynote = require('./routes/keynote.route');

const app = express();

// Body Parser
app.use(express.json({ limit: '50mb' }));

// CORS
app.use(cors());

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/conferences', conference);
app.use('/api/v1/researcher', researcher);
app.use('/api/v1/workshop', workshop);
app.use('/api/v1/keynotes', keynote);

// morgan http
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // process.exit(1);
});
