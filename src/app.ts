import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sendWhatsppMessage } from "./services/twilio";

const app = express();

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

app.post('/chat/send', async (req, res) => {
    const {to, body} = req.body;
    try {
        await sendWhatsppMessage(`whatsapp:${to}`, body);
        res.status(200).json({success: true, body});
    } catch (error) {
        res.status(500).json({success: false, error});
    }
})

const port = 3000

app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}`);
});
