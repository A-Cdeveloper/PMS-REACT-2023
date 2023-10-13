import styled from "styled-components";
import Button from "./Buttons/Button";
import Headline from "./Headline";

const StyledExpirationModal = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ExpirationModal({ onConfirm, onCloseModal }) {
  const conformActionHandler = () => {
    onConfirm();
    onCloseModal();
  };

  return (
    <StyledExpirationModal>
      <Headline as="h3">Login session end!</Headline>

      <div>
        <Button variation="secondary" size="medium" onClick={onCloseModal}>
          Cancel
        </Button>

        <Button variation="info" size="medium" onClick={conformActionHandler}>
          Continue
        </Button>
      </div>
    </StyledExpirationModal>
  );
}

export default ExpirationModal;