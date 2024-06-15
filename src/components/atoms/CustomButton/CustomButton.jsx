import { Button } from 'antd'
import styled from 'styled-components'
import css from 'styled-components'
import { ButtonSizeStyles } from './ButtonTemplate'

const SimpleButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${({ sizeType }) => ButtonSizeStyles[sizeType]}
`

export const CustomButton = ({ sizeType, children, onClick, color, bgColor, width }) => {
    return (
        <SimpleButton 
        sizeType={sizeType} onClick={onClick} style={{backgroundColor: `${bgColor}`, color: `${color}`, width: `${width}`}}>{ children }</SimpleButton>
    )
}