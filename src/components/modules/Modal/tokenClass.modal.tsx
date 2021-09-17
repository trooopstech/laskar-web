import { useQuery } from "@apollo/client";
import useClassDetail from "hooks/useDetailClass";
import { useEffect, useState } from "react";
import { GET_CLASS_TOKEN } from "schema/classes";
import Modal from ".";
import useModal from "./useModal";

export const useClassTokenModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isTokenOpen: isOpen,
    closeToken: closeModal,
    openToken: openModal,
  };
};

const ClassTokenModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const { classDetail } = useClassDetail();
  const [tokens, setTokens] = useState({
    token: "",
    link_join: "",
  });
  const { data } = useQuery(GET_CLASS_TOKEN, {
    variables: {
      classId: classDetail?.id,
    },
  });

  useEffect(() => {
    if (data) {
      setTokens(data.getClassToken);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
      <h1 className="text-gray-50">INI TOKEN KELAS: {tokens.token}</h1>
      <h1 className="text-gray-50">Link: {tokens.link_join}</h1>
    </Modal>
  );
};

export default ClassTokenModal;
