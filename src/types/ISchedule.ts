type ITimes = {
  [key: string]: Array<string>;
};

export default interface ISchedule {
  id: string;
  schedule: ITimes;
}
