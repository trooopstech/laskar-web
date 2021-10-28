import { useQuery } from "@apollo/client";
import Button from "components/elements/Button";
import { MdContentCopy } from "react-icons/md";
import useClassDetail from "hooks/useDetailClass";
import { useEffect, useState } from "react";
import { GET_CLASS_TOKEN } from "schema/classes";
import Modal from "..";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useModal from "../useModal";

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
    errorPolicy: "all",
  });

  useEffect(() => {
    if (data) {
      setTokens(data.getClassToken);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-center flex-col md:w-120 p-4">
        <h1 className="text-xl font-bold">Undang Kelas</h1>
        <div className="w-full mt-4 mb-2">
          <h1 className="font-bold">Kode Kelas</h1>
          <CopyToClipboard
            text={tokens.token}
            onCopy={() => alert("Token Copied!")}
          >
            <div className="flex items-center cursor-pointer bg-gray-700 p-2 rounded-md justify-between">
              <h1 className="text-gray-50 text-5xl font-bold">
                {tokens.token}
              </h1>
              <MdContentCopy className="text-4xl text-gray-500" />
            </div>
          </CopyToClipboard>
        </div>
        <CopyToClipboard
          text={tokens.link_join}
          onCopy={() => alert("Link Copied!")}
        >
          <div className="flex items-center cursor-pointer w-full justify-end mt-4 mb-2">
            <h1 className="text-blue-300">Copy Link Undangan</h1>
          </div>
        </CopyToClipboard>
        <div className="w-full flex justify-end mt-2">
          <Button variant="primary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClassTokenModal;
