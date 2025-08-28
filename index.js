// import packages
const express = require("express");
const cors = require("cors");
const {GoogleGenAI} = require("@google/genai");
require("dotenv").config();

// app initialize
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/api", (req, res) => {
    const {message} = req.body;
    
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_APIKEY
    });

    async function main() {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: message
            });

            return res.status(200).json({reply: response.text});
        } catch(err) {
            return res.status(500).json({reply: "Server error", error: err});
        }
    }

    main();
});

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});