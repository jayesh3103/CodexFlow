import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle, Copy } from 'lucide-react';

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

    // Helper to render content with premium styling
    const renderContent = (content) => {
        // Split by code blocks to apply "Mac window" styling
        // Simple regex split for ```code``` blocks
        const parts = content.split(/(```[\s\S]*?```)/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('```')) {
                const codeContent = part.replace(/```\w*\n?/, '').replace(/```$/, '');
                return (
                    <div key={index} className="my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl group">
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <button className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                                onClick={() => navigator.clipboard.writeText(codeContent)}
                            >
                                <Copy size={12} /> Copy
                            </button>
                        </div>
                        <div className="p-4 overflow-x-auto custom-scrollbar">
                            <pre className="text-sm font-mono text-blue-300 leading-relaxed">
                                {codeContent}
                            </pre>
                        </div>
                    </div>
                );
            }
            // Regular Markdown-like parsing (simplified for MVP)
            return (
                <div key={index} className="mb-4 text-gray-300 leading-relaxed text-lg font-light">
                    {part}
                </div>
            );
        });
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                     <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        Module <span className="text-primary">0{currentIndex + 1}</span>
                    </h2>
                    <p className="text-sm text-gray-400 font-mono tracking-wide uppercase">Interactive Walkthrough</p>
                </div>

                {/* Stepper */}
                 <div className="flex gap-1.5">
                    {chapters.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-primary shadow-[0_0_10px_rgba(0,243,255,0.5)]' : idx < currentIndex ? 'w-2 bg-primary/30' : 'w-2 bg-gray-800'}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                        className="h-full"
                    >
                        <div className="glass-panel p-8 h-full rounded-2xl border border-white/5 bg-black/20 shadow-xl overflow-y-auto custom-scrollbar">
                           <h3 className="text-2xl font-bold mb-6 text-white pb-4 border-b border-white/5">
                                {currentChapter.title}
                           </h3>
                           <div className="space-y-4">
                                {renderContent(currentChapter.content)}
                           </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t border-white/5">
                <button
                    onClick={prevChapter}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentIndex === 0
                            ? 'text-gray-700 cursor-not-allowed'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <ChevronLeft size={20} /> <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                    onClick={nextChapter}
                    disabled={currentIndex === chapters.length - 1}
                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${currentIndex === chapters.length - 1
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-black hover:scale-105 hover:shadow-primary/20'
                        }`}
                >
                    {currentIndex === chapters.length - 1 ? (
                        <>Finish <CheckCircle size={20} className="text-green-600" /></>
                    ) : (
                        <>Next <ChevronRight size={20} /></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default LessonView;
