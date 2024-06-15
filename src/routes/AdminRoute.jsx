import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AnalysisExam } from '../pages/AnalysisExam/AnalysisExam';
import GeneralProfile from '../pages/GeneralProfile/GeneralProfile';
import { Students } from '../pages/StudentsTable/StudentsTable';
import { Teachers } from '../pages/TeachersTable/TeachersTable';
import DoneExam from '../pages/DoneExams';
import { ExamAnalyse } from '../pages/ExamAnalyse';
import AdminLayout from '../layouts/AdminLayout';
import Subjects from '../pages/Subjects/Subjects';

const AdminRoutes = ({ navigateToLogin }) => {
  return (
    <AdminLayout navigateToLogin={navigateToLogin}>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/exam_analyse" element={<ExamAnalyse />} />
        <Route path="/profile" element={<GeneralProfile />} />
        <Route path="/exams_admin" element={<AnalysisExam />} />
        <Route path="/students_done_exam" element={<DoneExam />} />
        <Route path="/profile" element={<GeneralProfile />} />
        <Route path="/students" element={<Students />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
