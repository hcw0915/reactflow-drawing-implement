import React from 'react'

export type RoadMapNodes = {
	id: string
	label: string
	type: 'primary' | 'secondary' | 'button' | 'textarea'
	image: string
	bgColor: string
	component: React.ReactNode
	title?: string
	content?: string
	sourcePosition?: 'RIGHT' | 'LEFT' | 'TOP' | 'BOTTOM'
}

export type ConnectData = {
	source: string
	sourceHandle: any
	target: string
	targetHandle: any
}
