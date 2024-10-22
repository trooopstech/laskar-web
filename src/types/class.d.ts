type Class = {
  id: string;
  created_at: Date;
  creator: User;
  name: string;
  description: string;
  color: string;
  banner?: string;
  channel_category: ChannelCategory[];
  class_member?: ClassMember[];
};

type ClassMember = {
  member: User;
  oid: string;
  member_role: MemberRole[];
};

type MemberRole = {
  role: Role;
};

type Role = {
  id?: string;
  name: string;
};

enum ClassPurposes {
  SCHOOL,
  TUTORIAL,
  COURSES,
  COMMUNITY,
  OTHERS,
}

interface CreateClassInput {
  name: string;
  description?: string;
  institution: string;
  purposes: ClassPurposes;
}

interface RoleManagement {
  classId: string;
  oid: string;
  role_name: string;
}
