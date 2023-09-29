import { useSearchParams } from "react-router-dom";
import { useFilterProjects } from "./useFilterProjects";
import { useProjects } from "./useProjects";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Data/Table";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Data/Empty";
import ProjectRow from "./ProjectRow";

import { projectCols } from "./ProjectParameters";

const filteredProjects = (
  allProjects,
  projects,
  filteredTextValue,
  filteredStatus
) => {
  if (!filteredTextValue && filteredStatus) {
    return allProjects.filter(
      (project) => project.project_status === filteredStatus
    );
  }
  if (filteredTextValue && !filteredStatus) {
    return allProjects.filter((project) =>
      project.project_name.trim().toLowerCase().includes(filteredTextValue)
    );
  }

  if (filteredTextValue && filteredStatus) {
    return allProjects
      .filter((project) => project.project_status === filteredStatus)
      .filter((project) =>
        project.project_name.trim().toLowerCase().includes(filteredTextValue)
      );
  }

  return projects;
};

const ProjectsTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, error, projects } = useFilterProjects();
  const { projects: allProjects } = useProjects();

  //filter results
  const filteredTextValue = searchParams.get("filterByText");
  // //filter by status
  const filteredStatus = searchParams.get("status");

  const shownProjects = filteredProjects(
    allProjects,
    projects,
    filteredTextValue,
    filteredStatus
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message}</p>;
  if (shownProjects.length === 0) return <Empty resource="projects" />;

  return (
    <>
      <Table
        cols={projectCols}
        columns="23rem 23rem 7rem 8rem 10rem repeat(2, 1fr) 10rem 10rem 10rem 4rem"
      >
        <Table.Header />

        <Table.Body
          data={shownProjects}
          renderItem={(project) => (
            <ProjectRow key={project.project_id} project={project} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination
          count={
            !!filteredTextValue || !!filteredStatus
              ? shownProjects.length
              : allProjects.length
          }
          resource="projects_per_page"
          filter={!!filteredTextValue || !!filteredStatus}
        />
      </Table.Footer>
    </>
  );
};

export default ProjectsTable;
