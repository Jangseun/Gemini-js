const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI("API_KEY");

function fileToGenerativePart(path, mimeType){
    return{
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

async function run() {
    const model = genAI.getGenerativeModel({model: "gemini-pro-vision"});

    const prompt = "이 강아지의 종은 뭐고 어떤 특징을 가지고 있어??"

    const imageParts = fileToGenerativePart("chi_dog.png", "image/png");

    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();