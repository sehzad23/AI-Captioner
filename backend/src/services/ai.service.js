const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateCaption(imageBuffer) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // ✅ correct model
     systemInstruction: `
      You are an Instagram caption generator.
      Generate a short engaging caption for the image.
      Rules:
      - Add 2 to 4 relevant emojis
      - Add 3 to 5 relevant hashtags
      - Keep caption natural and catchy
      - Output only the caption text
    `,
  });

  const result = await model.generateContent([
    "Describe this image in one short caption",
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    },
  ]);

  const text = result.response.text();

  console.log("🔥 GEMINI:", text);

  return text || "📸 Nice moment";
}

module.exports = generateCaption;