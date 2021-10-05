import { useEffect, useState } from "react";
import Modal from "..";
import useModal from "../useModal";
import FormSection from "./form";
import IntroSection from "./intro";

export const useCreateClassModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isCreateClassOpen: isOpen,
    closeCreateClass: closeModal,
    openCreateClass: openModal,
  };
};

const CreateClassModal: React.FC<ModalProps> = ({
  open,
  onClose,
  openOther,
}) => {
  const [purpose, setPurpose] = useState<string>("");

  const changeSection = (value: string) => {
    setPurpose(value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      {purpose !== "" ? (
        <FormSection
          onClose={onClose}
          openOther={openOther}
          open={open}
          setPurpose={setPurpose}
          purpose={purpose}
        />
      ) : (
        <IntroSection
          onClose={onClose}
          openOther={openOther}
          open={open}
          setPurpose={changeSection}
        />
      )}
    </Modal>
  );
};

export default CreateClassModal;
