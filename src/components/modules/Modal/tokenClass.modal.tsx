import { useQuery } from "@apollo/client";
import Button from "components/elements/Button";
import { MdContentCopy } from "react-icons/md";
import useClassDetail from "hooks/useDetailClass";
import { useEffect, useState } from "react";
import { GET_CLASS_TOKEN } from "schema/classes";
import Modal from ".";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useModal from "./useModal";

export const useClassTokenModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isTokenOpen: isOpen,
    closeToken: closeModal,
    openToken: openModal,
  };
};

interface ClassTokenModalProps extends ModalProps {
  keyword: string;
}

const ClassTokenModal: React.FC<ClassTokenModalProps> = ({
  open,
  onClose,
  keyword,
}) => {
  const { classDetail } = useClassDetail();
  const [tokens, setTokens] = useState({
    token: "",
    link_join: "",
  });
  const { data } = useQuery(GET_CLASS_TOKEN, {
    variables: {
      classId: classDetail?.id,
      keyword,
    },
  });

  useEffect(() => {
    if (data) {
      setTokens(data.getClassToken);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-center flex-col px-16">
        <h1 className="text-gray-50 text-xl font-bold">Undang Kelas</h1>
        <h1 className="text-gray-50 m-1">Kode Kelas</h1>
        <CopyToClipboard
          text={tokens.token}
          onCopy={() => alert("Token Copied!")}
        >
          <div className="flex items-center cursor-pointer">
            <h1 className="text-gray-50 text-5xl font-bold m-2">
              {tokens.token}
            </h1>
            <MdContentCopy className="text-4xl text-gray-500" />
          </div>
        </CopyToClipboard>
        <CopyToClipboard
          text={tokens.link_join}
          onCopy={() => alert("Link Copied!")}
        >
          <div className="flex items-center cursor-pointer">
            <h1 className="text-gray-50">Copy Link Undangan</h1>
            <MdContentCopy className="text-gray-500 ml-1" />
          </div>
        </CopyToClipboard>
        <Button variant="primary" className="mt-4" onClick={onClose}>
          Tutup
        </Button>
      </div>
    </Modal>
  );
};

export default ClassTokenModal;
