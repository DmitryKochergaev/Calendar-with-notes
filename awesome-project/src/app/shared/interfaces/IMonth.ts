export interface IMonth {
  name: string;
  id: string;
  days: IDay[];
}

export interface IDay {
  day: number;
  plans?: IPlan[];
}

export interface IPlan {
  icon: string;
  header: string;
  text: string;
}
