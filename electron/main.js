import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mammoth from "mammoth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // ✅ Ensure preload is correct
    },
  });

  mainWindow.loadURL("http://localhost:5173");
});

// ✅ Move pdf-parse inside the function (Fixes Unwanted Execution)
ipcMain.handle("read-file", async (event, filePath) => {
  try {
    const fileExt = path.extname(filePath).toLowerCase();
    const data = fs.readFileSync(filePath);

    if (fileExt === ".pdf") {
      const { default: pdfParse } = await import("pdf-parse"); // ✅ Dynamically import pdf-parse
      const parsed = await pdfParse(Buffer.from(data)); // ✅ Convert to Buffer
      return { success: true, content: parsed.text || "No text found." };
    } else if (fileExt === ".docx") {
      const parsed = await mammoth.extractRawText({
        buffer: Buffer.from(data),
      });
      return { success: true, content: parsed.value || "No text found." };
    } else if ([".txt", ".md", ".csv"].includes(fileExt)) {
      return { success: true, content: data.toString("utf-8") };
    } else {
      return { success: false, error: "Unsupported file type." };
    }
  } catch (error) {
    console.error(`❌ Error reading file: ${error.message}`);
    return { success: false, error: `Failed to read file: ${error.message}` };
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
