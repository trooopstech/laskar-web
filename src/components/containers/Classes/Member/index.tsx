import useClassDetail from "hooks/useDetailClass";
import { useEffect, useState } from "react";
import MemberSection from "./section";

const filterMemberByRole = (
  role: string,
  classMember: ClassMember[]
): ClassMember[] => {
  return classMember?.filter((member) =>
    member?.member_role?.map((r) => r.role.name).includes(role)
  );
};

const MemberContainer = () => {
  const { classDetail } = useClassDetail();
  const { class_member } = classDetail as Class;
  const [student, setStudent] = useState<ClassMember[]>([]);
  const [assistant, setAssistant] = useState<ClassMember[]>([]);
  const [teacher, setTeacher] = useState<ClassMember[]>([]);

  useEffect(() => {
    if (class_member) {
      console.log("ADA CLASS MEMBER");
      setStudent(filterMemberByRole("STUDENT", class_member as ClassMember[]));
      setAssistant(
        filterMemberByRole("ASSISTANT", class_member as ClassMember[])
      );
      setTeacher(filterMemberByRole("TEACHER", class_member as ClassMember[]));
    }
  }, [class_member]);

  return (
    <div className="w-full flex flex-col items-center py-4">
      <div className="w-3/4">
        <MemberSection section="Guru" classMember={teacher} />
        <MemberSection section="Asisten" classMember={assistant} />
        <MemberSection section="Siswa" classMember={student} />
      </div>
    </div>
  );
};

export default MemberContainer;
