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
	size: 'small' | 'medium' | 'large'
}

const SubRoadContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
	${tw`flex items-center bg-[#FFE599] font-mono border-black min-h-[30px] h-full text-[12px] border-[2px] rounded-sm  px-3`}
	box-shadow: 4px 4px 4px #888888;
	&:hover {
		${tw`bg-[#F3C950]`}
	}
	${({ size }) => {
		if (size === 'small') return `min-width:80px`
		if (size === 'medium') return `min-width:150px`
		if (size === 'large') return `min-width:220px`
	}}
`

const TextContainer = styled.div`
	${tw`leading-[12px] m-auto`}
`

const StyledHandle = styled(Handle)<{ ishover: string }>`
	${tw`bg-red-400 opacity-0`}

	opacity: ${({ ishover }) => (ishover === 'true' ? '1' : '0')}
`

export const SubRoad_Small = memo(
	({ data, isConnectable, size }: CustomData) => {
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

		return (
			<SubRoadContainer
				size={'small'}
				onMouseEnter={handleNodesIn}
				onMouseLeave={handleNodesOut}
			>
				<TextContainer>{data?.label || 'default'}</TextContainer>
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
			</SubRoadContainer>
		)
	}
)
