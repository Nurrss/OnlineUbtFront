import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../base/colors'

const ChoicesContainer = styled.div`
`;

const RadioLabel = styled.label`
`;

const RadioImage = styled.img`
`;

export const RadioExample = ({ answers }) => {
    

    return (
        <ChoicesContainer>
            {Object.entries(answers).map(([key, value]) => (
                <RadioLabel key={key}>
                    <input
                        type="radio"
                        value={value}
                        checked={selectedOption === value}
                        onChange={handleRadioChange}
                    />
                    {key} - {value}
                    {/* Optionally, display an image for each option */}
                    {/* You can use value to check if it's a URL or plain text */}
                    {typeof value === 'string' && value.startsWith('http') && <RadioImage src={value} alt={`Image for option ${key}`} />}
                </RadioLabel>
            ))}
        </ChoicesContainer>
    );
};

