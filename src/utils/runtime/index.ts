export const getEnvVariable = (variable: string): string => {
  const data = process.env[variable];
  if (!data) {
    throw new Error(`variable with name ${variable} is not configured`);
  }
  return data;
};