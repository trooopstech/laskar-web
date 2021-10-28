import { Menu, SubMenu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import useClassDetail from "hooks/useDetailClass";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials } from "utils/getInitial";

const MemberCard = ({ member }: { member: ClassMember }) => {
  const [showDot, setShowDot] = useState(false);
  const {
    isAdministrator,
    changeMemberRole,
    classDetail,
    addMemberAsAdmin,
    removeMemberAsAdmin,
  } = useClassDetail();
  const { id } = classDetail as Class;

  const isAdmin = (): boolean => {
    return member?.member_role.map((r) => r.role.name).includes("ADMIN");
  };

  const isStudent = (): boolean => {
    return member?.member_role.map((r) => r.role.name).includes("STUDENT");
  };

  const memberIsAdmin = isAdmin();
  const memberIsStudent = isStudent();

  const getRole = (): string => {
    return member?.member_role
      .map((r) => r.role.name)
      .filter((role) => role !== "ADMIN")[0];
  };

  return (
    <div
      className="w-full rounded-lg hover:bg-gray-600 flex p-2 items-center my-2"
      onMouseEnter={() => setShowDot(true)}
      onMouseLeave={() => setShowDot(false)}
    >
      <div>
        <div
          className="avatar h-12 w-12 rounded-full mr-2 flex items-center justify-center"
          style={{ backgroundColor: member.member.color }}
        >
          <p className="text-xl uppercase font-bold text-center text-white">
            {getInitials(member.member.name as string)}
          </p>
        </div>
      </div>
      <div className="w-full m-2 flex justify-start">{member.member.name}</div>
      <div className="w-1/3 flex justify-end h-full">
        {memberIsAdmin && <h1 className="text-gray-500">Admin</h1>}
        {showDot && isAdministrator() && (
          <Menu
            menuButton={
              <button>
                {" "}
                <HiOutlineDotsVertical className="text-xl cursor-pointer" />
              </button>
            }
            transition
            menuClassName="bg-gray-700 p-2"
          >
            <MenuItem
              className={({ hover, active }) =>
                active
                  ? "bg-gray-700 text-white p-2"
                  : hover
                  ? "bg-gray-600 text-white rounded-md p-2"
                  : "bg-gray-700 text-white p-2"
              }
            >
              Hapus
            </MenuItem>
            {!memberIsAdmin && !memberIsStudent && (
              <MenuItem
                className={({ hover, active }) =>
                  active
                    ? "bg-gray-700 text-white p-2"
                    : hover
                    ? "bg-gray-600 text-white rounded-md p-2"
                    : "bg-gray-700 text-white p-2"
                }
                onClick={() =>
                  addMemberAsAdmin({
                    oid: member?.oid,
                    role_name: "ADMIN",
                    classId: id,
                  })
                }
              >
                Jadikan Admin
              </MenuItem>
            )}
            {memberIsAdmin && (
              <MenuItem
                className={({ hover, active }) =>
                  active
                    ? "bg-gray-700 text-white p-2"
                    : hover
                    ? "bg-gray-600 text-white rounded-md p-2"
                    : "bg-gray-700 text-white p-2"
                }
                onClick={() =>
                  removeMemberAsAdmin({
                    oid: member?.oid,
                    role_name: "ADMIN",
                    classId: id,
                  })
                }
              >
                Cabut akses Admin
              </MenuItem>
            )}
            <SubMenu
              label={<h1 className="-ml-6">Ubah Akses</h1>}
              direction="left"
              className="p-2 text-white text-left"
              menuClassName="bg-gray-700 p-2"
            >
              <MenuRadioGroup
                value={getRole()}
                className="form-radio"
                onRadioChange={(e) =>
                  changeMemberRole({
                    oid: member?.oid,
                    role_name: e.value,
                    classId: id,
                  })
                }
              >
                <MenuItem
                  className={({ hover, active, checked }) =>
                    active
                      ? "bg-gray-700 text-white"
                      : hover
                      ? "bg-gray-600 text-white rounded-md"
                      : checked
                      ? "bg-gray-700 text-yellow-500"
                      : "bg-gray-700 text-white"
                  }
                  value={"TEACHER"}
                >
                  Guru
                </MenuItem>
                <MenuItem
                  className={({ hover, active, checked }) =>
                    active
                      ? "bg-gray-700 text-white"
                      : hover
                      ? "bg-gray-600 text-white rounded-md"
                      : checked
                      ? "bg-gray-700 text-yellow-500"
                      : "bg-gray-700 text-white"
                  }
                  value={"ASSISTANT"}
                >
                  Assistant
                </MenuItem>
                {!memberIsAdmin && (
                  <MenuItem
                    className={({ hover, active, checked }) =>
                      active
                        ? "bg-gray-700 text-white"
                        : hover
                        ? "bg-gray-600 text-white rounded-md"
                        : checked
                        ? "bg-gray-700 text-yellow-500"
                        : "bg-gray-700 text-white"
                    }
                    value={"STUDENT"}
                  >
                    Siswa
                  </MenuItem>
                )}
              </MenuRadioGroup>
            </SubMenu>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
