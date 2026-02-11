import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileCode, Github, Sparkles } from 'lucide-react';

const RepoInput = ({ onAnalyze, loading }) => {
    const [url, setUrl] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAnalyze(url, filePath);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto my-20 px-4"
        >
            <div className="relative group perspective-1000">
                {/* Glow Effects */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-2xl group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="glass-panel p-10 relative overflow-hidden backdrop-blur-3xl bg-surface/40 border border-white/5">
                    
                    {/* Floating Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>

                    <div className="relative z-10 text-center space-y-8">
                        
                        <div className="space-y-4">
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-primary uppercase"
                            >
                                AI-Powered Code Analysis
                            </motion.span>
                            
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                                <span className="text-white">Decode</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary ml-4">
                                    Reality
                                </span>
                            </h1>
                            
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                                Transform purely textual codebases into interactive visual lessons. 
                                <br className="hidden md:block"/>
                                Experience code in a new dimension.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative group/input">
                                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within/input:text-primary transition-colors duration-300" />
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="github.com/owner/repo"
                                        className="w-full bg-background/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-300 outline-none"
                                        required
                                    />
                                </div>
                                <div className="relative group/input">
                                    <FileCode className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within/input:text-secondary transition-colors duration-300" />
                                    <input
                                        type="text"
                                        value={filePath}
                                        onChange={(e) => setFilePath(e.target.value)}
                                        placeholder="path/to/file.py"
                                        className="w-full bg-background/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all duration-300 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative group overflow-hidden rounded-xl bg-white text-black p-4 font-bold text-lg tracking-wide transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                            Initializing Neural Link...
                                        </>
                                    ) : (
                                        <>
                                            Initiate Analysis <Sparkles className="w-5 h-5" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RepoInput;
