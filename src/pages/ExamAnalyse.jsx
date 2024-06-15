// ExamAnalyse.js
import React, { useState } from 'react';
import { AnalyseTotal } from '../components/organism/AnalyseTotal/AnalyseTotal';
import { AnalyseSubjects } from '../components/organism/AnalyseSubjects/AnalyseSubjects';
import { AnalyseThemes } from '../components/organism/AnalyseThemes/AnalyseThemes';

export const ExamAnalyse = () => {
  const [chosenPart, setChosenPart] = useState('public');

  const handlePartChange = (part) => {
    setChosenPart(part);
  };

  const renderElements = () => {
    switch (chosenPart) {
      case 'public':
        return <AnalyseTotal onPartChange={handlePartChange} />;
      case 'subjects':
        return <AnalyseSubjects onPartChange={handlePartChange} />;
      case 'themes':
        return <AnalyseThemes onPartChange={handlePartChange} />;
      default:
        return <p>Something went wrong, please try again</p>;
    }
  };

  return <div>{renderElements()}</div>;
};
