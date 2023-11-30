import { useProjects } from "../features/projects/useProjects";
import { statusColors } from "../styles/theme";

export const useProjectsChart = () => {
  const { projects } = useProjects();

  let data = [];

  projects.map((pro) => {
    const obj = {
      name:
        pro.project_status.slice(0, 1).toUpperCase() +
        pro.project_status.slice(1),
      value: 1,
      fill: statusColors[pro.project_status],
    };
    return data.find((el) => el.name === obj.name)
      ? data[data.findIndex((el) => el.name === obj.name)].value++
      : data.push(obj);
  });

  // const data = [
  //   { name: "future", value: 2, fill: "pink" },
  //   { name: "working", value: 1, fill: "blue" },
  //   { name: "online", value: 176, fill: "info" },
  //   { name: "archive", value: 42, fill: "danger" },
  // ];

  return { data };
};
