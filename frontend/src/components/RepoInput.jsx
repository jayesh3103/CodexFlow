import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileCode, Github, Sparkles } from 'lucide-react';

const RepoInput = ({ onAnalyze, loading }) => {
    const [url, setUrl] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url && filePath) {
            onAnalyze(url, filePath);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto text-center"
        >
            <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-70"></div>

                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all duration-700"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px] group-hover:bg-accent/30 transition-all duration-700"></div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-6"
                    >
                        <Sparkles size={14} />
                        <span>AI-Powered Code Analysis</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Understand Code
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent ml-2">
                            Instantly
                        </span>
                    </h2>

                    <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                        Turn any GitHub file into an interactive lesson. varied dependency graphs, smart explanations, and auto-generated quizzes.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Github className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://github.com/owner/repo"
                                className="glass-input w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FileCode className="h-5 w-5 text-gray-500 group-focus-within:text-accent transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={filePath}
                                onChange={(e) => setFilePath(e.target.value)}
                                placeholder="path/to/file.py"
                                className="glass-input w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-accent/50 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] ${loading
                                    ? 'bg-surface border border-white/10 cursor-not-allowed text-gray-400'
                                    : 'bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg hover:shadow-primary/25 border border-primary/50'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    Analyzing Codebase...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Generate Onboarding Guide <Search size={20} />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default RepoInput;
