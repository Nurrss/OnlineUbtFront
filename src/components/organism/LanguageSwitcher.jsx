// src/components/LanguageSwitcher.js
import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button
      style={{ padding: '.5rem', backgroundColor: '#009172', color: '#fff' }}
      onClick={toggleLanguage}
    >
      {language === 'kz' ? 'RU' : 'KZ'}
    </button>
  );
};

export default LanguageSwitcher;
