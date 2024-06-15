// AnalyseThemes.js
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  width: 20rem;
  height: 2rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f7f7f7;
  color: #000;
`;

export const AnalyseThemes = ({ onPartChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '2rem' }}>
    <ButtonContainer>
      <Button onClick={() => onPartChange('public')}>Общие</Button>
      <Button onClick={() => onPartChange('subjects')}>Предметы</Button>
      <Button onClick={() => onPartChange('themes')}>Темы</Button>
    </ButtonContainer>
    <p>This is AnalyseThemes page</p>
  </div>
);
