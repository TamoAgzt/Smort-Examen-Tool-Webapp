export interface Exam {
  ExamName: string;
  Subject: string;
  Class: string;
  Room: string;
  Supervisor: string;
  Date: string;
  Time: string;
}

export const Exams: Exam[] = [
  {
    ExamName: 'one',
    Subject: 'engels',
    Class: 'ai444',
    Room: 'b2.10',
    Supervisor: 'mevr. vallinga',
    Date: '14/09/2023',
    Time: '10:00',
  },
  {
    ExamName: 'burgers',
    Subject: 'burgerschap',
    Class: 'ai444',
    Room: 'b2.07',
    Supervisor: 'mevr. wagemans',
    Date: '14/09/2023',
    Time: '12:30',
  },
  {
    ExamName: 'neue tag',
    Subject: 'duits',
    Class: 'ai444',
    Room: 'b1.01',
    Supervisor: 'dhr. derix',
    Date: '16/09/2023',
    Time: '09:00',
  },
  {
    ExamName: 'two',
    Subject: 'engels',
    Class: 'ai444',
    Room: 'b2.08',
    Supervisor: 'mevr. vallinga',
    Date: '14/09/2023',
    Time: '10:00',
  },
  {
    ExamName: 'one-two lezen',
    Subject: 'engels',
    Class: 'ai444',
    Room: 'b2.10',
    Supervisor: 'mevr. vallinga',
    Date: '29/09/2023',
    Time: '13:15',
  },
];
