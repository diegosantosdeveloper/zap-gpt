import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { sendWhatsppMessage } from "./services/twilio";
import { getOpenAICompletion } from "./services/openai";

const app = express();

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config();

app.post('/chat/send', async (req, res) => {
    const {to, body} = req.body;
    try {
        await sendWhatsppMessage(`whatsapp:${to}`, body);
        res.status(200).json({success: true, body});
    } catch (error) {
        res.status(500).json({success: false, error});
    }
})

app.post('/chat/receive', async (req, res) => {
    const twilioReqBody = req.body;
    const messageBody = twilioReqBody.Body;
    const to = twilioReqBody.From;

    try {
        const completion = await getOpenAICompletion(messageBody);
        await sendWhatsppMessage(to, completion);
        res.status(200).json({success: true, messageBody});
    } catch (error) {
        res.status(500).json({success: false, error});
    }
    
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}, graças a Deus`);
});
