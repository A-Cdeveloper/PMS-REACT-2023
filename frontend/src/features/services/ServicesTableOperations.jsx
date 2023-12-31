import TableOperations from "../../ui/Data/TableOperations";
import SortBy from "../../ui/SortBy";
import FilterText from "../../ui/FilterText";
import NewRecord from "../../ui/Buttons/NewRecord";
import AddEditService from "./AddEditService";
import useCountResurces from "../../hooks-api/useCountResurces";

function ServicesTableOperations() {
  const { servicesCount } = useCountResurces();
  return (
    <TableOperations>
      {servicesCount > 1 && (
        <>
          <FilterText placeholder="Search services..." />
          <SortBy
            options={[
              { value: "service_name-asc", label: "Sort by name (asc)" },
              { value: "service_name-desc", label: "Sort by name (desc)" },
              {
                value: "service_type-asc",
                label: "Sort by service type (asc)",
              },
              {
                value: "service_type-desc",
                label: "Sort by service type (desc)",
              },
            ]}
            defaultOptionIndex={0}
          />
        </>
      )}
      <NewRecord record="service">
        <AddEditService />
      </NewRecord>
    </TableOperations>
  );
}

export default ServicesTableOperations;
