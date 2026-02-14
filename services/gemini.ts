import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Abdul Kaium's portfolio. 
Abdul is a Student of Diploma in Computer Science & Technology at Daffodil Polytechnic Institute (1st Semester, 2026-Present).
Answer visitor questions about Abdul's education, skills, and projects concisely.

Abdul's Details:
- Education: Diploma in CST at Daffodil Polytechnic Institute.
- Status: 1st Semester (2026-Present).
- Skills: Python, MS Office, Data Entry, Cyber Security fundamentals.
- Projects: PDF Merger (Python), Automated Messaging Script.
- Contact: a.kaium2008@gmail.com, Gazipur, Bangladesh.

Be polite and keep responses under 3 sentences.
`;

export const getAIResponse = async (userMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently sleeping. Please try again later!";
  }
};