export interface Exam {
  Image: string;
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
    Image:
      'https://torngems.nl/wp-content/uploads/2022/06/eotw_early_gameplay1.png',
    ExamName: 'one',
    Subject: 'engels',
    Class: 'ai444',
    Room: 'b2.10',
    Supervisor: 'mevr. vallinga',
    Date: '14/09/2023',
    Time: '10:00',
  },
  {
    Image: 'https://torngems.nl/wp-content/uploads/2023/08/Album-cover.png',
    ExamName: 'burgers',
    Subject: 'burgerschap',
    Class: 'ai444',
    Room: 'b2.07',
    Supervisor: 'mevr. wagemans',
    Date: '14/09/2023',
    Time: '12:30',
  },
  {
    Image: 'https://torngems.nl/wp-content/uploads/2023/06/Runaway1.png',
    ExamName: 'neue tag',
    Subject: 'duits',
    Class: 'ai444',
    Room: 'b1.01',
    Supervisor: 'dhr. derix',
    Date: '16/09/2023',
    Time: '09:00',
  },
  {
    Image: 'https://torngems.nl/wp-content/uploads/2023/08/Album-cover.png',
    ExamName: 'two',
    Subject: 'engels',
    Class: 'ai444',
    Room: 'b2.08',
    Supervisor: 'mevr. vallinga',
    Date: '14/09/2023',
    Time: '10:00',
  },
  {
    Image: 'https://torngems.nl/wp-content/uploads/2023/06/20220507.png',
    ExamName: 'one-two lezen',
    Subject: 'engels',
    Class: 'ai444',
    Room: 'b2.10',
    Supervisor: 'mevr. vallinga',
    Date: '29/09/2023',
    Time: '13:15',
  },
  {
    Image: 'https://torngems.nl/wp-content/uploads/2023/06/20220507.png',
    ExamName: 'prostate exam',
    Subject: 'biologie',
    Class: 'ab123',
    Room: 'b1.17',
    Supervisor: 'rick veltrop',
    Date: '21/09/2023',
    Time: '14:15',
  },
];
