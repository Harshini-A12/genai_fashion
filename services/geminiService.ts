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
  occasion: Occasion,
  age: string,
  eventDetails: string,
  budget?: string,
  colorPreference?: string
): Promise<StylingResult> => {
  const modelId = "gemini-3-flash-preview"; 

  // Clean base64 string if it contains metadata
  const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, "");

  const prompt = `
    You are a professional fashion stylist and color theory expert.
    
    1. Analyze the uploaded image to detect the person's skin tone (Fair, Medium, Olive, or Deep).
    2. The user is ${age} years old and identifies as ${gender}.
    3. They are attending an event described as: "${eventDetails}" (General Category: ${occasion}).
    4. Their budget is: "${budget || "Flexible/Not Specified"}".
    5. Their preferred color is: "${colorPreference || "None, open to suggestions"}".
    
    Based on their age, gender, specific event details, budget, detected skin tone, and color preference:
    - Generate a personalized styling recommendation.
    - If a specific color is preferred, try to incorporate it if it compliments the skin tone; otherwise, suggest a harmonizing alternative and explain why.
    - Keep the budget in mind when suggesting types of fabrics or brands in the explanation (e.g., silk/linen for higher budgets, blends for lower).
    
    Provide:
    - Detected Skin Tone
    - Outfit suggestion (Top, Bottom, Shoes)
    - Accessories list
    - Hairstyle recommendation
    - Color palette (Primary, Secondary, Accent)
    - Detailed explanation of why these colors and styles suit this skin tone, age, event, and budget.
    - 5 shopping search keywords suitable for Indian e-commerce websites (Amazon.in, Myntra, Ajio, Nykaa Fashion)
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
      age,
      eventDetails,
      budget,
      colorPreference,
      ...parsedData
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate styling advice. Please try again.");
  }
};