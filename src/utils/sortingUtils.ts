import * as dotenv from "dotenv";

// ✅ Declare the electron property on the window object
declare global {
  interface Window {
    electron: {
      readFile: (
        filePath: string
      ) => Promise<{ success: boolean; content?: string; error?: string }>;
    };
  }
}

// ✅ File Icons Mapping
export const fileIcons: { [key: string]: string } = {
  mp3: "🎵",
  wav: "🎵",
  flac: "🎵",
  docx: "📄",
  pdf: "📕",
  txt: "📝",
  xls: "📊",
  xlsx: "📊",
  ppt: "📊",
  pptx: "📊",
  mp4: "🎬",
  mov: "🎬",
  avi: "🎬",
  jpg: "🖼️",
  png: "🖼️",
  gif: "🖼️",
  svg: "🖼️",
  default: "📁",
};

// ✅ User-Defined Sorting Rules (Takes Priority Over AI)
export const fileSortingRules: { [key: string]: string } = {
  docx: "Documents/docx",
  pdf: "Documents/pdf",
  txt: "Documents/txt",
  xls: "Documents/excel",
  xlsx: "Documents/excel",
  ppt: "Documents/powerpoint",
  pptx: "Documents/powerpoint",
  mp3: "Music",
  wav: "Music",
  flac: "Music",
  mp4: "Videos",
  mov: "Videos",
  avi: "Videos",
  jpg: "Images",
  png: "Images",
  gif: "Images",
  svg: "Images",
};

// ✅ Use RapidAPI to Get Categorization
async function getCategorizationFromRapidAPI(
  fileContent: string,
  fileName: string
): Promise<string> {
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const rapidApiHost = "free-chatgpt-api.p.rapidapi.com"; // Replace with the correct host if needed
  const url = `https://${rapidApiHost}/chat-completion-one?prompt=${encodeURIComponent(
    fileContent
  )}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": rapidApiKey || "",
      "x-rapidapi-host": rapidApiHost,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("RapidAPI Response:", data);

    // Assuming the response contains a 'response' field with the category
    return data.response || "Miscellaneous";
  } catch (error) {
    console.error("Error with RapidAPI request:", error);
    return "Unsorted";
  }
}

// ✅ Use Electron IPC to Get File Content (No `fs` in React!)
async function extractFileContent(filePath: string): Promise<string> {
  try {
    const response = await window.electron.readFile(filePath); // Fetch from Electron Main Process
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.content || "Error extracting file content.";
  } catch (error) {
    console.error(`❌ Error extracting content from ${filePath}:`, error);
    return "Error extracting file content.";
  }
}

// ✅ AI-Enhanced File Categorization with User Rules
export async function categoriseFiles(files: File[]) {
  return await Promise.all(
    files.map(async (file) => {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "default";
      const filePath = file.webkitRelativePath || file.name; // Use correct path reference
      const fileContent = await extractFileContent(filePath);

      // ✅ Step 1: Check User-Defined Rules First
      if (fileSortingRules[fileExt]) {
        return { file, category: fileSortingRules[fileExt] };
      }

      // ✅ Step 2: If No User Rule, Use AI Categorization (via RapidAPI)
      const prompt = `Classify the following document into one of these categories:
      - Invoices
      - Receipts
      - Contracts
      - Reports
      - Personal Documents
      - Work Documents
      - Music
      - Videos
      - Pictures
      - Miscellaneous

      File Name: "${file.name}"
      Content Preview:
      ---
      ${fileContent}
      ---
      
      Return only the best matching category name from the list above.`;

      try {
        const category = await getCategorizationFromRapidAPI(prompt, file.name);
        return { file, category };
      } catch (error) {
        console.error("❌ AI Classification Error:", error);
        return { file, category: "Unsorted" };
      }
    })
  );
}

// ✅ Handle Sorting Files (Triggered When "Sort Files" is Clicked)
export async function handleSortFiles(
  files: File[],
  setSortedFiles: (sortedFiles: { file: File; category: string }[]) => void
) {
  if (files.length === 0) {
    alert("No files to sort!");
    return;
  }

  console.log("Sorting files...");
  try {
    const sorted = await categoriseFiles(files);
    setSortedFiles(sorted);
    console.log("✅ Sorted Files:", sorted);
  } catch (error) {
    console.error("❌ Error Sorting Files:", error);
    alert("An error occurred while sorting files.");
  }
}
