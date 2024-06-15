import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import QuestionDatabase from "../pages/QuestionsBase/QuestionsBase";
import { TaskAdding } from "../pages/TaskAdding/TaskAdding";
import Table from '../pages/MyClass/MyClass'
import SubjectAnalysisForm from "../pages/SubjectAnalysisForm/SubjectAnaysisForm";
import TeacherLayout from '../layouts/TeacherLayout'
import DoneExam from "../pages/DoneExams";
import { ExamResults } from "../pages/ExamResults/ExamResults";
import GeneralProfile from "../pages/GeneralProfile/GeneralProfile";

const TeacherRoutes = ({navigateToLogin}) => {
    return(
        <TeacherLayout navigateToLogin={navigateToLogin}>
            <Routes>
                <Route path='*' element={<NotFoundPage />}/>
                <Route path='/my_class' element={<Table />}/>
                <Route path='/question_base' element={<QuestionDatabase />}/>
                <Route path='/subject_analyse' element={<SubjectAnalysisForm />}/>
                <Route path='/new_task' element={<TaskAdding />}/>
                <Route path='/done_exams' element={<DoneExam />}/>
                <Route path='/exam_results' element={<ExamResults />}/>
                <Route path="/profile" element={<GeneralProfile />}/>
            </Routes>
        </TeacherLayout>
    )
}

export default TeacherRoutes;