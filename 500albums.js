const fs = require("fs");
const path = require("path");
const express = require("express");

const data = JSON.parse(fs.readFileSync("./500albums.json"));

async function main() {
  const fetch = (await import("node-fetch")).default;

  // data.sort((a, b) => {
  //   return a.position - b.position;
  // });

  // for (const album of data) {
  //   const match = /^(.+), &#821(6|7);(.+)&#82(17|21);$/.exec(album.title);
  //   if (!match) {
  //     throw new Error(album.title);
  //   }
  //   album.author = match[1];
  //   album.albumName = match[3];
  // }

  // for (const album of data) {
  //   const match = /^(.+), (\d+)$/.exec(album.subtitle);
  //   if (!match) {
  //     throw new Error(album.title);
  //   }
  //   album.records = match[1];
  //   album.year = Number(match[2]);
  // }

  // for (const album of data) {
  //   if (!album.img) {
  //     continue;
  //   }
  //   const fileName = path.basename(new URL(album.img).pathname);
  //   const filePath = './images/' + fileName;
  //   album.localImg = filePath;
  //   if (fs.existsSync(filePath)) {
  //     continue;
  //   }
  //   const res = await fetch(album.img);
  //   const buf = await res.buffer();
  //   fs.writeFileSync(filePath, buf);
  // }

  // fs.writeFileSync("./500albums.json", JSON.stringify(data, null, 2));

  console.log(data[0]);
}

function processHtml() {
  let html = `<meta charset="utf-8">`;
  html += "<title>The 500 Greatest Albums of All Time</title>";
  html += `<style>`;
  html += "html { font-family: sans-serif; }";
  html += "td { vertical-align: top; padding: 10px 10px 90px 10px; }";
  html += "img { width: 300px; height: 300px; }";
  html += "a { color: black; }";
  html += `</style>`;
  html += `<script>
document.addEventListener('click', e => {
  const href = e.target.href;
  if (!href) {
    return;
  }
  const hash = new URL(href).hash;
  if (hash.startsWith('#pos-')) {
    localStorage.setItem('lastVisited', hash);
  }
});
window.addEventListener('load', () => {
  const lastVisited = localStorage.getItem('lastVisited');
  if (lastVisited) {
    window.location = lastVisited;
  }
});
</script>`;
  html += `<table>`;
  for (const album of data) {
    html += "<tr>";
    html += "<td>";
    if (album.localImg) {
      html += `<img src="${album.localImg}">`;
    }
    html += "</td>";
    html += "<td>";
    html += `<a name="pos-${album.position}"></a>`;
    html += `<h2><a href="#pos-${album.position}">${album.position}. ${album.author} — ${album.albumName}</a></h2>`;
    html += `<p><b>${album.subtitle}</b></p>`;
    html += album.description;
    html += "</td>";
    html += "</tr>";
  }
  html += "</table>";
  return html;
}

fs.writeFileSync("./500albums.html", processHtml());

// const app = express();
// app.use("/images/", express.static("./images"));
// app.get("/", (req, res) => {
//   res.send(processHtml());
// });
// app.listen(3000);
