import Modal from "..";
import useModal from "../useModal";
import useClassDetail from "hooks/useDetailClass";
import { useParams } from "react-router";
import Input from "components/elements/Form/input";
import { FaSearch } from "react-icons/fa";
import FullCheckbox from "components/elements/Form/full.checkbox";
import { useEffect, useState } from "react";
import { filterMemberByRole } from "components/containers/Classes/Member";
import Button from "components/elements/Button";

export const useInviteChannelModal = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return {
    isInviteOpen: isOpen,
    closeInvite: closeModal,
    openInvite: openModal,
  };
};

interface InviteChannelModalProps extends ModalProps {
  channel?: Channel;
}

const InviteChannelModal: React.FC<InviteChannelModalProps> = ({
  open,
  onClose,
  openOther,
  channel,
}) => {
  const { classDetail, inviteMemberChannel, getUserClassMember } =
    useClassDetail();
  const member = getUserClassMember();
  const [data, setData] = useState<Array<string>>([]);
  const [roleData, setRoleData] = useState<Array<string>>([]);
  const ROLE = ["TEACHER", "ASSISTANT", "STUDENT"];

  const channelMembers = channel?.members.map((m) => m.member.oid);

  const addMemberViaRole = (role: string, memberOids: string[]) => {
    const members = filterMemberByRole(
      role,
      classDetail?.class_member as ClassMember[]
    );

    const oid = members
      ?.filter((classMember) => classMember.oid !== member.oid)
      ?.map((classMember) => classMember.oid);

    const newData = [...memberOids, ...oid];

    // setData([...(new Set(newData) as unknown as Array<string>)]);
    return [...(new Set(newData) as unknown as Array<string>)];
  };

  const removeMemberViaRole = (role: string, memberOids: string[]) => {
    const members = filterMemberByRole(
      role,
      classDetail?.class_member as ClassMember[]
    );

    const oid = members
      ?.filter((classMember) => classMember.oid !== member.oid)
      ?.map((classMember) => classMember.oid);

    const newData = memberOids.filter((d) => !oid.includes(d));

    return newData;
  };

  useEffect(() => {
    const unPickedRole = ROLE.filter((r) => !roleData.includes(r));

    let newData = data;

    unPickedRole.forEach((role) => {
      newData = [...removeMemberViaRole(role, newData)];
    });

    roleData.forEach((role) => {
      newData = [...addMemberViaRole(role, newData), ...newData];
    });

    setData(newData);
  }, [roleData]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container p-4 flex flex-col items-center justify-center text-gray-50 md:w-120">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold">Undang Anggota atau Peran</h1>
          <p className="text-xs text-gray-500 font-thin">
            Undang Member ke {channel?.name}
          </p>
        </div>
        <div className="w-full">
          <Input
            name="search"
            type="text"
            endAddorment={<FaSearch />}
            placeholder="ex: anggardha"
          />
        </div>
        <div className="h-80 w-full mt-2 overflow-y-auto">
          <div className="w-full flex flex-col">
            <h1 className="font-bold">Peran</h1>
            <FullCheckbox value="TEACHER" data={roleData} setData={setRoleData}>
              <div className="w-full">
                <h1 className="font-thin">Guru</h1>
              </div>
            </FullCheckbox>
            <FullCheckbox
              value="ASSISTANT"
              data={roleData}
              setData={setRoleData}
            >
              <div className="w-full">
                <h1 className="font-thin">Asisten</h1>
              </div>
            </FullCheckbox>
            <FullCheckbox value="STUDENT" data={roleData} setData={setRoleData}>
              <div className="w-full">
                <h1 className="font-thin">Siswa</h1>
              </div>
            </FullCheckbox>
          </div>
          <div className="w-full flex flex-col my-2">
            <h1 className="font-bold">Anggota</h1>
            {classDetail?.class_member
              ?.filter(
                (classMember) =>
                  classMember.oid !== member.oid &&
                  !channelMembers?.includes(classMember.oid)
              )
              .map((classMember) => (
                <FullCheckbox
                  value={classMember.oid}
                  data={data}
                  setData={setData}
                >
                  <div className="w-full flex items-center">
                    <div
                      className="h-8 w-8 rounded-full mr-4"
                      style={{ backgroundColor: classMember.member.color }}
                    />
                    <h1 className="font-thin">{classMember.member.name}</h1>
                  </div>
                </FullCheckbox>
              ))}
          </div>
        </div>
        <div className="w-full justify-end flex">
          <Button
            variant="primary"
            onClick={async () => {
              inviteMemberChannel({
                oids: data,
                channel_id: channel?.id ?? "",
              });
              onClose();
            }}
          >
            Undang
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteChannelModal;
