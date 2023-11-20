import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type ButtonProps = {
	children: React.ReactNode
	onClickfn: () => void
}

const ButtonContainer = styled.button`
	${tw`bg-amber-500 text-lg p-3 rounded-xl`}
`

export const Button = ({ children, onClickfn }: ButtonProps) => {
	return <ButtonContainer onClick={onClickfn}>{children}</ButtonContainer>
}
