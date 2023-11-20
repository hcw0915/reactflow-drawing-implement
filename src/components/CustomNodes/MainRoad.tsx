import { ConnectData } from '@/types'
import React, { memo, useState } from 'react'
import { Handle, OnConnect, Position } from 'reactflow'
import styled from 'styled-components'
import tw from 'twin.macro'
import svg from '@/assets/react.svg'

type CustomData = {
	data?: {
		label?: string
		description?: string
	}
	isConnectable?: boolean
}

const MainRoadContainer = styled.div`
	${tw`flex items-center bg-[#FFFF00] font-mono border-black min-h-[40px] h-full min-w-[150px] text-[16px] border-[2px] rounded-sm px-3`}
	box-shadow: 4px 4px 4px #888888;
	&:hover {
		${tw`bg-[#D6D700]`}
	}
`

const TextContainer = styled.div`
	${tw`leading-[17px] m-auto`}
`

const StyledHandle = styled(Handle)<{ ishover: string }>`
	${tw`bg-red-400 opacity-0`}

	opacity: ${({ ishover }) => (ishover === 'true' ? '1' : '0')}
`

export const MainRoad = memo(({ data, isConnectable }: CustomData) => {
	/* console.log(data, isConnectable) */
	const [isHover, setIsHover] = useState(false)

	const handleNodesIn = () => {
		setIsHover(true)
	}
	const handleNodesOut = () => {
		setIsHover(false)
	}

	const handleConnectSuccess: OnConnect = (params) => {
		console.log('handle onConnect', params)
	}
	/* <img src={svg} alt="" width={30} height={30} /> */

	return (
		<MainRoadContainer
			onMouseEnter={handleNodesIn}
			onMouseLeave={handleNodesOut}
		>
			<TextContainer>{data?.label || '<default>'}</TextContainer>
			<StyledHandle
				type="source"
				position={Position.Top}
				ishover={isHover.toString()}
				onConnect={handleConnectSuccess}
				isConnectable={isConnectable}
				id="a"
			/>
			<StyledHandle
				type="source"
				position={Position.Bottom}
				id="b"
				ishover={isHover.toString()}
				isConnectable={isConnectable}
			/>
			<StyledHandle
				type="source"
				position={Position.Left}
				id="c"
				ishover={isHover.toString()}
				isConnectable={isConnectable}
			/>
			<StyledHandle
				type="source"
				position={Position.Right}
				id="d"
				ishover={isHover.toString()}
				isConnectable={isConnectable}
			/>
			{/* <Handle
				type="source"
				position={Position.Right}
				id="b"
				style={{ bottom: 10, top: 'auto', background: '#555' }}
				isConnectable={isConnectable}
			/> */}
		</MainRoadContainer>
	)
})

/**
Waring from ReactFlowProvider
VM1669:1 Warning: Received `false` for a non-boolean attribute `ishover`.
If you want to write it to the DOM, pass a string instead: ishover="false" or ishover={value.toString()}.
If you used to conditionally omit it with ishover={condition && value}, pass ishover={condition ? value : undefined} instead.

*/
