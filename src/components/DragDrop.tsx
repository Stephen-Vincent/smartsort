import React, { useState } from "react";
import { fileIcons } from "../utils/sortingUtils";

// ✅ Define Props Type
interface DragDropProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const DragDrop: React.FC<DragDropProps> = ({ setFiles }) => {
  const [dragging, setDragging] = useState(false);
  const [sortedFiles, setSortedFiles] = useState<
    { file: File; category: string; content?: string }[] // added content
  >([]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);

    // ✅ Update Internal State
    const newFiles = await processFiles(droppedFiles);
    setSortedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // ✅ Update Parent State in App.tsx
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // ✅ Process the files
  const processFiles = async (files: File[]) => {
    const categorizedFiles = await Promise.all(
      files.map(async (file) => {
        // Read the file content (for example, as text)
        const content = await readFileContent(file);

        // You can integrate categorization logic here (e.g., AI or user-defined rules)
        const category = categorizeFile(file, content);

        return { file, category, content };
      })
    );
    return categorizedFiles;
  };

  // ✅ Read file content (for example, as text)
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string); // resolve with file content
      reader.onerror = () => reject("Error reading file");
      reader.readAsText(file); // Use readAsText or readAsDataURL depending on the file type
    });
  };

  // ✅ Categorize the file (replace with logic as needed)
  const categorizeFile = (file: File, content: string): string => {
    if (file.name.endsWith(".pdf")) {
      return "Documents";
    } else if (file.name.endsWith(".mp3")) {
      return "Music";
    } else if (content.includes("Invoice")) {
      return "Invoices";
    } else {
      return "Miscellaneous";
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSortedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    ); // ✅ Remove from parent state
  };

  return (
    <div
      className={`w-full h-40 border-2 ${
        dragging ? "border-blue-500" : "border-gray-400"
      } border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 bg-white shadow-md transition-all p-4`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {sortedFiles.length === 0 ? (
        "Drag and drop your files here"
      ) : (
        <ul className="w-full text-left space-y-2">
          {sortedFiles.map(({ file, category }, index) => (
            <li
              key={index}
              className="flex justify-between text-gray-700 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">
                  {fileIcons[file.name.split(".").pop() || "default"]}
                </span>
                <span>{file.name}</span>
              </span>
              <span className="text-blue-500">→ {category}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DragDrop;
