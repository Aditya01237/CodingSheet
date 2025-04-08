import React, { useState } from "react";
import { roadmapData } from "../../data/roadmapData";
import { FaYoutube, FaChevronDown, FaChevronRight, FaCheck } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Tile = ({ darkMode }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedSteps, setExpandedSteps] = useState(
    roadmapData.reduce((acc, step) => {
      acc[step.step_no] = false;
      return acc;
    }, {})
  );

  const handleCheckBox = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleStep = (stepNo) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNo]: !prev[stepNo]
    }));
  };

  return (
    <div className={`mt-6 space-y-4 w-full ${darkMode ? 'dark' : ''}`}>
      {roadmapData.map((step) => (
        <div 
          key={step.step_no} 
          className={`w-full rounded-xl overflow-hidden border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} shadow-sm hover:shadow-md transition-all`}
        >
          {/* Step header */}
          <div 
            className={`flex items-center justify-between p-5 cursor-pointer transition-all ${
              expandedSteps[step.step_no] 
                ? darkMode 
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 border-b border-gray-700" 
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200"
                : darkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => toggleStep(step.step_no)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                expandedSteps[step.step_no] 
                  ? darkMode 
                    ? "bg-blue-900 text-blue-300" 
                    : "bg-blue-100 text-blue-600"
                  : darkMode 
                    ? "bg-gray-700 text-gray-400" 
                    : "bg-gray-100 text-gray-600"
              }`}>
                {step.step_no}
              </div>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {step.step_title}
              </h2>
            </div>
            <div className={darkMode ? "text-gray-400" : "text-gray-500"}>
              {expandedSteps[step.step_no] ? (
                <FaChevronDown className="transition-transform" />
              ) : (
                <FaChevronRight className="transition-transform" />
              )}
            </div>
          </div>

          {/* Animated content area */}
          <AnimatePresence>
            {expandedSteps[step.step_no] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-x-auto"
              >
                <div className="p-4 space-y-4 min-w-[600px] md:min-w-0">
                  {step.sub_steps.map((sub) => (
                    <div
                      key={sub.sub_step_no}
                      className={`rounded-lg p-4 border ${darkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}
                    >
                      <h3 className={`text-md font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        {sub.sub_step_no}. {sub.sub_step_title}
                      </h3>

                      <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        {/* Header row */}
                        <div className={`grid grid-cols-12 p-3 border-b ${darkMode ? 'bg-gray-600 border-gray-600' : 'bg-gray-100 border-gray-200'}`}>
                          <div className={`col-span-1 text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Done</div>
                          <div className={`col-span-5 text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Problem</div>
                          <div className={`col-span-2 text-center text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Article</div>
                          <div className={`col-span-2 text-center text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Video</div>
                          <div className={`col-span-2 text-center text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Level</div>
                        </div>

                        {/* Content rows */}
                        {sub.topics.map((topic) => (
                          <div 
                            key={topic.id} 
                            className={`grid grid-cols-12 items-center p-3 border-b ${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-50'} last:border-b-0 transition-colors ${
                              checkedItems[topic.id] 
                                ? darkMode 
                                  ? "bg-green-900" 
                                  : "bg-green-100" 
                                : ""
                            }`}
                          >
                            {/* Status checkbox */}
                            <div className="col-span-1 flex justify-center">
                              <button
                                onClick={() => handleCheckBox(topic.id)}
                                className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                                  checkedItems[topic.id] 
                                    ? "bg-green-500 text-white" 
                                    : darkMode 
                                      ? "border border-gray-500 hover:border-blue-400" 
                                      : "border border-gray-300 hover:border-blue-400"
                                }`}
                              >
                                {checkedItems[topic.id] && <FaCheck className="text-xs" />}
                              </button>
                            </div>

                            {/* Problem title */}
                            <div className="col-span-5 px-2">
                              <div className={`text-sm font-medium truncate ${
                                checkedItems[topic.id] 
                                  ? darkMode 
                                    ? "text-green-300" 
                                    : "text-green-700"
                                  : darkMode 
                                    ? "text-gray-200" 
                                    : "text-gray-800"
                              }`}
                              title={topic.question_title}>
                                {topic.question_title}
                              </div>
                            </div>

                            {/* Article link */}
                            <div className="col-span-2 flex justify-center">
                              {topic.post_link && (
                                <a
                                  href={topic.post_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-full hover:${darkMode ? 'bg-gray-500' : 'bg-gray-200'} transition-colors ${
                                    checkedItems[topic.id] 
                                      ? "text-green-500" 
                                      : darkMode 
                                        ? "text-blue-400" 
                                        : "text-blue-500"
                                  }`}
                                  title="Read article"
                                >
                                  <FaNewspaper className="text-lg" />
                                </a>
                              )}
                            </div>

                            {/* YouTube link */}
                            <div className="col-span-2 flex justify-center">
                              {topic.yt_link && (
                                <a
                                  href={topic.yt_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`p-2 rounded-full hover:${darkMode ? 'bg-gray-500' : 'bg-gray-200'} transition-colors ${
                                    checkedItems[topic.id] 
                                      ? "text-green-500" 
                                      : darkMode 
                                        ? "text-red-400" 
                                        : "text-red-500"
                                  }`}
                                  title="Watch video"
                                >
                                  <FaYoutube className="text-lg" />
                                </a>
                              )}
                            </div>

                            {/* Difficulty */}
                            <div className="col-span-2 flex justify-center">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                  checkedItems[topic.id]
                                    ? "bg-green-600 text-white"
                                    : topic.difficulty === 0
                                    ? darkMode 
                                      ? "bg-emerald-900 text-emerald-300" 
                                      : "bg-emerald-100 text-emerald-700"
                                    : topic.difficulty === 1
                                    ? darkMode 
                                      ? "bg-amber-900 text-amber-300" 
                                      : "bg-amber-100 text-amber-700"
                                    : darkMode 
                                      ? "bg-rose-900 text-rose-300" 
                                      : "bg-rose-100 text-rose-700"
                                }`}
                              >
                                {checkedItems[topic.id] 
                                  ? "Completed" 
                                  : topic.difficulty === 0 
                                    ? "Beginner" 
                                    : topic.difficulty === 1 
                                      ? "Intermediate" 
                                      : "Advanced"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Tile;