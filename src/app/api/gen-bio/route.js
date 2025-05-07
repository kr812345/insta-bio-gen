import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        // Temporary check for API key
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set in environment variables");
        }
        
        const { name, age, niche, vibe } = await req.json();

        const prompt = `
        You are an expert Instagram content strategist and bio copywriter.
        
        Generate 3 unique, long,catchy Instagram bios (under 120 characters each) for the following individual:
        
        - Name: ${name}
        - Age: ${age}
        - Niche: ${niche}
        - Vibe: ${vibe}
        
        Requirements:
        - Use a mix of English and Hindi (Hinglish) if it suits the tone.
        - Make the bios relatable, fun, or aspirational — as per the vibe.
        - Ensure the bios reflect Indian Gen Z/Millennial culture.
        - Use emojis if they enhance the appeal.
        - No hashtags, links, or handles — just clean bios.
        
        IMPORTANT: Respond with ONLY a valid JSON object in this exact format, with no markdown formatting or additional text:
        {
            "bio1": "first bio here",
            "bio2": "second bio here",
            "bio3": "third bio here"
        }
        `;

        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean the response text to ensure it's valid JSON
        const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
        
        try {
            const bios = JSON.parse(cleanText);
            return new Response(JSON.stringify(bios), {
                headers: {"Content-Type": "application/json"},
                status: 200,
            });
        } catch (error) {
            console.error("Failed to parse response:", error);
            console.error("Raw response:", text);
            return new Response(JSON.stringify({ 
                error: "Failed to generate valid bio format",
                details: "The AI response was not in the expected format"
            }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }
        
    } catch (error) {
        console.error("Gemini Error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate bio" }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }
}
