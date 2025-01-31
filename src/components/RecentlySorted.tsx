import React from "react";

// ✅ Define Props Type
interface RecentlySortedProps {
  sortedFiles: { file: File; category: string }[];
}

const RecentlySorted: React.FC<RecentlySortedProps> = ({ sortedFiles }) => {
  return (
    <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Recently Sorted
      </h2>
      {sortedFiles.length === 0 ? (
        <p className="text-gray-500">No files sorted yet.</p>
      ) : (
        <ul className="space-y-2">
          {sortedFiles.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-600">
              <span>{item.file.name}</span>
              <span className="text-blue-500">→ {item.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentlySorted;
