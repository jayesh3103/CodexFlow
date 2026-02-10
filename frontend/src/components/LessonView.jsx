import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const LessonView = ({ chapters }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!chapters || chapters.length === 0) return null;

    const currentChapter = chapters[currentIndex];

    const nextChapter = () => {
        if (currentIndex < chapters.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const prevChapter = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary border border-secondary/20">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Code Walkthrough</h2>
                        <p className="text-sm text-gray-400">Step {currentIndex + 1} of {chapters.length}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="hidden md:flex gap-1">
                    {chapters.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${idx <= currentIndex ? 'bg-secondary' : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel p-8 rounded-2xl border-l-[6px] border-l-secondary shadow-lg relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

                        <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
                            <span className="text-secondary opacity-50">#{currentIndex + 1}</span> {currentChapter.title}
                        </h3>
                        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
                            {currentChapter.content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={prevChapter}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentIndex === 0
                            ? 'text-gray-600 cursor-not-allowed'
                            : 'text-white hover:bg-white/10 active:bg-white/20'
                        }`}
                >
                    <ChevronLeft size={20} /> Previous
                </button>

                <button
                    onClick={nextChapter}
                    disabled={currentIndex === chapters.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentIndex === chapters.length - 1
                            ? 'text-gray-500 cursor-not-allowed bg-gray-800'
                            : 'bg-secondary text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-secondary/20 transform hover:-translate-y-0.5'
                        }`}
                >
                    {currentIndex === chapters.length - 1 ? (
                        <span className="flex items-center gap-2">Finish <CheckCircle size={18} /></span>
                    ) : (
                        <span className="flex items-center gap-2">Next Chapter <ChevronRight size={18} /></span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LessonView;
