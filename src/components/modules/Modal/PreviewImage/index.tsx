import Modal from "..";
import useModal from "../useModal";

export const usePreviewImageModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isPreviewOpen: isOpen,
    closePreview: closeModal,
    openPreview: openModal,
  };
};

interface PreviewImageModalProps extends ModalProps {
  url: string;
}

const PreviewImageModal: React.FC<PreviewImageModalProps> = ({
  open,
  onClose,
  url,
}) => {
  return (
    <Modal open={open} onClose={onClose} noBg>
      <div className="flex items-center justify-center" onClick={onClose}>
        <img className="w-1/2" src={url} alt={url} />
      </div>
    </Modal>
  );
};

export default PreviewImageModal;
