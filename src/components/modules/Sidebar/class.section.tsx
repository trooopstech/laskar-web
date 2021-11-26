import useClassDetail from "hooks/useDetailClass";
import { MdAdd, MdExpandMore, MdExpandLess } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { FaQuestion, FaHashtag } from "react-icons/fa";
import {
  ControlledMenu,
  Menu,
  MenuDivider,
  MenuItem,
  useMenuState,
} from "@szhsin/react-menu";
import { useState } from "react";
import CreateChannelModal, {
  useCreateChannelModal,
} from "../Modal/CreateChannel";
import { useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import InviteChannelModal, {
  useInviteChannelModal,
} from "../Modal/InviteChannelMember";
import { dynamicSort } from "utils/sort";

interface ChannelMenuProps {
  channels: Channel[];
}

const ChannelButton = ({ channel }: { channel: Channel }) => {
  const { url } = useRouteMatch();
  const { isAdministrator, getUserClassMember, deleteClassChannel } =
    useClassDetail();
  const member = getUserClassMember();
  const creator = channel.creator;
  const { toggleMenu, ...menuProps } = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const makeRouteByChannelType = (channel: Channel) => {
    return (channel.channel_type as unknown as string).toLowerCase();
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      }}
    >
      <NavLink
        className="flex items-center cursor-pointer text-gray-300 hover:text-gray-200 my-1 hover:bg-gray-600 rounded-md pl-4 py-1"
        key={channel.id}
        to={`${url}/${makeRouteByChannelType(channel)}/${channel?.id}`}
        activeClassName="text-white bg-gray-700"
        exact
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
      {(isAdministrator() || creator?.oid === member?.oid) && (
        <ControlledMenu
          {...menuProps}
          menuClassName="bg-gray-700 p-2"
          anchorPoint={anchorPoint}
          onClose={() => toggleMenu(false)}
        >
          <MenuItem
            className={({ hover, active }) =>
              active
                ? "bg-gray-700 text-white p-2"
                : hover
                ? "bg-gray-600 text-white rounded-md p-2"
                : "bg-gray-700 text-white p-2"
            }
            onClick={() => deleteClassChannel(channel.id)}
          >
            Hapus
          </MenuItem>
        </ControlledMenu>
      )}
    </div>
  );
};

const ChannelMenu: React.FC<ChannelMenuProps> = ({ channels }) => {
  return (
    <div className="channel flex flex-col mb-4">
      {channels?.map((channel) => (
        <ChannelButton channel={channel} key={channel.id} />
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
  const { isInviteOpen, closeInvite, openInvite } = useInviteChannelModal();
  const [newChannel, setChannel] = useState<Channel>();

  if (category.hidden) {
    return (
      <>
        {category?.channels?.length > 0 && (
          <ChannelMenu channels={category?.channels} />
        )}
      </>
    );
  }

  const openInviteModal = (channel: Channel) => {
    setChannel(channel);
    openInvite();
  };

  return (
    <>
      <div
        className={`category w-full flex items-center justify-between cursor-pointer text-gray-300 hover:text-gray-200 px-1 ${
          collapse ? "mb-2" : ""
        }`}
      >
        <div
          className="flex items-center w-full cursor-pointer"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? <MdExpandLess /> : <MdExpandMore />}
          <p className="uppercase noselect">{category.name}</p>
        </div>
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
      </div>
      {!collapse && <ChannelMenu channels={category.channels} />}
      <CreateChannelModal
        open={isChannelOpen}
        onClose={closeChannel}
        data={{ categoryId: category.id, name: category.name }}
        openOther={openInviteModal}
      />
      <InviteChannelModal
        open={isInviteOpen}
        onClose={closeInvite}
        channel={newChannel}
      />
    </>
  );
};

const ClassSection = () => {
  const { classDetail, splitHiddenCategory } = useClassDetail();
  const { url } = useRouteMatch();

  return (
    <div className="py-2">
      <NavLink
        to={`${url}/post`}
        activeClassName="text-white bg-gray-800"
        className="flex items-center mb-4 mt-2 w-full hover:bg-gray-600 rounded-md px-2 py-1 cursor-pointer"
      >
        <CgFileDocument className="mr-3 text-gray-300 hover:text-gray-200 text-xl" />
        <p className="text-gray-300 hover:text-gray-200">halamanku</p>
      </NavLink>
      {classDetail &&
        splitHiddenCategory(classDetail?.channel_category, true).map(
          (category) => <CategoryMenu category={category} key={category.id} />
        )}
      {classDetail &&
        splitHiddenCategory(classDetail?.channel_category, false).map(
          (category) => <CategoryMenu category={category} key={category.id} />
        )}
    </div>
  );
};

export default ClassSection;
