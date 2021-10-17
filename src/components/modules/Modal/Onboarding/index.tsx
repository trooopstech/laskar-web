import Button from "components/elements/Button";
import { useState } from "react";
import Modal from "..";
import useModal from "../useModal";
import BirthdaySection from "./birthday";
import IntentionSection from "./intention";
import IntroSection from "./intro";
import ProgressSection from "./progress";

export const useOnboardingModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isOnboardingOpen: isOpen,
    closeOnboarding: closeModal,
    openOnboarding: openModal,
  };
};

interface OnboardingModalProps extends ModalProps {
  openCreateClass: () => void;
  openJoinClass: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  open,
  onClose,
  openOther,
  openCreateClass,
  openJoinClass,
}) => {
  const [progress, setProgress] = useState<number>(1);

  return (
    <Modal open={open} onClose={onClose} permanent>
      <div className="md:w-120 ">
        <div className="w-full p-4">
          <p className="text-xl">Langkah {progress} dari 3</p>
          <ProgressSection progress={progress} />
        </div>
        {progress === 1 && <IntroSection setProgress={setProgress} />}
        {progress === 2 && <BirthdaySection setProgress={setProgress} />}
        {progress === 3 && (
          <IntentionSection
            openCreateClass={openCreateClass}
            openJoinClass={openJoinClass}
            onClose={onClose}
          />
        )}
      </div>
    </Modal>
  );
};

export default OnboardingModal;
