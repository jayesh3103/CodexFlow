import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Trophy } from 'lucide-react';

const GamificationBar = ({ xp, level, streak }) => {
    const xpForNextLevel = 100 * level;
    const progress = Math.min((xp / xpForNextLevel) * 100, 100);

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 w-full z-50 pointer-events-none p-4"
        >
            <div className="max-w-4xl mx-auto flex items-center justify-between pointer-events-auto">
                {/* Level Badge */}
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-3 bg-slate-900/80 border-primary/30">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-primary to-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner border border-white/20">
                            {level}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Level</span>
                        <span className="text-sm font-bold text-white">{xp} XP</span>
                    </div>
                </div>

                {/* Progress Bar (Central) */}
                <div className="hidden md:flex flex-1 mx-8 flex-col max-w-xs">
                    <div className="flex justify-between text-xs text-gray-400 mb-1 px-1">
                        <span>Progress</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                            className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                        />
                    </div>
                </div>

                {/* Streak Counter */}
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 bg-slate-900/80 border-orange-500/30">
                    <Zap className={`${streak > 0 ? 'text-orange-400 fill-orange-400' : 'text-gray-600'} transition-colors`} size={20} />
                    <span className={`font-bold ${streak > 0 ? 'text-orange-100' : 'text-gray-500'}`}>
                        {streak} <span className="text-xs font-normal opacity-70">Streak</span>
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default GamificationBar;
