import app from './app.js';

const port = process.env.APP_PORT;
app.listen(port, process.env.APP_IP);
