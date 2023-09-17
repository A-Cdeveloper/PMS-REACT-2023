import styled from "styled-components";
import Table from "../../ui/Table";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineNewspaper,
  HiOutlineGlobeAlt,
  HiEllipsisVertical,
  HiSquare2Stack,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import AddEditClient from "./AddEditClient";

const Client = styled.div`
  font-weight: 500;
`;

const CellIcon = styled.div`
  display: flex;
  & svg {
    width: 2rem;
    height: 2rem;
    margin: 0 0.5rem;
  }
`;

const ClientRow = ({ client }) => {
  const {
    client_id,
    client_name,
    client_adresse,
    client_contact,
    client_phone,
    client_fax,
    client_email,
    client_site,
  } = client;

  return (
    <Table.Row>
      <Client>{client_name}</Client>
      <div>{client_adresse}</div>
      <div>{client_contact}</div>
      <CellIcon>
        <a href={`tel: ${client_phone}`}>
          <HiOutlinePhone />
        </a>
        {client_fax && (
          <a href={`tel: ${client_fax}`}>
            <HiOutlineNewspaper />
          </a>
        )}
      </CellIcon>

      <CellIcon>
        <a href={`mailto: ${client_email}`} title={client_email}>
          <HiOutlineEnvelope />
        </a>
      </CellIcon>
      <CellIcon>
        <a href={client_site} target="_blank" title={client_site}>
          <HiOutlineGlobeAlt />
        </a>
      </CellIcon>

      <div>
        <Modal>
          <Menus>
            <Menus.Toggle id={client_id} />

            <Menus.List id={client_id}>
              <Modal.OpenButton opens="client-edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.OpenButton>
              <Modal.OpenButton opens="client-delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.OpenButton>
            </Menus.List>
          </Menus>

          <Modal.Window name="client-edit">
            <AddEditClient clientToEdit={client} />
          </Modal.Window>

          <Modal.Window name="client-delete">
            Delete window {client_id}
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default ClientRow;
