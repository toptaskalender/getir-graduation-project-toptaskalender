const configure = require('./config');
const load      = require('./loaders');
const app       = require('./app');

// Load environment variables from a .env file into process.env
configure();
// Connect to provided MongoDB database
load();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port: ${process.env.APP_PORT} ✅`);
});