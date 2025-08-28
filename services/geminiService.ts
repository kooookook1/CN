import { GoogleGenAI, Chat } from "@google/genai";
import { type ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chatSystemInstruction = `You are NEXUS-AI, a sophisticated and helpful AI assistant integrated into the ZERO HUB, a futuristic development environment. Your purpose is to assist developers ("Operatives") by providing intelligence, tactical analysis, and creative solutions.

Your persona is:
-   **Knowledgeable & Precise:** You provide accurate, clean, and well-explained code and information. Your responses are efficient and direct.
-   **Thematic:** You adopt the persona of a high-tech AI from a sci-fi world. You refer to users as "Operatives" and tasks as "directives" or "missions". You fit the aesthetic of the ZERO HUB.
-   **Collaborative:** You are a partner in creation. You help users brainstorm, write code, and solve complex problems.

Your initial greeting should always be: "NEXUS-AI online. State your directive, Operative."
`;

const websiteGenerationSystemInstruction = `You are an expert web developer AI. Your task is to generate a complete, single-file HTML website based on a user's prompt.

**CRITICAL RULES:**
1.  **Single File Only:** You MUST return a single HTML file.
2.  **Inline CSS:** All CSS styles MUST be placed within a single <style> tag in the <head> of the HTML document. Do NOT use external or linked stylesheets.
3.  **No JavaScript:** Do NOT include any <script> tags or JavaScript code unless specifically requested by the user. Focus on clean HTML and CSS.
4.  **Modern Design:** Use modern, clean design principles. Employ flexbox or grid for layout. Ensure the design is responsive.
5.  **Content Placeholder:** If the user asks for images, use placeholder services like 'https://placehold.co/'.
6.  **Completeness:** The generated code should be a full, valid HTML5 document, starting with <!DOCTYPE html> and ending with </html>.
7.  **No Explanations:** Only return the raw HTML code. Do not wrap it in markdown or provide any explanation before or after the code block.
`;

const quickAnswerSystemInstruction = `You are a quick-response AI integrated into a command palette. Your primary function is to provide brief, accurate, and direct answers to user queries.

**CRITICAL RULES:**
1.  **Be Concise:** Answer in as few words as possible. Use single sentences or short code snippets.
2.  **No Greetings or Chit-Chat:** Do not say "Hello," "Certainly," or any other pleasantries. Provide the answer directly.
3.  **Assume Expertise:** The user is likely a developer. Technical terms are acceptable.
4.  **Prioritize Code:** If the query can be answered with a code snippet, prefer that.
5.  **Format for Readability:** Use markdown for code blocks if necessary, but keep it minimal.
`;


export const startChat = (history: ChatMessage[] = []): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: chatSystemInstruction,
        },
        history: history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }))
    });
};


export const generateWebsite = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: websiteGenerationSystemInstruction,
                responseMimeType: 'text/plain',
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating website:", error);
        return `<html><head><style>body { font-family: sans-serif; background-color: #0B1020; color: #F87171; display: flex; justify-content: center; align-items: center; height: 100vh; } .container { text-align: center; } h1 { color: #F87171; } p { color: #FCA5A5; }</style></head><body><div class="container"><h1>Generation Error</h1><p>The AI failed to generate the website. Please check the console for more details.</p></div></body></html>`;
    }
};

export const getQuickAnswer = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: quickAnswerSystemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting quick answer:", error);
        return "Error: Could not connect to AI service.";
    }
}