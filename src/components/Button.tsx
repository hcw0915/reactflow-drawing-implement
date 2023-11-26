import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type ButtonProps = {
	children: React.ReactNode
	onClick: () => void
}

const ButtonContainer = styled.button`
	${tw`bg-gray-700 text-white text-lg p-2 mx-3 my-1 rounded-r-3xl w-full `}
	&:hover {
		${tw`bg-gray-300 text-black`}
	}
`

export const Button = ({ children, onClick }: ButtonProps) => {
	return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>
}
