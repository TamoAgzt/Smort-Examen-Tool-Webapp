export interface Account {
  Firstname: string;
  Lastname: string;
  Username: string;
  Password: string;
  Email: string;
  Class: string;
  Type: string;
}

export const Accounts: Account[] = [
  {
    Firstname: 'student',
    Lastname: 'bestaand',
    Username: '12345678',
    Password: '123',
    Email: '123456@vistacollage.nl',
    Class: 'AI444',
    Type: 'student',
  },
  {
    Firstname: 'examen',
    Lastname: 'coordinator',
    Username: 'examencoord',
    Password: '123',
    Email: 'examen@vistacollage.nl',
    Class: '',
    Type: 'examencoord',
  },
];
