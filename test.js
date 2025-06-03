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
    // res.render("result.ejs", {
    //   seed: "kmabwkjnas12as1",
    //   avatar: `<svg class="style-preview avatar"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980" fill="none" shape-rendering="auto"><metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Lorelei</dc:title><dc:creator>Lisa Wischofsky</dc:creator><dc:source xsi:type="dcterms:URI">https://www.figma.com/community/file/1198749693280469639</dc:source><dcterms:license xsi:type="dcterms:URI">https://creativecommons.org/publicdomain/zero/1.0/</dcterms:license><dc:rights>Remix of „Lorelei” (https://www.figma.com/community/file/1198749693280469639) by „Lisa Wischofsky”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id="viewboxMask"><rect width="980" height="980" rx="0" ry="0" x="0" y="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><g transform="scale(-1 1) translate(-980 0)"><g transform="translate(10 -60)"><path d="M612 96c15-1 29 1 42 9 11 7 20 18 23 31 3 14 1 27-3 40-4 11-8 22-15 32l26-4c20-1 40 1 58 11 21 12 42 30 51 52 6 14 7 30 1 44s-17 26-30 35c4 12 5 25 2 38-3 14-8 30-19 41a93 93 0 0 1-52 22c-7 1-16 2-23 1-11-2-21-5-29-13l-17-22-6-21c-13-2-24-8-35-15a54 54 0 0 1-39 21c-13 0-26-5-37-10-15-8-28-19-40-31l-9 15c-16 26-39 47-66 60-19 10-39 15-60 13 6 11 7 24 6 36-1 10-6 19-14 26-6 5-14 7-21 9-2 8-5 16-10 23-8 10-21 16-34 17-12 0-23-4-33-10-12-9-22-22-26-36-2-10-2-20 1-29-15-1-30-6-40-17-6-6-10-14-13-22-4-15-2-30 2-45 9-27 28-51 52-67 9-6 18-11 29-14-6-8-10-17-8-27 1-14 10-26 20-35 13-13 30-20 48-23 14-3 30-3 43 2 0-6 1-10 3-16 4-13 12-25 21-36 15-17 32-32 52-42 5-3 10-5 16-6 10-2 22 0 31 6 6 5 11 12 14 19a194 194 0 0 1 138-62ZM323 618c15 5 25 20 27 35 1 8-2 16-7 23 6 0 12 2 17 6 5 5 8 13 9 20s-2 15-7 20c2 3 3 6 1 9-5 5-13 7-20 4-9-3-16-11-20-20-10 4-20 4-31 4l-14-4c-7-3-13-10-16-17-4-10-6-21-4-32 2-14 9-27 20-37 11-11 30-17 45-11Z" fill="#000000"/><path d="M528 244c41 6 80 22 113 47 28 21 50 49 65 81 13 28 20 60 19 91-1 15-3 30-8 44h-2l1-21c1-30-2-59-13-87-10-30-28-57-50-79-42-40-98-62-156-63a243 243 0 0 0-196 94 207 207 0 0 0-40 139l2 25c8 0 19 0 25 7l-3 3-17 1c-12 1-24 5-33 13a64 64 0 0 0-17 39c-5 32 12 65 39 83 16 10 36 15 55 9 4-2 9-5 14-3 3 1 4 4 5 7a251 251 0 0 0 90 100c8 7 18 13 28 18 18 8 38 14 57 19l32 8c5 1 9 1 13 3l-4 1c-25 2-48-3-72-10-12-3-23-7-34-12a306 306 0 0 1-84-63l2 28c1 17 0 35-6 52-4 12-11 24-19 34-10 10-22 19-34 26-10 7-21 14-32 18l-16 5 9-9 31-20 22-17a95 95 0 0 0 32-56c2-14 2-28 2-43v-27c-10-14-22-29-27-46-17 8-38 7-55-1-17-7-32-19-43-33-12-17-19-36-21-56s2-40 15-56c9-10 22-18 35-21-4-14-6-29-6-44a234 234 0 0 1 83-173 249 249 0 0 1 199-55Z" fill="#000"/><path d="M653 320c22 22 40 49 50 79 11 28 14 57 13 87l-1 21-5 15-2 13 2 56c0 21 1 42-1 63l-3 47c-2 16-7 31-14 45-11 18-26 33-44 44-13 8-27 12-41 16l-38 11-17 3c0 1 1 2 3 2 8 5 17 5 26 4-3 7-4 14-2 22 3 7 11 11 17 14 12 6 24 7 36 9 7 6 14 14 16 24 2 8 2 16-2 23-5 10-14 18-24 23-13 8-27 14-42 18a468 468 0 0 1-222-1c-17-4-33-9-48-17-12-6-23-13-32-22-5-7-9-14-10-23 11-4 22-11 32-18 12-7 24-16 34-26 8-10 15-22 19-34 6-17 7-35 6-52l-2-28 22 23c19 15 40 30 62 40 11 5 22 9 34 12 24 7 47 12 72 10l4-1c-4-2-8-2-13-3l-32-8c-19-5-39-11-57-19l-29-17c-11-9-23-17-33-27a251 251 0 0 1-56-74c-1-3-2-6-5-7-5-2-10 1-14 3-19 6-39 1-55-9a88 88 0 0 1-39-83c1-14 7-28 17-39 9-8 21-12 33-13l17-1 3-3c-6-7-17-7-25-7l-2-25a207 207 0 0 1 40-139 243 243 0 0 1 196-94c58 1 114 23 156 63Z" fill="#ffffff"/><path d="M710 522c3 0 3 4 4 6 3 11 4 23 5 34l2 21c1 22 2 43 1 65-1 21-1 44-5 65a136 136 0 0 1-80 99c-15 7-31 11-48 13v15c1 3 3 4 5 6 12 6 23 8 36 11 12 3 24 5 36 11-3 3-7 4-11 4-7 1-15-1-23-1-12-2-24-3-36-9-6-3-14-7-17-14-2-8-1-15 2-22-9 1-18 1-26-4-2 0-3-1-3-2l17-3 38-11c14-4 28-8 41-16 18-11 33-26 44-44 7-14 12-29 14-45l3-47c2-21 1-42 1-63l-2-56 2-13ZM252 549c8 0 17 1 23 7 5 4 10 9 12 15 1 3 0 6-2 8l-13 8c-7 6-7 19 0 25 6 5 14 8 21 11 2 0 5 1 6 3-1 2-3 3-5 3-10 0-20-3-28-9-5-3-8-8-9-13-2-8-2-17 4-24 4-6 11-9 18-12-4-5-7-11-14-13-7-3-15-3-22-5l9-4Z" fill="#000"/><path d="m661 483 13 7 10 10c5 3 11 2 17 2-3 6-10 6-16 6-11 1-20-4-30-4l6 5c4 4 5 11 5 16-1 4-2 8-5 11-6 9-21 10-27 1-5-6-5-13-1-20-6 6-11 11-15 18-2 1-5 5-7 2-2-4 0-9 2-14 3-7 7-15 13-21 7-7 14-13 24-15l-4-2c4-3 10-3 15-2ZM453 487l-6 5c-6 3-11 7-15 11 8-3 15-6 23-7 13-3 26-1 37 5 9 3 16 8 22 15 5 6 9 13 9 21 0 2-1 4-4 4l-7-7-9-6c0 5-2 11-5 15-4 8-13 12-22 10-9-1-16-9-17-18-2-8 1-16 6-22-13 0-22 5-32 11-10 5-20 5-31 4-5 0-9-1-13-3l-2-2c7-1 15-2 21-5l5-4c6-16 24-26 40-27Z" fill="#000000"/><path d="M467 377c15 1 32 5 44 15 4 3 8 7 9 11 1 3 1 5-2 6-3 0-6-3-8-5-11-8-24-13-38-13-8 0-15 2-23 4-15 3-29 11-38 23-3 3-5 7-10 8s-10-3-10-8c-1-4 2-8 4-11 12-15 30-25 49-29 7-2 15-2 23-1ZM672 387c5 2 10 7 13 11 3 3 5 7 5 11 0 6-6 10-12 8-5-2-6-7-10-11-4-3-9-7-13-8-12-4-24 1-32 9l-9 9c0-7 4-13 9-17 12-13 32-18 49-12Z" fill="#000000"/><path d="M609 602c1 9-4 16-9 23-4 3-9 6-15 6s-13-3-19-5c-4-2-8-3-11-6l5-4c9-1 17 3 25 4 4 0 7-3 9-6 5-5 9-10 15-12Z" fill="#000000"/><path d="m636 651-7 7c-7 8-14 16-23 23-8 7-17 13-27 16-11 4-23 4-35 3-16-2-31-5-45-12l-12-7c-1-2-1-4 1-5s6 0 8 1c12 4 24 8 37 9 17 2 34 2 50-3 8-2 15-6 21-10l24-17 8-5Z" fill="#000000"/><path d="M612 96c15-1 31 2 44 10 10 7 18 18 21 31 3 14 1 27-3 40-4 11-9 21-15 31 12-2 25-4 37-4s23 1 34 5c12 4 24 12 34 20 12 10 23 23 30 37 5 12 7 26 3 39s-12 25-22 34c-12 10-25 18-40 23-24 9-50 12-76 10-2 6-5 11-10 15-6 6-16 7-24 6-14-2-27-8-39-16a54 54 0 0 1-39 21c-13 0-26-5-37-10-15-8-28-19-40-31l-9 15c-16 26-39 47-66 60-19 10-39 15-60 13 6 11 7 24 6 36-1 11-6 20-14 27-6 4-14 7-21 8-2 11-7 20-15 28-8 7-19 12-30 12-10 0-19-3-28-7-14-9-25-23-30-39-2-10-2-20 1-29-15-1-30-6-40-17-7-7-11-15-13-24-4-14-2-29 2-43 9-27 28-51 52-67 9-6 18-11 29-14-5-6-8-13-9-21 0-9 3-18 8-26 6-9 14-17 23-23a102 102 0 0 1 81-13c0-5 0-9 2-14 3-9 8-18 13-27a162 162 0 0 1 65-55c10-5 21-7 32-3 11 3 20 13 25 24 12-13 26-24 41-34a199 199 0 0 1 97-28Z" fill="#000000"/></g><g transform="translate(10 -60)"></g></g></g></svg>`,
    //   style: "lorelei",
    //   unqname: "kmab",
    //   personalities: ["bright", "witty", "observant", "introvert"],
    //   colors: ["#12afe4", "#de2e0f"],
    //   icstyles: icstyles
    // });
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