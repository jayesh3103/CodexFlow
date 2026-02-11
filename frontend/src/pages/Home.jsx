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
                    colors: ['#00f3ff', '#bc13fe']
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
            }, 500);
        } catch (err) {
            setError("Failed to analyze repository. Please check usage limits or try a simpler file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-white relative overflow-hidden">
            
            <GamificationBar xp={xp} level={level} streak={streak} />

             {/* Ambient Background Glows */}
             <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <section ref={inputRef} className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
                
                <div className="w-full max-w-5xl mx-auto space-y-12 pt-20">
                    <header className="text-center space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter"
                        >
                            <span className="text-white">Codex</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Flow</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto"
                        >
                            The Interactive Code Onboarding Engine
                        </motion.p>
                    </header>

                    <div className="relative z-20">
                    <RepoInput onAnalyze={handleAnalyze} loading={loading} />
                    </div>

                    <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl max-w-lg mx-auto text-center backdrop-blur-md"
                        >
                            {error}
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Achievements Showcase (Mini) */}
                    <div className="max-w-3xl mx-auto opacity-80 hover:opacity-100 transition-opacity">
                        <AchievementsView unlockedBadges={unlockedBadges} />
                    </div>
                </div>

                {data && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-10 animate-bounce cursor-pointer text-primary"
                        onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <ArrowDown size={32} />
                    </motion.div>
                )}
            </section>

            {/* Results Section */}
            {data && (
                <div ref={resultsRef} className="min-h-screen py-20 px-4 md:px-8 max-w-[1600px] mx-auto space-y-12 relative z-10">
                    
                    {/* Architecture Graph */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="glass-panel p-1 bg-surface/40"
                    >
                        <div className="p-6 border-b border-glass-border flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary box-shadow-glow">
                                <Layers size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">System Architecture</h2>
                                <p className="text-gray-400 text-sm">Interactive Dependency Visualization</p>
                            </div>
                        </div>
                        <div className="h-[70vh] bg-background/50 rounded-b-xl overflow-hidden relative">
                             {/* Graph Component */}
                            <GraphView initialNodes={data.graph.nodes} initialEdges={data.graph.edges} />
                        </div>
                    </motion.section>

                    {/* Interactive Learning Modules */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* Sidebar / Tabs */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="glass-panel p-6 sticky top-24">
                                <div className="flex items-center gap-3 mb-6 text-secondary">
                                    <GraduationCap size={28} />
                                    <h2 className="text-2xl font-bold text-white">Learning</h2>
                                </div>
                                
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setActiveTab('lesson')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeTab === 'lesson' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        <BookOpen size={20} /> Guide
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('flashcards')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeTab === 'flashcards' ? 'bg-accent/20 text-accent border border-accent/30 shadow-[0_0_15px_rgba(255,0,85,0.1)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        <Layers size={20} /> Flashcards
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('quiz')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${activeTab === 'quiz' ? 'bg-secondary/20 text-secondary border border-secondary/30 shadow-[0_0_15px_rgba(188,19,254,0.1)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                                    >
                                        <BrainCircuit size={20} /> Exam Mode
                                    </button>
                                </nav>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-9">
                            <div className="glass-panel p-1 min-h-[600px] relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'lesson' && (
                                        <motion.div
                                            key="lesson"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <LessonView chapters={data.chapters} />
                                        </motion.div>
                                    )}

                                    {activeTab === 'flashcards' && (
                                        <motion.div
                                            key="flashcards"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full flex items-center justify-center p-8"
                                        >
                                            <div className="w-full max-w-2xl">
                                            <FlashcardView
                                                quizData={data.quiz}
                                                onComplete={() => {
                                                    handleXpGain(50);
                                                    setActiveTab('quiz');
                                                }}
                                            />
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'quiz' && (
                                        <motion.div
                                            key="quiz"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full"
                                        >
                                            <QuizView quizData={data.quiz} onXpGain={handleXpGain} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.section>

                    <footer className="text-center pt-24 pb-8 text-gray-600 border-t border-white/5">
                        <p className="font-mono text-sm">NON-EVALUATIVE • PRIVATE • SECURE</p>
                        <p className="text-xs mt-2">Generated by CodexFlow AI • {new Date().getFullYear()}</p>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default Home;
