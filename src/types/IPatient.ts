export type Appointment = {
  doctorID: string;
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
