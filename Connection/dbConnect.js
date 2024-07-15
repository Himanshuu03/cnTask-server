const mongoose = require('mongoose');

const mongoDBURI = 'mongodb+srv://himanshuCheck:himanshu234@cluster0.n6caph3.mongodb.net/myDatabase?retryWrites=true&w=majority';

const dbConnect = async () => {
    try {
      await mongoose.connect(mongoDBURI);
      console.log('Successfully connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
}
module.exports = dbConnect;