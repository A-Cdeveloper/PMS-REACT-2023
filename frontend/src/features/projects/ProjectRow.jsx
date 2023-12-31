import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "../../utils/helpers";

import styled from "styled-components";
import useCloneProject from "./useCloneProject";
import useDeleteProject from "./useDeleteProject";

import { singleProject } from "../../services/apiProjects";
import { useAccessToken } from "../../context/authContext";

import {
  projectPlatforms,
  projectHosting,
  projectStatus,
} from "./ProjectParameters";

import {
  HiOutlineGlobeAlt,
  HiOutlineDocumentDuplicate,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineCheck,
  HiOutlineMinus,
} from "react-icons/hi2";

import Table from "../../ui/Data/Table";
import Tag from "../../ui/Data/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import AddEditProject from "./AddEditProject";
import ConfirmModal from "../../ui/ConfirmModal";

const Project = styled.div`
  font-weight: 500;
`;

const Link = styled.div`
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primary[700]};
  }
`;

const CellIcon = styled.div`
  display: flex;

  & svg {
    width: 2rem;
    height: 2rem;
    margin: auto;
    // margin: 0 0.5rem;
  }
`;

const StatusDiv = styled.div`
  & > span {
    width: 80%;
  }
`;

const ProjectRow = ({ project }) => {
  const navigate = useNavigate();
  const { isCloneLoading, cloneProject } = useCloneProject();
  const { isDeleteLoading, deleteProject } = useDeleteProject();
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();

  const {
    project_id,
    project_client_id,
    project_name,
    client_name,
    project_url,
    project_platform,
    project_hosting,
    project_update,
    project_last_update,
    project_start_date,
    project_end_date,
    project_status,
    project_online,
    task_per_project,
  } = project;

  const prefetchProjectHandler = async (project_id) => {
    await queryClient.prefetchQuery({
      queryKey: ["project", project_id],
      queryFn: () => singleProject({ project_id, accessToken }),
    });
  };

  return (
    <Table.Row>
      <Project>{project_name}</Project>
      <Link onClick={() => navigate(`/clients/${project_client_id}`)}>
        {client_name}
      </Link>
      <CellIcon>
        <a href={project_url} target="_blank" title={project_url}>
          <HiOutlineGlobeAlt />
        </a>
      </CellIcon>
      <CellIcon>
        {projectPlatforms().map((platform) => {
          return (
            platform.label === project_platform && (
              <span key={platform.label}>{platform.icon}</span>
            )
          );
        })}
      </CellIcon>

      <div>
        {projectHosting.map((hosting) => {
          return (
            hosting.value === project_hosting && (
              <span key={hosting.label}>
                <a
                  href={hosting.link !== "" ? hosting.link : "#"}
                  target={hosting.link !== "" ? "_blank" : null}
                  title={hosting.label}
                >
                  {hosting.label}
                </a>
              </span>
            )
          );
        })}
      </div>
      <div>{formatDate(project_start_date)}</div>
      <div>{formatDate(project_end_date)}</div>
      <StatusDiv>
        {projectStatus.map((status) => {
          return (
            status.value === project_status && (
              <Tag key={project_status} type={status.value}>
                {status.label}
              </Tag>
            )
          );
        })}
      </StatusDiv>
      <CellIcon>
        {project_update ? (
          <>
            {project_update}
            <br />
            {formatDate(project_last_update)}
          </>
        ) : (
          <HiOutlineMinus />
        )}
      </CellIcon>
      <CellIcon>
        {project_online === "Ja" ? <HiOutlineCheck /> : <HiOutlineMinus />}
      </CellIcon>
      <div style={{ textAlign: "center" }}>{task_per_project}</div>

      <div>
        <Modal>
          <Menus>
            <Menus.Toggle id={project_id} />

            <Menus.List id={project_id}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => {
                  navigate(`/projects/${project_id}`);
                }}
                onMouseOver={() => prefetchProjectHandler(project_id)}
              >
                See details
              </Menus.Button>

              <Modal.OpenButton opens="project-edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.OpenButton>

              <Modal.OpenButton opens="project-clone">
                <Menus.Button icon={<HiOutlineDocumentDuplicate />}>
                  Duplicate
                </Menus.Button>
              </Modal.OpenButton>

              <Modal.OpenButton opens="project-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.OpenButton>
            </Menus.List>
          </Menus>
          <Modal.Window name="project-edit">
            <AddEditProject projectToEdit={project} />
          </Modal.Window>

          <Modal.Window name="project-clone">
            <ConfirmModal
              resourceName="project"
              operation="clone"
              onConfirm={() => cloneProject({ project_id, accessToken })}
              disabled={isCloneLoading}
            />
          </Modal.Window>
          <Modal.Window name="project-delete">
            <ConfirmModal
              resourceName="project"
              operation="delete"
              connectedResurces={task_per_project !== 0}
              onConfirm={() => deleteProject({ project_id, accessToken })}
              disabled={isDeleteLoading}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default ProjectRow;
