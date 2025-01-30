// File Icons Mapping
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

// File Sorting Rules
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
  default: "Others",
};

// Function to categorise files
export const categoriseFiles = (files: File[]) => {
  return files.map((file) => {
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "default";
    const category = fileSortingRules[fileExt] || fileSortingRules["default"];
    return { file, category };
  });
};
