const mongoose = require('mongoose');
process.loadEnvFile();

const DB_USERNAME = process.env.MONGODB_USERNAME;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.pqdbj7k.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length > 2) {
  const name = process.argv[2];
  const number = process.argv[3];

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log('Person saved');
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log('Phonebook:');
    persons.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
}
