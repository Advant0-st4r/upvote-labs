// src/utils/exportUtils.ts
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const generateProjectZip = async (problemTitle: string, features: string[]) => {
  const zip = new JSZip();

  // Frontend placeholder
  const frontendFolder = zip.folder("frontend");
  frontendFolder?.file(
    "App.jsx",
    `
import React from "react";
function App() {
  return (
    <div>
      <h1>${problemTitle} MVP</h1>
      <ul>
        ${features.map((f) => `<li>${f}</li>`).join("\n")}
      </ul>
    </div>
  );
}
export default App;
`
  );

  // Backend placeholder
  const backendFolder = zip.folder("backend");
  backendFolder?.file(
    "server.js",
    `
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => res.send("${problemTitle} Backend"));

app.listen(PORT, () => console.log("Server running on port", PORT));
`
  );

  // README
  zip.file(
    "README.md",
    `# ${problemTitle} MVP
This is a placeholder MVP generated from UpvoteLabs.
Frontend: React
Backend: Express
Features:
${features.map((f) => `- ${f}`).join("\n")}
`
  );

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${problemTitle.replace(/\s/g, "_")}_MVP.zip`);
};
