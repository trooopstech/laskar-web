import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import MemberCard from "./member";

const MemberSection = ({
  section,
  classMember,
}: {
  section: string;
  classMember: ClassMember[];
}) => {
  return (
    <div className="w-full my-2">
      <div className="flex justify-between border-b-2 border-gray-100 items-center">
        <h1 className="text-xl">{section}</h1>
        <AiOutlineUserAdd className="text-xl cursor-pointer" />
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
    </div>
  );
};

export default MemberSection;
