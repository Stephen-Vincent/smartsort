// Recently Sorted Component
const RecentlySorted = () => {
  const sortedFiles = [
    { file: "song.mp3", folder: "music" },
    { file: "word.docx", folder: "documents" },
    { file: "file.pdf", folder: "pdf" },
    { file: "movie.mp4", folder: "movies" },
    { file: "picture.jpg", folder: "photos" },
  ];

  return (
    <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Recently Sorted
      </h2>
      <ul className="space-y-2">
        {sortedFiles.map((item, index) => (
          <li key={index} className="flex justify-between text-gray-600">
            <span>{item.file}</span>
            <span className="text-blue-500">→ {item.folder}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlySorted;
