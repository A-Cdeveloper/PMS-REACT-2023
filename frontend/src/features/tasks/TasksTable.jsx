import { useSearchParams } from "react-router-dom";
import { useFilterTasks } from "./useFilterTasks";
import { useTasks } from "./useTasks";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Data/Table";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Data/Empty";
import TaskRow from "./TaskRow";

import { taskCols } from "./TaskParameters";

const filteredTasks = (allTasks, tasks, filteredTextValue, filteredStatus) => {
  if (!filteredTextValue && filteredStatus) {
    return allTasks.filter((task) => task.task_status === filteredStatus);
  }

  if (filteredTextValue && !filteredStatus) {
    return allTasks.filter((task) =>
      task.task_name.trim().toLowerCase().includes(filteredTextValue)
    );
  }

  if (filteredTextValue && filteredStatus) {
    return allTasks
      .filter((task) => task.task_status === filteredStatus)
      .filter((task) =>
        task.task_name.trim().toLowerCase().includes(filteredTextValue)
      );
  }

  return tasks;
};

const TasksTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, error, tasks } = useFilterTasks();
  const { tasks: allTasks } = useTasks();

  //filter results
  const filteredTextValue = searchParams.get("filterByText");
  //   // //filter by status
  const filteredStatus = searchParams.get("status");

  const shownTasks = filteredTasks(
    allTasks,
    tasks,
    filteredTextValue,
    filteredStatus
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (shownTasks.length === 0) return <Empty resource="tasks" />;

  return (
    <>
      <Table cols={taskCols} columns="30rem 26rem repeat(4, 1fr) 10rem 6rem">
        <Table.Header />
        <Table.Body
          data={shownTasks}
          renderItem={(task) => <TaskRow key={task.task_id} task={task} />}
        />
      </Table>
      <Table.Footer>
        <Pagination
          count={
            !!filteredTextValue || !!filteredStatus
              ? shownTasks.length
              : allTasks.length
          }
          resource="tasks_per_page"
          filter={!!filteredTextValue || !!filteredStatus}
        />
      </Table.Footer>
    </>
  );
};

export default TasksTable;