import { useForm, Controller } from "react-hook-form";
import useEditProject from "./useEditProject";
import useAddProject from "./useAddProject";

import {
  projectHosting,
  projectPlatforms,
  projectStatus,
  projectAllClients,
} from "./ProjectParameters";

import Form from "../../ui/Form/Form";
import FormRow from "../../ui/Form/FormRow";
import Input from "../../ui/Form/Input";
import Textarea from "../../ui/Form/Textarea";
import Select from "../../ui/Form/Select";
import Button from "../../ui/Buttons/Button";

const AddEditProject = ({ projectToEdit = {}, onCloseModal }) => {
  const { isAddNewLoading, addNewProject } = useAddProject();
  const { isEditLoading, editProject } = useEditProject();

  console.log(projectToEdit);

  const isEdit = !!projectToEdit.project_id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
    getValues,
  } = useForm({ defaultValues: isEdit ? projectToEdit : {} });

  const loadingState = isAddNewLoading || isEditLoading;

  const onSubmit = (data) => {
    if (isEdit) {
      editProject(
        { projectId: projectToEdit.project_id, updatedProject: data },
        {
          onSuccess: () => {
            onCloseModal();
          },
        }
      );
    } else {
      addNewProject(data, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Project" error={errors?.project_name}>
        <Input
          {...register("project_name", { required: "This field is required" })}
          aria-invalid={errors.project_name ? "true" : "false"}
          disabled={loadingState}
        />
      </FormRow>

      <FormRow label="Client" error={errors?.project_client_id}>
        <Controller
          control={control}
          name="project_client_id"
          disabled={loadingState}
          required="This field is required"
          render={({ field }) => {
            return (
              <Select
                {...field}
                onChange={(e) => {
                  return field.onChange(e.target.value);
                }}
              >
                {projectAllClients().map((client) => (
                  <option key={client.value} value={client.value}>
                    {client.label}
                  </option>
                ))}
              </Select>
            );
          }}
        />

        {/* <Select
          {...register("project_client_id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          defaultValue={projectToEdit.project_client_id}
          disabled={loadingState}
        >
          {projectAllClients().map((client) => (
            <option
              key={client.value}
              value={client.value}
            >
              {client.label}
            </option>
          ))}
        </Select> */}
      </FormRow>

      <FormRow label="Platform" error={errors?.project_platform}>
        <Select
          {...register("project_platform", {
            required: "This field is required",
          })}
          disabled={loadingState}
        >
          {projectPlatforms().map((platform) => (
            <option key={platform.label} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow label="Hosting" error={errors?.project_hosting}>
        <Select
          {...register("project_hosting", {
            required: "This field is required",
          })}
          disabled={loadingState}
        >
          {projectHosting.map((hosting) => (
            <option key={hosting.label} value={hosting.value}>
              {hosting.label}
            </option>
          ))}
        </Select>
      </FormRow>
      <FormRow label="Description" error={errors?.project_description}>
        <Textarea
          type="textarea"
          {...register("project_description")}
          aria-invalid={errors.project_description ? "true" : "false"}
          disabled={loadingState}
        />
      </FormRow>

      <FormRow label="FTP" error={errors?.project_ftpdata}>
        <Textarea
          type="textarea"
          {...register("project_ftpdata")}
          aria-invalid={errors.project_ftpdata ? "true" : "false"}
          disabled={loadingState}
        />
      </FormRow>

      <FormRow label="Database" error={errors?.project_dbdata}>
        <Textarea
          type="textarea"
          {...register("project_dbdata")}
          aria-invalid={errors.project_dbdata ? "true" : "false"}
          disabled={loadingState}
        />
      </FormRow>

      <FormRow label="Url" error={errors?.project_url}>
        <Input
          type="url"
          {...register("project_url", {
            pattern: {
              value: /^(http(s)?:\/\/)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
              message: "Please specify a valid url (ex.https://)",
            },
          })}
          aria-invalid={errors.project_url ? "true" : "false"}
          disabled={loadingState}
        />
      </FormRow>

      <FormRow label="Start date" error={errors?.project_start_date}>
        <Controller
          control={control}
          name="project_start_date"
          disabled={loadingState}
          render={({ field }) => {
            const defDate = {
              ...field,
              value: field.value && field.value.slice(0, -14),
              // : new Date(new Date()).toISOString().slice(0, -5),
            };
            return (
              <Input
                type="date"
                max={
                  getValues("project_end_date") &&
                  getValues("project_end_date").slice(0, -14)
                }
                {...defDate}
                aria-invalid={errors.project_start_date ? "true" : "false"}
                onChange={(e) => {
                  if (e.target.value === "") {
                    reset({
                      project_start_date: "",
                    });
                    return;
                  }
                  field.onChange(new Date(e.target.value).toISOString());
                }}
              />
            );
          }}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.project_end_date}>
        <Controller
          disabled={loadingState}
          control={control}
          name="project_end_date"
          render={({ field }) => {
            const defDate = {
              ...field,
              value: field.value && field.value.slice(0, -14),
            };
            return (
              <Input
                type="date"
                min={
                  getValues("project_start_date") &&
                  getValues("project_start_date").slice(0, -14)
                }
                {...defDate}
                aria-invalid={errors.project_end_date ? "true" : "false"}
                onChange={(e) => {
                  if (e.target.value === "") {
                    reset({
                      project_end_date: "",
                    });
                    return;
                  }

                  return field.onChange(new Date(e.target.value).toISOString());
                }}
              />
            );
          }}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.project_status}>
        <Select
          {...register("project_status", {
            required: "This field is required",
          })}
          defaultValue={!isEdit && projectStatus[1].value}
          disabled={loadingState}
        >
          {projectStatus.map((status) => (
            <option key={status.label} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow>
        <Button variation="primary" size="medium" disabled={loadingState}>
          {isEdit ? "Submit Changes" : "Add new project"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default AddEditProject;
