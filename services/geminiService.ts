import { GoogleGenAI, Type } from "@google/genai";
import { Gender, Occasion, StylingResult, SkinTone } from "../types";

const GEMINI_API_KEY = process.env.API_KEY;

if (!GEMINI_API_KEY) {
  console.error("API_KEY is not defined in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || '' });

export const generateStylingAdvice = async (
  imageBase64: string,
  gender: Gender,
  occasion: Occasion
): Promise<StylingResult> => {
  const modelId = "gemini-3-flash-preview"; 

  // Clean base64 string if it contains metadata
  const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, "");

  const prompt = `
    You are a professional fashion stylist and color theory expert.
    
    1. Analyze the uploaded image to detect the person's skin tone (Fair, Medium, Olive, or Deep).
    2. Based on the detected skin tone, the user's gender (${gender}), and the occasion (${occasion}), generate a personalized styling recommendation.
    
    Provide:
    - Detected Skin Tone
    - Outfit suggestion (Top, Bottom, Shoes)
    - Accessories list
    - Hairstyle recommendation
    - Color palette (Primary, Secondary, Accent)
    - Detailed explanation of why these colors and styles suit this skin tone
    - 5 shopping search keywords suitable for Indian e-commerce websites (Amazon.in, Myntra, Zara)
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", 
              data: cleanBase64
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedSkinTone: { type: Type.STRING, enum: [SkinTone.FAIR, SkinTone.MEDIUM, SkinTone.OLIVE, SkinTone.DEEP] },
            outfit: {
              type: Type.OBJECT,
              properties: {
                top: { type: Type.STRING },
                bottom: { type: Type.STRING },
                shoes: { type: Type.STRING }
              }
            },
            accessories: { type: Type.ARRAY, items: { type: Type.STRING } },
            hairstyle: { type: Type.STRING },
            colorPalette: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING, description: "Hex code or color name" },
                secondary: { type: Type.STRING, description: "Hex code or color name" },
                accent: { type: Type.STRING, description: "Hex code or color name" }
              }
            },
            explanation: { type: Type.STRING },
            shoppingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    const parsedData = JSON.parse(resultText);

    return {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      userImage: imageBase64,
      gender,
      occasion,
      ...parsedData
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate styling advice. Please try again.");
  }
};
