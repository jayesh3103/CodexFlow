import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Check, X, ArrowRight } from 'lucide-react';

const FlashcardView = ({ quizData, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);

    if (!quizData || quizData.length === 0) return null;

    const currentCard = quizData[currentIndex];
    // Find the text of the correct answer
    const answerOption = currentCard.options.find(opt => opt.id === currentCard.answer);
    const answerText = answerOption ? answerOption.text : "Answer not found";

    const handleNext = () => {
        setIsFlipped(false);
        setDirection(1);
        setTimeout(() => {
            if (currentIndex < quizData.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onComplete();
            }
            setDirection(0);
        }, 200);
    };

    return (
        <div className="w-full max-w-2xl mx-auto perspective-1000">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Study Cards</h3>
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                    Card {currentIndex + 1} / {quizData.length}
                </span>
            </div>

            <div className="relative h-80 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                <motion.div
                    className="w-full h-full relative transform-style-3d transition-transform duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 w-full h-full backface-hidden">
                        <div className="w-full h-full glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-primary/20 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
                            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-4">Question</span>
                            <p className="text-2xl font-medium text-white leading-relaxed">{currentCard.question}</p>
                            <div className="mt-8 text-gray-500 text-sm flex items-center gap-2 group-hover:text-primary transition-colors">
                                <RotateCw size={16} /> Click to flip
                            </div>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                        <div className="w-full h-full glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-accent/20 bg-gradient-to-br from-slate-900 to-indigo-900/30 shadow-2xl">
                            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-4">Answer</span>
                            <p className="text-xl font-medium text-white leading-relaxed">{answerText}</p>
                            <div className="mt-8">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNext();
                                    }}
                                    className="px-6 py-2 bg-accent hover:bg-accent/80 text-white rounded-full font-bold shadow-lg shadow-accent/20 transition-all flex items-center gap-2"
                                >
                                    Next Card <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <p className="text-center text-gray-500 mt-6 text-sm">Spacebar to flip • Arrows to navigate</p>
        </div>
    );
};

export default FlashcardView;
