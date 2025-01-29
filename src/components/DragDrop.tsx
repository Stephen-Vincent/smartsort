import React, { useState } from "react";

// File Icons Mapping
const fileIcons: { [key: string]: string } = {
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

// File Categories Mapping
const fileCategories: { [key: string]: string } = {
  mp3: "Music",
  wav: "Music",
  flac: "Music",
  docx: "Documents",
  pdf: "Documents",
  txt: "Documents",
  xls: "Documents",
  xlsx: "Documents",
  ppt: "Documents",
  pptx: "Documents",
  mp4: "Videos",
  mov: "Videos",
  avi: "Videos",
  jpg: "Images",
  png: "Images",
  gif: "Images",
  svg: "Images",
  default: "Others",
};

// Drag and Drop Component with sorting and remove functionality
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

    const categorizedFiles = droppedFiles.map((file) => {
      const fileExt = file.name.split(".").pop()?.toLowerCase() || "default";
      const category = fileCategories[fileExt] || fileCategories["default"];
      return { file, category };
    });

    setSortedFiles([...sortedFiles, ...categorizedFiles]);
  };

  const removeFile = (indexToRemove: number) => {
    setSortedFiles(sortedFiles.filter((_, index) => index !== indexToRemove));
  };

  // Group files by category
  const groupedFiles = sortedFiles.reduce((acc, file, index) => {
    acc[file.category] = acc[file.category] || [];
    acc[file.category].push({ ...file, index });
    return acc;
  }, {} as { [key: string]: { file: File; category: string; index: number }[] });

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
        <div className="w-full text-left space-y-4">
          {Object.entries(groupedFiles).map(([category, files]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-blue-700">
                {category}
              </h3>
              <ul className="space-y-1">
                {files.map(({ file, index }) => {
                  const fileExt =
                    file.name.split(".").pop()?.toLowerCase() || "default";
                  const icon = fileIcons[fileExt] || fileIcons["default"];
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 text-sm justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{icon}</span>
                        <span>{file.name}</span>
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✖
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDrop;
