import useClassDetail from "hooks/useDetailClass";
import {
  MdAdd,
  MdExpandMore,
  MdExpandLess,
  MdAnnouncement,
} from "react-icons/md";
import { FaQuestion, FaHashtag } from "react-icons/fa";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import CreateChannelModal, {
  useCreateChannelModal,
} from "../Modal/createChannel.modal";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";

interface ChannelMenuProps {
  channels: Channel[];
}

const ChannelMenu: React.FC<ChannelMenuProps> = ({ channels }) => {
  const { url } = useRouteMatch();

  const makeRouteByChannelType = (channel: Channel) => {
    switch (channel.channel_type as unknown as string) {
      case "CHAT":
        return "chat";
      case "QNA":
        return "qna";
      default:
        return "chat";
    }
  };

  return (
    <div className="channel flex flex-col">
      {channels?.map((channel) => (
        <NavLink
          className="flex items-center cursor-pointer text-gray-400 hover:text-gray-300 my-1 hover:bg-gray-600 rounded-md pl-4"
          key={channel.id}
          to={`${url}/${makeRouteByChannelType(channel)}/${channel?.id}`}
          activeClassName="text-white bg-gray-700"
        >
          <p className="text-base text-gray-400 mr-2">
            {makeRouteByChannelType(channel) === "chat" ? (
              <FaHashtag />
            ) : (
              <FaQuestion />
            )}
          </p>
          <p className="text-base">{channel.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

interface CategoryMenuProps {
  category: ChannelCategory;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ category }) => {
  const [collapse, setCollapse] = useState(false);
  const { deleteCategoryChannel, isAdministrator } = useClassDetail();
  const { isChannelOpen, closeChannel, openChannel } = useCreateChannelModal();

  if (category.hidden) {
    return <div />;
  }

  return (
    <>
      <div
        className="category w-full flex items-center justify-between cursor-pointer text-gray-400 hover:text-gray-300 px-1"
        onClick={() => setCollapse(!collapse)}
      >
        <div className="flex items-center w-full cursor-pointer">
          {collapse ? <MdExpandLess /> : <MdExpandMore />}
          <p className="uppercase noselect">{category.name}</p>
        </div>
        {isAdministrator() && (
          <Menu
            menuButton={
              <button>
                <MdAdd style={{ fontWeight: "bold" }} />
              </button>
            }
            menuClassName="bg-gray-700 p-2 rounded-md"
          >
            <MenuItem
              className={({ hover, active }) =>
                active
                  ? "bg-gray-700 text-white p-2"
                  : hover
                  ? "bg-gray-600 text-white rounded-md p-2"
                  : "bg-gray-700 text-white p-2"
              }
              onClick={openChannel}
            >
              Buat Channel
            </MenuItem>
            <MenuDivider className="bg-gray-700" />
            <MenuItem
              className={({ hover, active }) =>
                active
                  ? "bg-gray-700 text-white p-2"
                  : hover
                  ? "bg-gray-600 text-white rounded-md p-2"
                  : "bg-gray-700 text-white p-2"
              }
              onClick={() => deleteCategoryChannel(category.id)}
            >
              Hapus Kategori
            </MenuItem>
          </Menu>
        )}
      </div>
      {!collapse && <ChannelMenu channels={category.channels} />}
      <CreateChannelModal
        open={isChannelOpen}
        onClose={closeChannel}
        data={{ categoryId: category.id }}
      />
    </>
  );
};

const ClassSection = () => {
  const { classDetail } = useClassDetail();

  return (
    <div className="py-2">
      <div className="flex items-center mb-4 mt-2 w-full hover:bg-gray-600 rounded-md px-2 py-1">
        <MdAnnouncement className="mr-3" />
        <p className="text-gray-400 hover:text-gray-300">Pengumuman</p>
      </div>
      {classDetail?.channel_category.map((category) => (
        <CategoryMenu category={category} key={category.id} />
      ))}
    </div>
  );
};

export default ClassSection;
