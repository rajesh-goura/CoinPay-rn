import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    Part,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyBNrva5l3Rwnu_kMYhAZlNQJfflKAZL_q4";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function runChat(prompt: string | (string | Part)[]) {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });
  
      const result = await chatSession.sendMessage(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error("Error in runChat:", error);
      return "Sorry, I encountered an error. Please try again.";
    }
  }
  
  export default runChat;