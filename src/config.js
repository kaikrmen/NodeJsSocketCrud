import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://kaikrmen:Noah29..@mernapp.pwlad.mongodb.net/noteappwithsockets?retryWrites=true&w=majority";