import { useState } from "react";
import Button from "./components/Button";
import DragDrop from "./components/DragDrop";
import Header from "./components/Header";
import RecentlySorted from "./components/RecentlySorted";
import SortingRules from "./components/SortingRules"; // ✅ Import Sorting Rules Modal
import SortFilesButton from "./components/SortFilesButton";
import { handleSortFiles } from "./utils/sortingUtils"; // ✅ Import Sorting Function

// ✅ Dashboard Layout
const App = () => {
  const [showSortingRules, setShowSortingRules] = useState(false);
  const [files, setFiles] = useState<File[]>([]); // ✅ Store uploaded files
  const [sortedFiles, setSortedFiles] = useState<
    { file: File; category: string }[]
  >([]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex flex-col items-center p-6">
      <Header />

      {/* ✅ Drag & Drop Container (Pass setFiles to update state) */}
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6 mb-6 flex justify-center items-center">
        <DragDrop setFiles={setFiles} />
      </div>

      {/* ✅ Display Recently Sorted Files */}
      <RecentlySorted sortedFiles={sortedFiles} />

      {/* ✅ Buttons Section */}
      <div className="mt-6 flex gap-4">
        <Button
          label="Sorting Rules"
          icon="➕"
          onClick={() => setShowSortingRules(true)}
        />
        <Button label="My Folders" icon="📁" />
        <Button label="Settings" icon="⚙️" />
      </div>

      {/* ✅ Sorting Rules Modal */}
      {showSortingRules && (
        <SortingRules closeModal={() => setShowSortingRules(false)} />
      )}

      {/* ✅ Sort Files Button (Now Calls handleSortFiles) */}
      <SortFilesButton onSort={() => handleSortFiles(files, setSortedFiles)} />
    </div>
  );
};

export default App;
