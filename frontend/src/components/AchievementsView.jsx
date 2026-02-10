import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, BookOpen, BrainCircuit } from 'lucide-react';

const BADGES = {
    first_analysis: { icon: Award, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", label: "Explorer" },
    streak_master: { icon: Zap, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", label: "On Fire!" },
    scholar: { icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", label: "Scholar" },
    quiz_wiz: { icon: BrainCircuit, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", label: "Quiz Wiz" }
};

const AchievementsView = ({ unlockedBadges }) => {
    return (
        <div className="glass-panel p-6 rounded-2xl border-white/5">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="text-yellow-400" /> Achievements
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(BADGES).map(([id, badge]) => {
                    const isUnlocked = unlockedBadges.includes(id);
                    const Icon = badge.icon;

                    return (
                        <div
                            key={id}
                            className={`relative p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300 ${isUnlocked
                                    ? `${badge.bg} ${badge.border} opacity-100 scale-100`
                                    : 'bg-gray-800/50 border-gray-700 opacity-50 grayscale scale-95'
                                }`}
                        >
                            <div className={`p-3 rounded-full ${isUnlocked ? 'bg-white/10' : 'bg-gray-700'}`}>
                                <Icon className={isUnlocked ? badge.color : 'text-gray-500'} size={24} />
                            </div>
                            <span className={`text-sm font-bold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                {badge.label}
                            </span>
                            {isUnlocked && (
                                <motion.div
                                    layoutId="outline"
                                    className="absolute inset-0 rounded-xl border-2 border-white/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AchievementsView;
