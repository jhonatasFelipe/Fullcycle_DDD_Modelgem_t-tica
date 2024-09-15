import dotenv from "dotenv";
import { app } from "./exprees";


dotenv.config();
const port: number = Number(process.env.PORT) || 3000;


app.listen(port, ()=>{
    console.log(`Server in listening on port ${port} `);
});

