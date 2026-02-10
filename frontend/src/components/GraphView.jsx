import React, { useMemo } from 'react';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const GraphView = ({ initialNodes, initialEdges }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || []);

    // Custom coloring for nodes based on type could be added here if we had custom node types
    // For MVP, we'll stick to default but style the container heavily

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full relative group"
        >
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 z-10 glass-panel px-4 py-2 rounded-lg flex items-center gap-2 pointer-events-none">
                <Network className="text-primary" size={18} />
                <span className="text-sm font-semibold text-gray-200">Dependency Graph</span>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-10 glass-panel p-3 rounded-lg pointer-events-none space-y-2 text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-400"></span>
                    <span className="text-gray-300">File / Module</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-100 border border-secondary shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                    <span className="text-gray-300">Functions / Classes</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-100 border border-red-500"></span>
                    <span className="text-gray-300">Imports</span>
                </div>
            </div>

            <div className="h-[600px] bg-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden shadow-inner relative">
                {/* Grid Pattern Overlay for tech feel */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    attributionPosition="bottom-right"
                >
                    <Background color="#3b82f6" gap={24} size={1} variant="dots" className="opacity-20" />
                    <Controls className="bg-surface border border-white/10 rounded-lg overflow-hidden fill-white" />
                </ReactFlow>
            </div>
        </motion.div>
    );
};

export default GraphView;
