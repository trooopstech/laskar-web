import useClassDetail from "hooks/useDetailClass";
import MemberSection from "./section";

const filterMemberByRole = (
  role: string,
  classMember: ClassMember[]
): ClassMember[] => {
  return classMember?.filter((member) =>
    member.member_role.map((r) => r.role.name).includes(role)
  );
};

const MemberContainer = () => {
  const { classDetail } = useClassDetail();
  const { class_member } = classDetail as Class;

  const student = filterMemberByRole("STUDENT", class_member as ClassMember[]);
  const assistant = filterMemberByRole(
    "ASSISTANT",
    class_member as ClassMember[]
  );
  const teacher = filterMemberByRole("TEACHER", class_member as ClassMember[]);

  return (
    <div className="w-full flex flex-col items-center py-4">
      <div className="w-3/4">
        <MemberSection section="Guru" classMember={teacher} />
        <MemberSection section="Assistant" classMember={assistant} />
        <MemberSection section="Siswa" classMember={student} />
      </div>
    </div>
  );
};

export default MemberContainer;
