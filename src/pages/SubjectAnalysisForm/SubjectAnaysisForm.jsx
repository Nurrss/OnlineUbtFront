// GradesTable.jsx
import React, { useState } from "react";
import QuestionDatabase from "../QuestionsBase/QuestionsBase";
import "./SubjectAnalysisForm.css"; // Make sure to create a corresponding CSS file for styling
import styled from "styled-components";
import { learned } from "../../data/data";

const ChangeButton = styled.button`
  color: #000;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: min-content;
  background-color: unset;
  font-size: 0.8rem;
`;

const SubjectAnalysisForm = () => {
  const [createExamVisible, setCreateExamVisible] = useState(false);
  const [editExamVisible, setEditExamVisible] = useState(false);

  // Replace with your actual data source
  const gradesData = [
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    {
      id: 1231,
      name: "Улдана",
      surname: "Адильбек",
      class: "11Ф",
      avgGrade: "23/50",
      exam1: "23/50",
      exam2: "23/50",
    },
    // ... more data
  ];
  //The logic of subject estimate table
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, gradesData.length);
  const visibleData = gradesData.slice(startIndex, endIndex);
  //The logic of theme learning
  const [currentPage2, setCurrentPage2] = useState(0);

  const startIndex2 = currentPage2 * itemsPerPage;
  const endIndex2 = Math.min(startIndex2 + itemsPerPage, learned.length);
  const visibleData2 = learned.slice(startIndex2, endIndex2);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
};

  const handleNextPage2 = () => {
    setCurrentPage2((prevPage) => prevPage + 1);
};

const handlePrevPage2 = () => {
    setCurrentPage2((prevPage) => Math.max(0, prevPage - 1));
};


const showCreateExam = () => {
  setCreateExamVisible(true);
};

const handleCreateExamCancel = () => {
  setCreateExamVisible(false);
};

const showEditExam = () => {
  setEditExamVisible(true);
};

const handleEditExamCancel = () => {
  setEditExamVisible(false);
};

  return (
    <div className="box">
      <div className="analyse_title">
        <h1 className="text-lg font-bold mb-4">Анализ предмета</h1>
      </div>
      <div className="grades-table-container">
        <h2>Оценка по предметам</h2>
        <div className="container-wrapper" 
        style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'end', borderRadius: '0 0 1rem 1rem', paddingTop: '1rem'}}
        >
          <div class="container">
            <div class="row table_row">
              <div class="col-1 table_items">ID</div>
              <div class="col-1 table_items">Имя</div>
              <div class="col-1 table_items">Фамилия</div>
              <div class="col-1 table_items">Класс</div>
              <div class="col-2 table_items">Средний балл</div>
              <div class="col-3 table_items">Результаты 1 экзамена</div>
              <div class="col-3 table_items">Результаты 2 экзамена</div>
            </div>
            {visibleData.map((grades, index) => (
              <div class="row table_row" key={index}>
                <div class="col-1 table_items">{index + 1}</div>
                <div class="col-1 table_items">{grades.name}</div>
                <div class="col-1 table_items">{grades.surname}</div>
                <div class="col-1 table_items">{grades.class}</div>
                <div class="col-2 table_items">{grades.avgGrade}</div>
                <div class="col-3 table_items">{grades.exam1}</div>
                <div class="col-3 table_items">{grades.exam2}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ChangeButton onClick={handlePrevPage} disabled={currentPage === 0}>
            {'<'} 
          </ChangeButton>
          <ChangeButton onClick={handleNextPage} disabled={endIndex >= gradesData.length || visibleData.length === 0}>
            {'>'}
          </ChangeButton>
        </div>
      </div>
      <div className="base_container">
          <div class="container">
            <div class="row table_row">
              <div class="col-1 table_items">#</div>
              <div class="col-4 table_items">Название темы</div>
              <div class="col-2 table_items">Количество участников</div>
              <div class="col-2 table_items">Полностью усвоили</div>
              <div class="col-2 table_items">Усвоено</div>
            </div>
            {visibleData2.map((topic, index) => (
              <div class="row table_row" key={index}>
                <div class="col-1 table_items">{index + 1}</div>
                <div class="col-4 table_items">{topic.name}</div>
                <div class="col-2 table_items">{topic.participantCount}</div>
                <div class="col-2 table_items">{topic.totallyLearned}</div>
                <div class="col-2 table_items">{topic.learned}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ChangeButton onClick={handlePrevPage2} disabled={currentPage2 === 0}>
                {'<'}
              </ChangeButton>
              <ChangeButton onClick={handleNextPage2} disabled={endIndex2 >= learned.length || visibleData.length === 0}>
                {'>'}
              </ChangeButton>
            </div>
        </div>
    </div>
  );
};

export default SubjectAnalysisForm;
