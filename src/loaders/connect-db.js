const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Database connection successful  ✅`);
  } catch (e) {
    console.error('Database connection failed ❌');
  }
}

module.exports = connectDB;