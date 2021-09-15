import useClassDetail from "hooks/useDetailClass";
import { MdAdd, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FiHash } from "react-icons/fi";
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
  return (
    <div className="channel flex flex-col">
      {channels?.map((channel) => (
        <NavLink
          className="flex items-center cursor-pointer text-gray-300 hover:text-white my-1 hover:bg-gray-600 rounded-sm pl-4"
          key={channel.id}
          to={`${url}/${channel?.id}`}
          activeClassName="text-white bg-gray-600"
        >
          <p className="text-base text-gray-500 mr-2">
            <FiHash />
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
  const { deleteCategoryChannel } = useClassDetail();
  const { isChannelOpen, closeChannel, openChannel } = useCreateChannelModal();

  if (category.hidden) {
    return <div />;
  }

  return (
    <>
      <div
        className="category w-full flex items-center justify-between cursor-pointer text-gray-300 hover:text-white"
        onClick={() => setCollapse(!collapse)}
      >
        <div className="flex items-center w-full cursor-pointer">
          {collapse ? <MdExpandLess /> : <MdExpandMore />}
          <p className="uppercase noselect">{category.name}</p>
        </div>
        <Menu
          menuButton={
            <button>
              <MdAdd style={{ fontWeight: "bold" }} />
            </button>
          }
          menuClassName="bg-gray-600 p-2"
        >
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-600 text-white p-2"
                : hover
                ? "bg-gray-500 text-white rounded-sm p-2"
                : "bg-gray-600 text-white p-2"
            }
            onClick={openChannel}
          >
            Buat Channel
          </MenuItem>
          <MenuDivider className="bg-gray-500" />
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-600 text-white p-2"
                : hover
                ? "bg-gray-500 text-white rounded-sm p-2"
                : "bg-gray-600 text-white p-2"
            }
            onClick={() => deleteCategoryChannel(category.id)}
          >
            Hapus Kategori
          </MenuItem>
        </Menu>
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
      {classDetail?.channel_category.map((category) => (
        <CategoryMenu category={category} key={category.id} />
      ))}
    </div>
  );
};

export default ClassSection;
