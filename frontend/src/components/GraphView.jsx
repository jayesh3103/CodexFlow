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

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full relative group h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0f1e]"
        >
            {/* Tech Header */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full border-primary/20">
                    <div className="p-1.5 rounded-full bg-primary/10 text-primary animate-pulse">
                        <Network size={16} />
                    </div>
                    <span className="text-sm font-bold text-white tracking-widest uppercase">System Map</span>
                </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 z-10 glass-panel p-4 rounded-xl pointer-events-auto border-white/5 bg-black/60 backdrop-blur-xl">
                 <div className="text-[10px] uppercase font-bold text-gray-500 mb-2 tracking-wider">Node Types</div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                        <span className="text-xs text-gray-300 font-mono">File</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(188,19,254,0.5)]"></span>
                         <span className="text-xs text-gray-300 font-mono">Function</span>
                    </div>
                 </div>
            </div>
            
            <div className="w-full h-full"> 
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    attributionPosition="bottom-right"
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color="#334155" gap={30} size={1} />
                    <Controls className="bg-black/50 border border-white/10 rounded-lg overflow-hidden fill-gray-400 [&>button]:border-b [&>button]:border-white/5 hover:[&>button]:bg-white/10 hover:[&>button]:text-white transition-colors" />
                </ReactFlow>
            </div>
        </motion.div>
    );
};

export default GraphView;
