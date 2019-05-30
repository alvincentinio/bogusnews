export const formatDate = date => {
  const newDate = new Date(date).toString();
  const back = newDate.slice(0, 15);
  const front = newDate.slice(16, 25);
  return front + " on " + back;
};
