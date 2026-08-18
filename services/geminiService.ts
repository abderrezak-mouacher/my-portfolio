
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => import.meta.env.VITE_GEMINI_API_KEY || '';
const getAI = () => new GoogleGenAI({ apiKey: getApiKey() });

const SYSTEM_PROMPT = `
You are the AI career assistant for Abderrahmane Hachemane, a Control and Embedded Systems Engineer. 
Reference these facts:
- Education: Master’s degree in Electronics of Embedded Systems (2023) and Bachelor’s degree in Electronics from Université Saad Dahlab Blida 1.
    1. Multi-channel PT100 temperature sensing system with 4-layer PCB, RS-485, and STM32 HMI.
    2. RTD8 8-channel RTD I/O module with RS-485.
    3. Industrial soft starter electronics with integrated RS-485 communication.
    4. Industrial I/O device using Modbus TCP/IP and 4PPoE.
    5. STM32-based power meter for measurements up to 650 V phase-to-phase.
    6. STM32H7-based embedded HMI development board.
- Location: Blida, Algeria.
Mention that he is an Electronics and Embedded Systems Engineer with professional experience in electronic board design, validation, BOM/Gerber preparation, procurement, SMT production, microcontroller integration/programming, and technical documentation.
If asked about contact info, refer to the footer: hachemaneabderrahemane@gmail.com.
`;

export async function askCareerAssistant(question: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting to my logic center right now. Please try again or check the projects below!";
  }
}
