import React, { useState, useRef, useEffect } from 'react';
import RepoInput from '../components/RepoInput';
import GraphView from '../components/GraphView';
import LessonView from '../components/LessonView';
import QuizView from '../components/QuizView';
import FlashcardView from '../components/FlashcardView';
import GamificationBar from '../components/GamificationBar';
import AchievementsView from '../components/AchievementsView';
import { analyzeRepo } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Layers, BookOpen, BrainCircuit, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Gamification State
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(0);
    const [unlockedBadges, setUnlockedBadges] = useState([]);

    const resultsRef = useRef(null);
    const inputRef = useRef(null);

    // Tabs state
    const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'flashcards' | 'quiz'

    const handleXpGain = (amount) => {
        setXp(prev => {
            const newXp = prev + amount;
            // Level up logic (every 100 XP)
            if (Math.floor(newXp / 100) > Math.floor(prev / 100)) {
                setLevel(l => l + 1);
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500']
                });
            }
            return newXp;
        });
        setStreak(s => s + 1);

        // Check achievements
        if (!unlockedBadges.includes('streak_master') && streak >= 5) {
            setUnlockedBadges(prev => [...prev, 'streak_master']);
        }
    };

    const handleAnalyze = async (url, filePath) => {
        setLoading(true);
        setError(null);
        try {
            const result = await analyzeRepo(url, filePath);
            setData(result);

            // First Analysis Achievement
            if (!unlockedBadges.includes('first_analysis')) {
                setUnlockedBadges(prev => [...prev, 'first_analysis']);
                handleXpGain(50);
            }

            // Smooth scroll to results after a short delay
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            setError("Failed to analyze repository. Please check complexity/URL.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background text-white selection:bg-primary/30">

            <GamificationBar xp={xp} level={level} streak={streak} />

            {/* Hero Section */}
            <section ref={inputRef} className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow"></div>
                </div>

                <div className="z-10 w-full max-w-4xl mx-auto space-y-12 pt-20">
                    <header className="text-center space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-7xl font-extrabold tracking-tighter"
                        >
                            <span className="text-white">Codex</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Flow</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 font-light"
                        >
                            The Interactive Code Onboarding Engine
                        </motion.p>
                    </header>

                    <RepoInput onAnalyze={handleAnalyze} loading={loading} />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl max-w-lg mx-auto text-center backdrop-blur-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Achievements Showcase (Mini) */}
                    <div className="max-w-2xl mx-auto">
                        <AchievementsView unlockedBadges={unlockedBadges} />
                    </div>
                </div>

                {data && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-10 animate-bounce cursor-pointer"
                        onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <ArrowDown className="text-gray-500 hover:text-white transition-colors" size={32} />
                    </motion.div>
                )}
            </section>

            {/* Results Section */}
            {data && (
                <div ref={resultsRef} className="min-h-screen py-20 px-6 max-w-7xl mx-auto space-y-16">

                    {/* Architecture Graph */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <Layers size={32} />
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold">System Architecture</h2>
                                <p className="text-gray-400 mt-1">Interactive dependency visualization</p>
                            </div>
                        </div>
                        <GraphView initialNodes={data.graph.nodes} initialEdges={data.graph.edges} />
                    </motion.section>

                    {/* Interactive Learning Modules */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <GraduationCap size={32} />
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold">Interactive Learning</h2>
                                <p className="text-gray-400 mt-1">Master the codebase step-by-step</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-4 border-b border-gray-700 mb-8 overflow-x-auto pb-2">
                            <button
                                onClick={() => setActiveTab('lesson')}
                                className={`px-6 py-3 font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === 'lesson' ? 'text-primary border-primary' : 'text-gray-400 border-transparent hover:text-white'}`}
                            >
                                <div className="flex items-center gap-2"><BookOpen size={18} /> Guide</div>
                            </button>
                            <button
                                onClick={() => setActiveTab('flashcards')}
                                className={`px-6 py-3 font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === 'flashcards' ? 'text-accent border-accent' : 'text-gray-400 border-transparent hover:text-white'}`}
                            >
                                <div className="flex items-center gap-2"><Layers size={18} /> Flashcards</div>
                            </button>
                            <button
                                onClick={() => setActiveTab('quiz')}
                                className={`px-6 py-3 font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === 'quiz' ? 'text-secondary border-secondary' : 'text-gray-400 border-transparent hover:text-white'}`}
                            >
                                <div className="flex items-center gap-2"><BrainCircuit size={18} /> Exam Mode</div>
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="min-h-[500px]">
                            <AnimatePresence mode="wait">
                                {activeTab === 'lesson' && (
                                    <motion.div
                                        key="lesson"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <LessonView chapters={data.chapters} />
                                    </motion.div>
                                )}

                                {activeTab === 'flashcards' && (
                                    <motion.div
                                        key="flashcards"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                    >
                                        <FlashcardView
                                            quizData={data.quiz}
                                            onComplete={() => {
                                                handleXpGain(50);
                                                setActiveTab('quiz');
                                            }}
                                        />
                                    </motion.div>
                                )}

                                {activeTab === 'quiz' && (
                                    <motion.div
                                        key="quiz"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <QuizView quizData={data.quiz} onXpGain={handleXpGain} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.section>

                    <footer className="text-center pt-24 pb-8 text-gray-600">
                        <p>Generated by CodexFlow AI • {new Date().getFullYear()}</p>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default Home;
