import React from "react";
import useClassDetail from "hooks/useDetailClass";
import { AiOutlineUserAdd } from "react-icons/ai";
import MemberCard from "./member";
import ClassTokenModal, {
  useClassTokenModal,
} from "components/modules/Modal/tokenClass.modal";

const ROLE_MAP: { [key: string]: string } = {
  asisten: "ASSISTANT",
  guru: "TEACHER",
  siswa: "STUDENT",
};

const MemberSection = ({
  section,
  classMember,
}: {
  section: string;
  classMember: ClassMember[];
}) => {
  const { isAdministrator, isRoleEqualParam } = useClassDetail();
  const { isTokenOpen, closeToken, openToken } = useClassTokenModal();

  return (
    <div className="w-full my-2">
      <div className="flex justify-between border-b-2 border-gray-100 items-center">
        <h1 className="text-xl">{section}</h1>
        {(isRoleEqualParam(ROLE_MAP[section.toLowerCase()]) ||
          isAdministrator()) && (
          <AiOutlineUserAdd
            className="text-xl cursor-pointer"
            onClick={openToken}
          />
        )}
      </div>
      <div>
        {classMember?.map((member) => (
          <MemberCard member={member} key={member.oid} />
        ))}
        {classMember?.length < 1 && (
          <div className="m-4">
            <h1 className="text-xl">Tidak ada {section}</h1>
          </div>
        )}
      </div>
      {isTokenOpen > 0 && (
        <ClassTokenModal
          open={isTokenOpen}
          onClose={closeToken}
          keyword={ROLE_MAP[section.toLowerCase()]}
        />
      )}
    </div>
  );
};

export default MemberSection;
