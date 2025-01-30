import React, { useState } from "react";
import { fileIcons } from "../utils/sortingUtils";

const DragDrop = () => {
  const [dragging, setDragging] = useState(false);
  const [sortedFiles, setSortedFiles] = useState<
    { file: File; category: string }[]
  >([]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);

    setSortedFiles([
      ...sortedFiles,
      ...droppedFiles.map((file) => ({ file, category: "Unsorted" })),
    ]);
  };

  const removeFile = (indexToRemove: number) => {
    setSortedFiles(sortedFiles.filter((_, index) => index !== indexToRemove));
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
