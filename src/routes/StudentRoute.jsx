import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ExamResults } from '../pages/ExamResults/ExamResults';
import { TestPage } from '../pages/TestPage/TestPage';
import FilterExam from '../pages/FilterExam/FilterExam';
import Exams from '../pages/Exams';
import DoneExam from '../pages/DoneExams';
import StudentLayout from '../layouts/StudentLayout';

import GeneralProfile from '../pages/GeneralProfile/GeneralProfile';

const StudentRoutes = ({ navigateToLogin }) => {
  return (
    <StudentLayout navigateToLogin={navigateToLogin}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Exams />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/exam_results" element={<ExamResults />} />
        <Route path="/done_exams" element={<DoneExam />} />
        <Route path="/filter" element={<FilterExam />} />
        <Route path="/profile" element={<GeneralProfile />} />
      </Routes>
    </StudentLayout>
  );
};

export default StudentRoutes;
