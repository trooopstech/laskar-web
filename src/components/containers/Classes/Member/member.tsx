import { Menu, SubMenu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const MemberCard = ({ member }: { member: ClassMember }) => {
  const [showDot, setShowDot] = useState(false);

  const isAdmin = (): boolean => {
    return member?.member_role.map((r) => r.role.name).includes("ADMIN");
  };

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
      <div className="rounded-full bg-red-100 p-8"></div>
      <div className="w-full m-2">{member.member.name}</div>
      <div className="w-1/3 flex justify-end h-full">
        {isAdmin() && <h1 className="text-gray-500">Admin</h1>}
        {showDot && (
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
            <SubMenu
              label={<h1 className="-ml-6">Ubah Akses</h1>}
              direction="left"
              className="p-2 text-white text-left"
              menuClassName="bg-gray-700 p-2"
            >
              <MenuRadioGroup
                value={getRole()}
                className="form-radio"
                onRadioChange={(e) => console.log(e.value)}
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
              </MenuRadioGroup>
            </SubMenu>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
