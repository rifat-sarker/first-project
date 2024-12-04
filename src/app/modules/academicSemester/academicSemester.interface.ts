export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemesterName = 'Autmn' | 'Summar' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: 'Autmn' | 'Summar' | 'Fall';
  code: '01' | '02' | '03';
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
