import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
})

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => { // switch the app on and if any error comes
            console.log("Error", error);
            throw error;
        });
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        });
    } catch (error) {
        console.log("Failed to start server", error);
    }
}
startServer();