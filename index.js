import { parseTextToJson } from "./jsonParser.js";

let dataAxcore;
let dataGVortex;

async function getData() {
  try {
    const responseAxcore = await fetch(
      "https://fahrez256.github.io/axcore-gvortex/axcore_01.txt"
    );
    const textAxcore = await responseAxcore.text();
    dataAxcore = parseTextToJson(textAxcore);

    const responseGVortex = await fetch(
      "https://fahrez256.github.io/axcore-gvortex/gvortex_01.txt"
    );
    const textGVortex = await responseGVortex.text();
    dataGVortex = parseTextToJson(textGVortex);
  } catch (error) {
    console.error("Error fetching the file:", error);
  }
}

class Main {
  btnDownload;
  btnAxcore;

  constructor() {
    this.initComponent();
    this.initListeners();
    getData().then(() => {
      console.log("Data loaded successfully");
    });
    console.log("hello from Main");
  }

  initComponent() {
    console.log("component");
    this.btnDownload = document.getElementById("btnDownload");
    this.btnAxcore = document.getElementById("btnAxcore");
  }

  initListeners() {
    this.btnDownload.addEventListener("click", () => {
      console.log(dataAxcore);
      if (dataGVortex) {
        window.location.href = dataGVortex.btn_url;
      } else {
        console.error("dataGVortex is not loaded yet");
      }
    });

    this.btnAxcore.addEventListener("click", () => {
      console.log(dataAxcore);
      if (dataAxcore) {
        window.location.href =
          "https://fahrez256.github.io/axcore-gvortex/axcore/" +
          dataAxcore.axname +
          ".apk";
      } else {
        console.error("dataAxcore is not loaded yet");
      }
    });
  }
}

export default new Main();
