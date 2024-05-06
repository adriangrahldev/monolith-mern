import mongoose from 'mongoose';


mongoose.connect('mongodb://localhost:27017/Monolith', {}).then(() => {
    console.log("Connected to MongoDB => Monolith");
}).catch((err) => {
    console.error("Error connecting to MongoDB => Monolith", err);
    process.exit(1);
});