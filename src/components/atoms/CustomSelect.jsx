import React from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';

const StyledSelect = styled(Select)`
  width: ${props => (props.width ? `${props.width}` : '100%')};
  height: 100%;

  @media screen and (width: 1540px){
    
  }
`;


export const ChooseSubject = ({ options, iconWidth, defaultValue, onSelect }) => {
  const [selectedSubject, setSelectedSubject] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
    onSelect(selectedOption)
  };

  return (
    <StyledSelect
      defaultValue={defaultValue}
      width={iconWidth}
      onChange={handleChange}
      options={options}
    />
  );
};