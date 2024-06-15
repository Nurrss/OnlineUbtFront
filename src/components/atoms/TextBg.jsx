import React from "react";
import styled from "styled-components";

const BgTextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 3px 25px;
    border-radius: 7px;
    /* gap: 10px; */
    
`

export const TextWithBg = ({bgColor, children, color, padding}) => {
    return (
        <BgTextWrapper style={{backgroundColor: `${bgColor}`, color: `${color}`, padding: `${padding}`}}>
            {children}
        </BgTextWrapper>
    )
}