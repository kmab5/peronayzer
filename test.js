import express from "express";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = 8214;

const ai = new GoogleGenAI({ apiKey: "AIzaSyCbsRej9iWPcGRtkEenlVFYU2MrieseCs4" });

const icstyles = [
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "avataaars-neutral",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "bottts",
    "bottts-neutral",
    "croodles",
    "croodles-neutral",
    "dylan",
    "fun-emoji",
    "glass",
    "icons",
    "identicon",
    "initials",
    "lorelei",
    "lorelei-neutral",
    "micah",
    "miniavs",
    "notionists",
    "notionists-neutral",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
    "rings",
    "shapes",
    "thumbs"
];

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("loading.ejs");
    try {
        const response = await axios.get("https://api.dicebear.com/9.x/lorelei/svg?flip=true");
        const data = response.data;

        // const chat = ai.chats.create({
        //     model: "gemini-2.0-flash",
        //     history: [
        //         {
        //             role: "user",
        //             parts: [{ text: "You will be generating a persona after I give you a variety of inputs. I want you to only return a stringified JSON Object with your generated values for the keys: seed (spaceless unique string generated from a unique combination of all the inputs/generated outputs), style (choose from the list below based on provided context otherwise randomly), unqiuename (string generated creatively), personalities (list of at most 4, unless provided with more, strings generated from common personality traits), colors (a list of 2 strings hex codes which follow color theory and resonate with the generated personalities). If I already provide some of the values, then use them as inspiration to generate the other empty content. Additionally, if present, I will provide a general text which you can use as direction when creating the content. List of styles: adventurer, adventurer-neutral, avataaars, avataaars-neutral, big-ears, big-ears-neutral, big-smile, bottts, bottts-neutral, croodles, croodles-neutral, dylan, fun-emoji, glass, icons, identicon, initials, lorelei, lorelei-neutral, micah, miniavs, notionists, notionists-neutral, open-peeps, personas pixel-art, pixel-art-neutral, rings, shapes, thumbs. When generating content, make sure each aspect is connected to each other creatively." }],
        //         },
        //         {
        //             role: "model",
        //             parts: [{ text: "Okay. I will only send the generated JSON Object." }],
        //         },
        //     ],
        // });
        // const prompt1 = await chat.sendMessage({
        //     message: "uniquename:kmab,style:,personalities:playful,extrainfo:I want to have a bright persona",
        // });
        // console.log(prompt1.text);

        const chat = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-05-20",
            contents: "You will be generating a persona after I give you a variety of inputs. For unprovided inputs, you will generate your own version following my instructions as follows. I want you to only return a stringified JSON Object with your generated values for the keys: seed (spaceless unique string generated from a unique combination of all the inputs/generated outputs, you can be creative with the generation of this seed as we need it to be unique, you can convert some parts of it  into a different base numeral, etc etc. but since it is going to be used in a URL, dont include any special characters and spaces), style (choose from the list below based on provided context otherwise randomly), unqiuename (string generated creatively, try to make this as creative as possible, using oblique and remote connections, double entendres, be creative with this one, try not to make the meaning of the name obvious, as an example, you can use old languages, or create new words even), personalities (list of 4, unless provided with more, strings generated from common personality traits), colors (a list of 2 strings hex codes which follow color theory and resonate with the generated personalities, make sure to use unique colors, not simple shades of famous colors, make it a complex combination of different shades). If I already provide some of the values, then use them as inspiration to generate the other empty content. Additionally, if present, I will provide a general text (extrainfo) which you can use as direction when creating the content. List of styles: adventurer, adventurer-neutral, avataaars, avataaars-neutral, big-ears, big-ears-neutral, big-smile, bottts, bottts-neutral, croodles, croodles-neutral, dylan, fun-emoji, glass, icons, identicon, initials, lorelei, lorelei-neutral, micah, miniavs, notionists, notionists-neutral, open-peeps, personas, pixel-art, pixel-art-neutral, rings, shapes, thumbs. For context these styles are styles used by dicebear so you can use them as a guide when picking one. When generating content, make sure each aspect is connected to each other creatively. An example output I expect from you might follow this format: {'seed':'~unique seed generated by you~','uniquename':'~unique name generated by you unless provided~','personalities':['bright','outgoing','~personality generated by you unless provided~','~personality generated by you unless provided~'],'colors':['#ef6f21','~hex coded color generated by you which harmonizes with the first color which you generated~']}. Remove any formatting in your responses, be it markdown or HTML, remove any and all formatting and return only the minimized stringified JSON Object. Here are my inputs; uniquename:,style:,personalities:,extrainfo:I want to have a deep and smart persona",
        });
        console.log(JSON.parse(chat.text));
        setTimeout(() => res.redirect("/result"), 500);
        // console.log(data);
    } catch (error) {
        console.log(error);
    }
});

app.get("/result", (req, res) => {
    res.render("index.ejs", {icstyles: icstyles});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});