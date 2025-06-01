import express from "express";
import axios from "axios";

const app = express();
const port = 8214;

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

app.get("/", (req, res) => {
  res.render("index.ejs", {icstyles: icstyles});
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/auto", (req, res) => {
  let prompt = req.body.prompt;
  let seed = "", avatar= "", style = "", unqname = "", personalities = [], colors = [];

  let ai_prompt = "";

  console.log(prompt);
  res.render("result.ejs", {
    seed: seed,
    avatar: avatar,
    style: style,
    unqname: unqname,
    personalities: personalities,
    colors: colors,
    icstyles: icstyles
  });
});

app.post("/manual", (req, res) => {
  let seed = "", avatar = "", style = req.body.style, unqname = req.body.name, personalities = req.body.personality != "" ?req.body.personality.split(", ") : [], colors = [];

  let ai_prompt = "";

  console.log(`Seed: ${seed}, Style: ${style}, Unqname: ${unqname}, Personalities: ${personalities.length} from ${req.body.personality} to ${personalities}, Colors: ${colors}`);
  res.render("index.ejs", {
    seed: seed,
    avatar: avatar,
    style: style,
    unqname: unqname,
    personalities: personalities,
    colors: colors,
    icstyles: icstyles
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});