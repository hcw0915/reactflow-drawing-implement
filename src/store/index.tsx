import useFlowStore from './flowStore'

// 節點
export const nodes = useFlowStore((state) => state.nodes)

// 連線
export const edges = useFlowStore((state) => state.edges)

// 節點函數
export const setNodes = useFlowStore((state) => state.setNodes)

// 連線函數
export const setEdges = useFlowStore((state) => state.setEdges)

// 連線處理
export const handleConnect = useFlowStore((state) => state.handleConnect)

// 節點改變事件
export const handleNodesChange = useFlowStore(
	(state) => state.handleNodesChange
)

// 連線改變事件
export const handleEdgesChange = useFlowStore(
	(state) => state.handleEdgesChange
)

// 節點點擊事件
export const handleNodeClick = useFlowStore((state) => state.handleNodeClick)

// 節點雙點事件
export const handleNodeDoubleClick = useFlowStore(
	(state) => state.handleNodeDoubleClick
)

// 節點 Drag 事件
export const handleNodeDrag = useFlowStore((state) => state.handleNodeDrag)

// 節點 Drop 事件
export const handleNodeDrop = useFlowStore((state) => state.handleNodeDrop)

// 邊線點擊事件
export const handleEdgeClick = useFlowStore((state) => state.handleEdgeClick)
