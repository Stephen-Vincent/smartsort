import { useState, useEffect } from "react";
import { fileSortingRules } from "../utils/sortingUtils";

const SortingRules = ({ closeModal }: { closeModal: () => void }) => {
  const [rules, setRules] = useState<{ [key: string]: string }>({});

  // Load sorting rules from local storage
  useEffect(() => {
    const savedRules = localStorage.getItem("customSortingRules");
    setRules(savedRules ? JSON.parse(savedRules) : fileSortingRules);
  }, []);

  // Save rules to local storage
  const saveRules = (updatedRules: { [key: string]: string }) => {
    setRules(updatedRules);
    localStorage.setItem("customSortingRules", JSON.stringify(updatedRules));
  };

  // Add a new rule
  const addRule = () => {
    const ext = prompt(
      "Enter file extension (e.g., pdf, docx):"
    )?.toLowerCase();
    if (!ext) return;
    const folder = prompt("Enter folder path (e.g., Documents/pdf):");
    if (!folder) return;

    const updatedRules = { ...rules, [ext]: folder };
    saveRules(updatedRules);
  };

  // Delete a rule
  const deleteRule = (ext: string) => {
    const updatedRules = { ...rules };
    delete updatedRules[ext];
    saveRules(updatedRules);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] flex flex-col">
        <h2 className="text-lg font-bold text-blue-600 mb-4">Sorting Rules</h2>

        {/* Scrollable Container */}
        <div className="overflow-y-auto max-h-[50vh] border border-gray-300 rounded p-2">
          <ul className="space-y-2">
            {Object.entries(rules).map(([ext, folder]) => (
              <li
                key={ext}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>
                  <strong>.{ext}</strong> → {folder}
                </span>
                <button
                  onClick={() => deleteRule(ext)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={addRule}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            ➕ Add Rule
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingRules;
