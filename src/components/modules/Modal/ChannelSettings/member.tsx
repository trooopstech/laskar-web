import Input from "components/elements/Form/input";
import useChat from "context/Chat";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import useClassDetail from "hooks/useDetailClass";
const Member = ({
  openInvite,
  onClose,
}: {
  openInvite?: () => void;
  onClose: () => void;
}) => {
  const { chatGroup } = useChat();
  const { classDetail } = useClassDetail();

  const openInviteMember = () => {
    onClose();
    openInvite && openInvite();
  };

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="ex: anggardha"
        name="name"
        endAddorment={<FaSearch className="text-xl" />}
      />
      {chatGroup?.channel.is_private && (
        <div
          className="flex flex-col my-2 w-full cursor-pointer"
          onClick={openInviteMember}
        >
          <div className="flex w-full items-center rounded-lg px-4 py-2 bg-gray-700">
            <FaUserPlus className="text-xl mr-4" />
            <h1 className="font-thin">Undang Anggota</h1>
          </div>
        </div>
      )}
      {chatGroup?.channel.is_private && (
        <div className="h-60 w-full overflow-y-auto">
          {chatGroup?.channel.members.map((m) => (
            <div className="flex w-full items-center px-2 py-2">
              <div
                className="w-8 h-8 rounded-full mr-2"
                style={{
                  backgroundColor: m.member.member.color ?? "pink",
                }}
              ></div>
              {m.member.member.name ?? "Admin"}
            </div>
          ))}
        </div>
      )}
      {!chatGroup?.channel.is_private && (
        <div className="h-60 w-full overflow-y-auto">
          {classDetail?.class_member?.map((m) => (
            <div className="flex w-full items-center px-2 py-2">
              <div
                className="w-8 h-8 rounded-full mr-2"
                style={{
                  backgroundColor: m.member.color ?? "pink",
                }}
              ></div>
              {m.member.name ?? "Admin"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Member;
