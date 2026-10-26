process.loadEnvFile();

const DB_USERNAME = process.env.MONGODB_USERNAME;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const database = process.env.NODE_ENV === 'test' ? 'blogs-test' : 'blogs';
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.pqdbj7k.mongodb.net/${database}?appName=Cluster0`;

const PORT = process.env.PORT;

module.exports = { MONGODB_URI, PORT };
