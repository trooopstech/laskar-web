import Modal from "..";
import useModal from "../useModal";
import useClassDetail from "hooks/useDetailClass";
import { useParams } from "react-router";
import Input from "components/elements/Form/input";
import { FaHashtag, FaSearch } from "react-icons/fa";
import FullCheckbox from "components/elements/Form/full.checkbox";
import { useEffect, useState } from "react";
import { filterMemberByRole } from "components/containers/Classes/Member";
import Button from "components/elements/Button";
import About from "./about";
import Member from "./member";

export const useChannelSettingsModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isSettingOpen: isOpen,
    closeSetting: closeModal,
    openSetting: openModal,
  };
};

interface ChannelSettingsModalProps extends ModalProps {
  channel?: Channel;
}

const ChannelSettingsModal: React.FC<ChannelSettingsModalProps> = ({
  open,
  onClose,
  openOther,
  channel,
}) => {
  const [section, setSection] = useState(1);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container flex flex-col items-center justify-center text-gray-50 md:w-120">
        <div className="pt-2 px-4 w-full bg-gray-700 flex flex-col rounded-t-md">
          <h1 className="text-xl font-bold flex my-4 items-center">
            <FaHashtag className="mr-2" />
            {channel?.name}
          </h1>
          <div className="w-full flex">
            <div
              className={`mr-4 cursor-pointer py-2 ${
                section === 1 ? "border-b-2" : ""
              }`}
              onClick={() => setSection(1)}
            >
              Tentang
            </div>
            <div
              className={`mr-4 cursor-pointer py-2 ${
                section === 2 ? "border-b-2" : ""
              }`}
              onClick={() => setSection(2)}
            >
              Anggota
            </div>
            {/* <div
              className={`mr-4 cursor-pointer py-2 ${
                section === 3 ? "border-b-2" : ""
              }`}
              onClick={() => setSection(3)}
            >
              Pengaturan
            </div> */}
          </div>
        </div>
        <div className="w-full p-4">
          {section === 1 && <About />}
          {section === 2 && <Member openInvite={openOther} onClose={onClose} />}
        </div>
      </div>
    </Modal>
  );
};

export default ChannelSettingsModal;
