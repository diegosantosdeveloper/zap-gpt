import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

export const getOpenAICompletion = async (input: string): Promise<string> => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {role: "user", content: input}
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" }
        });
        return completion.choices[0].message?.content as string;
    } catch(error) {
        console.log(`Error completion input: ${error}`);
        return '';
    }
}
