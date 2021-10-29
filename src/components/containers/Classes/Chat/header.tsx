import ChannelSettingsModal, {
  useChannelSettingsModal,
} from "components/modules/Modal/ChannelSettings";
import InviteChannelModal, {
  useInviteChannelModal,
} from "components/modules/Modal/InviteChannelMember";
import useChat from "context/Chat";
import useStyle from "context/styleContext";
import { FaHashtag } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

const ChatHeader = () => {
  const { chatGroup } = useChat();
  const { openSetting, isSettingOpen, closeSetting } =
    useChannelSettingsModal();
  const { isInviteOpen, closeInvite, openInvite } = useInviteChannelModal();
  const { isSidebarOpen } = useStyle();

  return (
    <header
      className="w-full py-3 px-3 bg-gray-800 flex justify-between items-center shadow-sm border-b border-gray-700"
      style={{ minWidth: isSidebarOpen ? "80vw" : "" }}
    >
      <p
        className="text-xl text-white mr-2 flex items-center cursor-pointer"
        onClick={openSetting}
      >
        <FaHashtag />
        <span className="ml-2">{chatGroup?.name}</span>
        <MdExpandMore />
      </p>
      <ChannelSettingsModal
        channel={chatGroup?.channel}
        open={isSettingOpen}
        onClose={closeSetting}
        openOther={openInvite}
      />
      <InviteChannelModal
        open={isInviteOpen}
        onClose={closeInvite}
        channel={chatGroup?.channel}
      />
    </header>
  );
};

export default ChatHeader;
