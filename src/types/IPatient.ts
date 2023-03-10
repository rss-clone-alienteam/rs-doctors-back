export type Appointment = {
  doctorID: string;
  doctorName: string;
  day: string;
  time: string;
};

export default interface IPatient {
  id: string;
  name: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
  appointments: Array<Appointment>;
}
