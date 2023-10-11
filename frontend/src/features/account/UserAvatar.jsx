import { API_URL } from "../../utils/constants";
import styled from "styled-components";
import { useSingleUser } from "./useSingleUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.6rem;
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 1px solid ${(props) => props.theme.colors.primary[100]};
`;

const UserAvatar = () => {
  const { user: userSingle = {} } = useSingleUser();

  const { user_avatar, first_name, last_name } = userSingle;

  let uAvatar;
  if (user_avatar || first_name || last_name) {
    uAvatar = (
      <>
        <Avatar
          src={user_avatar ? `user-images/${user_avatar}` : "default-user.jpg"}
          alt={`Avatar for ${first_name}`}
        />
        <span>
          {first_name} {last_name}
        </span>
      </>
    );
  }

  return <StyledUserAvatar>{uAvatar}</StyledUserAvatar>;
};

export default UserAvatar;
