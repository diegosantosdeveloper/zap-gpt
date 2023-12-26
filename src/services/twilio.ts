import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config()

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const whatsappPhoneNumber = process.env.WHATSAPP_PHONE_NUMBER

const client = twilio(accountSID, authToken);

export const sendWhatsppMessage = async (to: string, body: string): Promise<void> => {
    try {
        await client.messages.create({
            to,
            from: whatsappPhoneNumber,
            body
        })
    } catch (error) {
        console.log(`Error sending message to ${to}: ${error}`)
    }
}