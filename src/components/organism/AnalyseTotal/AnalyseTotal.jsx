// AnalyseTotal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from '../../atoms/CustomText/CustomText';
import excelIcon from '../../../assets/img/excel.png';
import { colors } from '../../../base/colors';
import { ChooseSubject } from '../../atoms/CustomSelect';
import { ColumnChart } from '../../../pages/ColumnChart';
import { studentsData, subjectArr } from '../../../data/data';
import { CustomButton } from '../../atoms/CustomButton/CustomButton';
import { PointChart } from '../../../pages/PointChart';
import styles from './AnalyseTotal.module.css';

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f7f7f7;
  color: #000;
`;

const ChangeButton = styled.button`
  color: #000;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: min-content;
  background-color: unset;
`;

export const AnalyseTotal = ({ onPartChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredAndSortedStudents = studentsData
    .filter((student) => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.point - a.point);

  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredAndSortedStudents.length);
  const visibleData = filteredAndSortedStudents.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reset page when searching
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const rangeText = `${startIndex + 1}-${endIndex} из ${filteredAndSortedStudents.length}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '2rem' }}>
      <div className={styles.titleContainer}>
        <Text fontSize="30px" weight="bold">
          Анализ экзамена
        </Text>
        <div className={styles.buttonsContainer}>
          <div className={styles.buttonContainer}>
            <Button onClick={() => onPartChange('public')}>Общие</Button>
            <Button onClick={() => onPartChange('subjects')}>Предметы</Button>
            <Button onClick={() => onPartChange('themes')}>Темы</Button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', padding: '1rem' }}>
        <div className={styles.twoTextButton}>
          <Text>Средний балл</Text>
          <Text>59/140</Text>
        </div>
        <div className={styles.twoTextButton}>
          <Text>Средний балл</Text>
          <Text>59/140</Text>
        </div>
        <div className={styles.twoTextButton}>
          <Text>Средний балл</Text>
          <Text>59/140</Text>
        </div>
      </div>
      <div className={styles.filterContent}>
        <Text>Топ 10 по предмету</Text>
        <ChooseSubject iconWidth="10rem" options={subjectArr} />
        <Text>и среди классов</Text>
        <ChooseSubject iconWidth="10rem" options={subjectArr} />
        <Text>INNOVERSE SCHOOL</Text>
      </div>
      <ColumnChart />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.tableHeader}>
          <div className={styles.twoElementContainer}>
            <input
              style={{ padding: '0 1rem', borderRadius: '0.5rem' }}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search by name"
            />
            <CustomButton
              bgColor={colors.white}
              color={colors.black}
              onClick={handleSearch}
              width="7rem"
            >
              Искать
            </CustomButton>
          </div>
          <div className={styles.twoElementContainer}>
            <CustomButton bgColor={colors.white} color={colors.black} width="7rem">
              Общие
            </CustomButton>
            <CustomButton bgColor={colors.white} color={colors.black} width="7rem">
              Детальные баллы
            </CustomButton>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
            alignItems: 'end',
            backgroundColor: '#f7f7f7',
            borderRadius: '0 0 1rem 1rem',
            padding: '1rem'
          }}
        >
          <div className="container">
            <div className="row table_row">
              <div className="col-1 table_items">#</div>
              <div className="col-4 table_items">Имя фамилия</div>
              <div className="col-2 table_items">Средний балл</div>
              <div className="col-2 table_items">Класс</div>
              <div className="col-2 table_items">Действия</div>
            </div>
            {visibleData.map((studentsData, index) => (
              <div className="row table_row" key={index}>
                <div className="col-1 table_items">{startIndex + index + 1}</div>
                <div className="col-4 table_items">{studentsData.name}</div>
                <div className="col-2 table_items">{studentsData.point}</div>
                <div className="col-2 table_items">{studentsData.group}</div>
                <div className="col-2 table_items">Подробнее</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Text>{rangeText}</Text>
            <ChangeButton onClick={handlePrevPage} disabled={currentPage === 0}>
              {'<'}
            </ChangeButton>
            <ChangeButton
              onClick={handleNextPage}
              disabled={endIndex >= filteredAndSortedStudents.length || visibleData.length === 0}
            >
              {'>'}
            </ChangeButton>
          </div>
        </div>
      </div>
      <PointChart />
    </div>
  );
};
