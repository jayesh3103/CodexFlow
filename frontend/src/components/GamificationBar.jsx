import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Star } from 'lucide-react';

const GamificationBar = ({ xp, level, streak }) => {
    // XP calculation: each level needs 100 * level XP
    const xpForNextLevel = 100 * level;
    const progress = Math.min((xp / xpForNextLevel) * 100, 100);

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-4 left-0 w-full z-50 pointer-events-none flex justify-center px-4"
        >
            <div className="pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-6 md:gap-12 w-full max-w-4xl relative overflow-hidden group">
                
                {/* Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-50 pointer-events-none"></div>

                {/* Level / XP Section */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.3)] border border-white/20">
                            <span className="text-xl font-black text-white">{level}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-black rounded-full border border-gray-700 p-0.5">
                            <Trophy size={10} className="text-yellow-400" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Current Level</span>
                        <span className="text-sm font-bold text-white font-mono">{xp} <span className="text-gray-500">/ {xpForNextLevel} XP</span></span>
                    </div>
                </div>

                {/* Progress Bar (Central) - Hidden on mobile */}
                <div className="hidden md:flex flex-1 flex-col gap-1.5 relative z-10 group/bar">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        <span>Progress</span>
                        <span className="text-primary">{Math.floor(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                        {/* Glow effect under the bar */}
                        <motion.div 
                            className="absolute top-0 left-0 h-full bg-primary/50 blur-[4px]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 40 }}
                            className="h-full bg-gradient-to-r from-primary via-blue-500 to-secondary relative"
                        >
                            {/* Shimmer effect */}
                            <div className="absolute top-0 right-0 h-full w-2 bg-white/50 blur-[2px] animate-pulse"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Streak Counter */}
                <div className="flex items-center gap-3 relative z-10 pl-6 border-l border-white/10">
                   <div className={`p-2 rounded-lg border ${streak > 0 ? 'bg-orange-500/10 border-orange-500/20 shadow-[0_0_15px_rgba(255,165,0,0.15)]' : 'bg-gray-800/50 border-white/5'} transition-all`}>
                        <Zap size={20} className={`${streak > 0 ? 'text-orange-400 fill-orange-400 animate-pulse' : 'text-gray-600'}`} />
                   </div>
                    <div className="flex flex-col">
                         <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Daily Streak</span>
                         <span className={`text-lg font-black ${streak > 0 ? 'text-orange-100' : 'text-gray-600'} leading-none`}>
                            {streak} <span className="text-xs font-medium opacity-50">DAYS</span>
                        </span>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default GamificationBar;
