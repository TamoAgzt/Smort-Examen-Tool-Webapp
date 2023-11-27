export interface ExamSchedule {
    agendaItem: {
      klas_Id: number;
      examen_Id: number;
      lokaal_Id: number;
      tijd_Begin: string;
      tijd_Einden: string;
    };
    examenItem: {
      toezichthouders_Id: number;
      naam_Examen: string;
      vak_Examen: string;
    };
    toezichterhouders: {
      naam: string;
      achternaam: string;
    }[];
    lokaal:string
  }