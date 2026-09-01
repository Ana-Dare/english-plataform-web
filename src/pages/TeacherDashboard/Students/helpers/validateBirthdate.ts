export const isValidBirthdate = (value: string) => {
  if (!value) return false;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) return false;
  const age = today.getFullYear() - date.getFullYear();
  return age >= 3 && age <= 100;
};
