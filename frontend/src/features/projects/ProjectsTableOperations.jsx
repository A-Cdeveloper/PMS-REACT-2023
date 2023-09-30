import TableOperations from "../../ui/Data/TableOperations";
import SortBy from "../../ui/SortBy";
import FilterText from "../../ui/FilterText";
import Filter from "../../ui/Filter";
import NewRecord from "../../ui/Buttons/NewRecord";
import AddEditProject from "./AddEditProject";

import { projectStatus } from "./ProjectParameters";

function ClientsTableOperations() {
  return (
    <TableOperations>
      <FilterText placeholder="Search projects..." />
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "online", label: "online" },
          { value: "archive", label: "archive" },
          { value: "future", label: "future" },
          { value: "working", label: "working" },
        ]}
      />

      <SortBy
        options={[
          { value: "project_name-asc", label: "Sort by Name (asc)" },
          { value: "project_name-desc", label: "Sort by Name (desc)" },
          { value: "client_name-asc", label: "Sort by Client (asc)" },
          { value: "client_name-desc", label: "Sort by Client (desc)" },
          // { value: "project_platform-asc", label: "Sort by Platform (asc)" },
          // { value: "project_platform-desc", label: "Sort by Platform (desc)" },

          {
            value: "project_start_date-asc",
            label: "Sort by Start date (earlier first)",
          },
          {
            value: "project_start_date-desc",
            label: "Sort by Start date (recent first)",
          },
          {
            value: "project_end_date-asc",
            label: "Sort by End date (earlier first)",
          },
          {
            value: "project_end_date-desc",
            label: "Sort by End date (recent first)",
          },
        ]}
      />
      <NewRecord record="project">
        <AddEditProject />
      </NewRecord>
    </TableOperations>
  );
}

export default ClientsTableOperations;
