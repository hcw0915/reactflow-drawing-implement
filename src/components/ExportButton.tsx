import tw from 'twin.macro'
import styled from 'styled-components'
import useFlowStore from '@/stores/flowStore'
import { Button } from './Button'

const ExportButton = () => {
	const nodes = useFlowStore((state) => state.nodes)
	const edges = useFlowStore((state) => state.edges)
	const data = { nodes, edges }

	const handleExport = () => {
		const jsonData = JSON.stringify(data, null, 2) // 將數據轉換為 JSON 字符串
		console.log('🚀 ~ file: Export.jsx:6 ~ handleExport ~ jsonData:', data)

		// 創建一個 Blob 對象
		const blob = new Blob([jsonData], { type: 'application/json' })

		// 創建一個下載連結
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = 'exported_data.json'

		// 模擬點擊下載連結
		link.click()

		// 清理
		URL.revokeObjectURL(link.href)
	}

	return <Button onClickfn={handleExport}>Export</Button>
}

export default ExportButton
