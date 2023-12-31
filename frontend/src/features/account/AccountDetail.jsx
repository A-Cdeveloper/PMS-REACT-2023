import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCurrentUserTokens } from "../../context/authContext";
import { useSingleUser } from "./useSingleUser";
import useRemoveProfileImage from "./useRemoveProfileImage";

import { formatDateTime } from "../../utils/helpers";

import Headline from "../../ui/Headline";
import ButtonText from "../../ui/Buttons/ButtonText";
import Row from "../../ui/Row";
import Tag from "../../ui/Data/Tag";
import {
  DataDetailsContainer,
  DataBox,
  DataBoxTitle,
  DataBoxContent,
} from "../../ui/Data/DataDetails";

import ChangePassword from "./ChangePassword";
import ChangeProfileImage from "./ChangeProfileImage";
import Button from "../../ui/Buttons/Button";
import useDeleteUser from "../users/useDeleteUser";
import Modal from "../../ui/Modal";
import ConfirmModal from "../../ui/ConfirmModal";
import RemoveButton from "../../ui/Buttons/RemoveButton";

const ImageHolder = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  display: block;
  width: 13rem;
  height: 13rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  margin-bottom: 2rem;
  border-radius: 50%;
  position: relative;
`;

const AccountDetail = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const {
    user: { uid: user_id, accessToken },
  } = useCurrentUserTokens();
  const { user: userSingle = {} } = useSingleUser();
  const { isDeleteLoading, removeProfileImage } = useRemoveProfileImage();
  const { isDeleteLoading: isDeleteAccount, deleteUser } = useDeleteUser();

  const queryClient = useQueryClient();
  const userCurrent = queryClient.getQueryData(["user", user_id])
    ? queryClient.getQueryData(["user", user_id])
    : userSingle;

  const {
    user_avatar,
    first_name,
    last_name,
    username,
    email,
    created_date,
    last_login,
    role,
  } = userCurrent;

  // console.log(userCurrent);

  return (
    <>
      <Row type="horizontal">
        <Row type="horizontal" style={{ paddingBottom: 0 }}>
          <Headline as="h2">
            {first_name} {last_name}
          </Headline>
          &nbsp;&nbsp;
          <Tag type="online">{role}</Tag>
        </Row>
        <ButtonText onClick={moveBack}> ← Back</ButtonText>
      </Row>
      <Row type="horizontal">
        <Row type="horizontal">
          <DataDetailsContainer>
            <DataBox>
              <DataBoxContent
                style={{
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <ImageHolder>
                  <ProfileImage
                    src={user_avatar ? user_avatar : "default-user.jpg"}
                    alt={`profile image for ${first_name}`}
                  />
                  {user_avatar && (
                    <RemoveButton
                      onClick={() => {
                        removeProfileImage({ user_id, accessToken });
                      }}
                    />
                  )}
                </ImageHolder>

                <ChangeProfileImage />
              </DataBoxContent>
            </DataBox>
          </DataDetailsContainer>
          <DataDetailsContainer>
            <DataBox>
              <DataBoxTitle>Username</DataBoxTitle>
              <DataBoxContent>{username}</DataBoxContent>
            </DataBox>
            <DataBox>
              <DataBoxTitle>Email</DataBoxTitle>
              <DataBoxContent>{email}</DataBoxContent>
            </DataBox>
          </DataDetailsContainer>

          <DataDetailsContainer>
            <DataBox>
              <DataBoxTitle>Created date:</DataBoxTitle>
              <DataBoxContent>{formatDateTime(created_date)}</DataBoxContent>
            </DataBox>
            <DataBox>
              <DataBoxTitle>Last login:</DataBoxTitle>
              <DataBoxContent>{formatDateTime(last_login)}</DataBoxContent>
            </DataBox>
          </DataDetailsContainer>
        </Row>

        <Row type="horizontal">
          <DataDetailsContainer>
            <ChangePassword />
          </DataDetailsContainer>
        </Row>

        <DataDetailsContainer>
          <DataBox>
            <DataBoxContent>
              <Modal>
                <Modal.OpenButton opens="user-delete">
                  <Button variation="danger" size="medium">
                    DELETE ACCOUNT
                  </Button>
                </Modal.OpenButton>

                <Modal.Window name="user-delete">
                  <ConfirmModal
                    resourceName="account"
                    operation="delete"
                    // onConfirm={() => console.log("delete")}
                    onConfirm={() =>
                      deleteUser(
                        { user_id, accessToken },
                        {
                          onSettled: () => {
                            navigate("/login", { replace: true });
                            sessionStorage.removeItem("currentUser");
                          },
                        }
                      )
                    }
                    disabled={isDeleteLoading}
                  />
                </Modal.Window>
              </Modal>
            </DataBoxContent>
          </DataBox>
        </DataDetailsContainer>
      </Row>
    </>
  );
};

export default AccountDetail;
