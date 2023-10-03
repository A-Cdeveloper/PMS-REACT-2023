import { API_URL } from "../utils/constants";

export const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

//////////////////////////////////////////////////////////////////
export const getTasks = async ({ startIntervalDate, endIntervalDate }) => {
  const response = await fetch(
    `${API_URL}/tasks/${startIntervalDate}/${endIntervalDate}`
  );
  const data = await response.json();

  if (response.status === 404) {
    throw new Error("Tasks list could't be loaded!");
  }

  if (response.status === 400) {
    throw new Error(data.message);
  }

  return data;
};

// //////////////////////////////////////////////////////////////////
export const getFilteredTasks = async ({
  page,
  perPage,
  startIntervalDate,
  endIntervalDate,
}) => {
  let from = 0;
  let response;
  if (page) {
    from = (page - 1) * perPage;
  }
  response = await fetch(
    `${API_URL}/tasks/filter/${from}/${perPage}/${startIntervalDate}/${endIntervalDate}`
  );

  const data = await response.json();

  if (response.status === 404) {
    throw new Error("Tasks list could't be loaded!");
  }

  if (response.status === 400) {
    throw new Error(data.message);
  }

  //await wait(3000);
  return data;
};