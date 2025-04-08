import React, { useState } from "react";
import { roadmapData } from "../../data/roadmapData";
import { FaYoutube, FaChevronDown, FaChevronRight, FaCheck } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Tile = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedSteps, setExpandedSteps] = useState(
    roadmapData.reduce((acc, step) => {
      acc[step.step_no] = false; // Start with all steps expanded
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
    <div className="mt-6 space-y-4 max-w-6xl mx-auto">
      {roadmapData.map((step) => (
        <div 
          key={step.step_no} 
          className="rounded-xl overflow-hidden border border-gray-200/70 bg-white shadow-sm hover:shadow-md transition-all"
        >
          {/* Modern step header */}
          <div 
            className={`flex items-center justify-between p-5 cursor-pointer transition-all ${
              expandedSteps[step.step_no] 
                ? "bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-gray-200/30" 
                : "bg-white hover:bg-gray-50/50"
            }`}
            onClick={() => toggleStep(step.step_no)}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                expandedSteps[step.step_no] 
                  ? "bg-blue-100 text-blue-600" 
                  : "bg-gray-100 text-gray-600"
              }`}>
                {step.step_no}
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {step.step_title}
              </h2>
            </div>
            <div className="text-gray-500">
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
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {step.sub_steps.map((sub) => (
                    <div
                      key={sub.sub_step_no}
                      className="bg-gray-50/50 rounded-lg p-4 border border-gray-200/50"
                    >
                      <h3 className="text-md font-medium text-gray-700 mb-3 px-2">
                        {sub.sub_step_no}. {sub.sub_step_title}
                      </h3>

                      <div className="rounded-lg overflow-hidden border border-gray-200/50">
                        {/* Header row */}
                        <div className="grid grid-cols-12 bg-gray-100/70 p-3 border-b border-gray-200/50">
                          <div className="col-span-1 text-xs font-medium text-gray-600 uppercase tracking-wider">Done</div>
                          <div className="col-span-5 text-xs font-medium text-gray-600 uppercase tracking-wider">Problem</div>
                          <div className="col-span-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Article</div>
                          <div className="col-span-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Video</div>
                          <div className="col-span-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Level</div>
                        </div>

                        {/* Content rows */}
                        {sub.topics.map((topic) => (
                          <div 
                            key={topic.id} 
                            className={`grid grid-cols-12 items-center p-3 border-b border-gray-200/30 last:border-b-0 transition-colors ${
                              checkedItems[topic.id] 
                                ? "bg-green-300 " 
                                : "hover:bg-gray-50"
                            }`}
                          >
                            {/* Status checkbox */}
                            <div className="col-span-1 flex justify-center">
                              <button
                                onClick={() => handleCheckBox(topic.id)}
                                className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                                  checkedItems[topic.id] 
                                    ? "bg-green-500 text-white" 
                                    : "border border-gray-300 hover:border-blue-400"
                                }`}
                              >
                                {checkedItems[topic.id] && <FaCheck className="text-xs" />}
                              </button>
                            </div>

                            {/* Problem title */}
                            <div className="col-span-5">
                              <div className={`text-sm font-medium ${
                                checkedItems[topic.id] 
                                  ? "text-green-700" 
                                  : "text-gray-800"
                              }`}>
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
                                  className={`p-2 rounded-full hover:bg-gray-200/50 transition-colors ${
                                    checkedItems[topic.id] 
                                      ? "text-green-600" 
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
                                  className={`p-2 rounded-full hover:bg-gray-200/50 transition-colors ${
                                    checkedItems[topic.id] 
                                      ? "text-green-600" 
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
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  checkedItems[topic.id]
                                    ? "bg-green-600/90 text-white"
                                    : topic.difficulty === 0
                                    ? "bg-emerald-500/10 text-emerald-700"
                                    : topic.difficulty === 1
                                    ? "bg-amber-500/10 text-amber-700"
                                    : "bg-rose-500/10 text-rose-700"
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