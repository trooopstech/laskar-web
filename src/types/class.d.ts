type Class = {
  id: string;
  created_at: Date;
  creator: User;
  name: string;
  description: string;
  color: string;
  banner?: string;
};

type ClassMember = {
  member: User;
  oid: string;
};

interface CreateClassInput {
  name: string;
  description?: string;
}
