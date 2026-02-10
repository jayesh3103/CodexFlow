import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, BrainCircuit, Timer, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizView = ({ quizData, onXpGain }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionStreak, setQuestionStreak] = useState(0);

    const handleAnswerOptionClick = (optionId) => {
        if (selectedOption) return; // Prevent multiple clicks

        setSelectedOption(optionId);
        setShowFeedback(true);

        const isCorrect = optionId === quizData[currentQuestion].answer;
        if (isCorrect) {
            setScore(score + 1);
            setQuestionStreak(prev => prev + 1);
            if (showScore) confetti();

            // Trigger XP Gain (20 XP base + streak bonus)
            const bonus = Math.min(questionStreak * 5, 25);
            onXpGain(20 + bonus);
        } else {
            setQuestionStreak(0);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizData.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedOption(null);
                setShowFeedback(false);
            } else {
                setShowScore(true);
                if (score + (isCorrect ? 1 : 0) === quizData.length) {
                    confetti();
                    onXpGain(100); // Completion bonus
                }
            }
        }, 1500);
    };

    if (!quizData || quizData.length === 0) return null;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent border border-accent/20">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Knowledge Check</h2>
                        <p className="text-sm text-gray-400">Test what you've learned</p>
                    </div>
                </div>

                {questionStreak > 1 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 text-orange-400 font-bold bg-orange-400/10 px-3 py-1 rounded-full border border-orange-400/20"
                    >
                        <Zap size={16} className="fill-orange-400" />
                        {questionStreak}x Streak
                    </motion.div>
                )}
            </div>

            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {showScore ? (
                        <motion.div
                            key="score"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="glass-panel p-10 rounded-2xl text-center flex flex-col items-center justify-center min-h-[300px]"
                        >
                            <Trophy size={64} className="text-yellow-400 mb-6 drop-shadow-xl animate-bounce" />
                            <h3 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h3>
                            <p className="text-gray-300 mb-6 text-lg">
                                You scored <span className="text-accent font-bold text-2xl">{score}</span> out of <span className="text-white font-bold text-2xl">{quizData.length}</span>
                            </p>

                            <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-8">
                                <div
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full transition-all duration-1000"
                                    style={{ width: `${(score / quizData.length) * 100}%` }}
                                ></div>
                            </div>

                            <button
                                onClick={() => {
                                    setCurrentQuestion(0);
                                    setScore(0);
                                    setShowScore(false);
                                    setSelectedOption(null);
                                    setShowFeedback(false);
                                    setQuestionStreak(0);
                                }}
                                className="bg-accent px-8 py-3 rounded-xl font-bold text-white hover:bg-violet-600 transition-all shadow-lg hover:shadow-accent/40 w-full"
                            >
                                Retake Quiz
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={currentQuestion}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="glass-panel p-8 rounded-2xl border-l-[6px] border-l-accent shadow-lg"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Question {currentQuestion + 1} / {quizData.length}</span>
                                <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent transition-all duration-300"
                                        style={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <h3 className="text-xl font-medium text-white mb-8 leading-relaxed">
                                {quizData[currentQuestion].question}
                            </h3>

                            <div className="space-y-3">
                                {quizData[currentQuestion].options.map((option) => {
                                    const isSelected = selectedOption === option.id;
                                    const isCorrect = option.id === quizData[currentQuestion].answer;

                                    let itemClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";

                                    if (selectedOption) {
                                        if (isCorrect) {
                                            itemClass += "bg-green-500/10 border-green-500/50 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                                        } else if (isSelected) {
                                            itemClass += "bg-red-500/10 border-red-500/50 text-red-100";
                                        } else {
                                            itemClass += "border-transparent bg-white/5 opacity-40 grayscale";
                                        }
                                    } else {
                                        itemClass += "bg-white/5 border-transparent hover:bg-white/10 hover:border-accent/30 text-gray-200";
                                    }

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => handleAnswerOptionClick(option.id)}
                                            className={itemClass}
                                            disabled={!!selectedOption}
                                        >
                                            <span className="font-medium">{option.text}</span>
                                            {selectedOption && isCorrect && <CheckCircle size={20} className="text-green-400" />}
                                            {selectedOption && isSelected && !isCorrect && <XCircle size={20} className="text-red-400" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuizView;
