export const questionAnswers = {
  questionsBySubject: {
    'Оқу сауаттылығы': [
      {
        _id: '6662970a20b81d1a4f9089d2',
        questionNumber: 1,
        question: 'Диас деген кім?',
        image: 'blob:http://localhost:5173/522a34b6-c537-49e9-ac0b-dbf0fab2c136',
        options: [
          { _id: '6662970920b81d1a4f9089ca', text: 'кофе' },
          { _id: '6662970920b81d1a4f9089cc', text: 'ғарышкер' },
          { _id: '6662970920b81d1a4f9089ce', text: 'мұғалім' },
          { _id: '6662970920b81d1a4f9089d0', text: 'IT professor' }
        ],
        point: 1,
        type: 'onePoint'
      },
      {
        _id: '6662998c20b81d1a4f9089e7',
        questionNumber: 2,
        question: 'Кто такой Диас',
        image: 'blob:http://localhost:5173/611b4bf0-e97c-4031-87e6-f5c9cc1eded0',
        options: [
          { _id: '6662998b20b81d1a4f9089df', text: 'ракета' },
          { _id: '6662998b20b81d1a4f9089e1', text: 'Профессор IT' },
          { _id: '6662998b20b81d1a4f9089e3', text: 'учитель' },
          { _id: '6662998b20b81d1a4f9089e5', text: 'учительница' }
        ],
        point: 1,
        type: 'onePoint'
      }
    ],
    'Математикалық сауаттылық': [],
    'Қазақстан тарихы': [
      {
        _id: '6662a6848d370315ae5bde7c',
        questionNumber: 1,
        question: 'Первый хан ',
        image: 'blob:http://localhost:5173/c19d18f3-e58a-408b-8cd4-48b3d38a3cd7',
        options: [
          { _id: '6662a6838d370315ae5bde74', text: 'Керей' },
          { _id: '6662a6838d370315ae5bde76', text: 'Диас' },
          { _id: '6662a6838d370315ae5bde78', text: 'ф' },
          { _id: '6662a6848d370315ae5bde7a', text: 'а' }
        ],
        point: 1,
        type: 'onePoint'
      }
    ],
    Математика: [],
    'Қазақ тілі': [],
    'Орыс тілі': []
  },
  resultId: '66656b32255b4f732e0b5984'
};

export const getSubjects = () => Object.keys(questionAnswers.questionsBySubject);
export const getQuestions = (subject) => questionAnswers.questionsBySubject[subject] || [];
