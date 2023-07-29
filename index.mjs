import express from "express";
import mustache from "mustache";
import * as entities from "entities";
import fs from "node:fs/promises";

async function getAlbums() {
  const data = JSON.parse(await fs.readFile("./500albums.json", "utf-8"));

  return data.map((album) => {
    const author = entities.decodeHTML(album.author);
    const albumName = entities.decodeHTML(album.albumName);
    const searchQuery = encodeURIComponent(`${author} ${albumName}`);
    const vkMusicLink = `https://vk.com/audios3306683?q=${searchQuery}`;
    const yandexMusicLink = `https://music.yandex.ru/search?text=${searchQuery}`;
    const spotifyLink = `https://open.spotify.com/search/${searchQuery}`;
    const discogsLink = `https://www.discogs.com/search/?q=${searchQuery}&type=master`;

    return {
      ...album,
      vkMusicLink,
      yandexMusicLink,
      spotifyLink,
      discogsLink,
    };
  });
}

async function getTemplate() {
  return await fs.readFile("./template.html", "utf-8");
}

const app = express();

app.use("/images/", express.static("./images"));

app.get("/", async (req, res) => {
  const albums = await getAlbums();
  const template = await getTemplate();
  const html = mustache.render(template, { albums });
  res.send(html);
});

app.listen(8080);
