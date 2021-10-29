import Header from "components/modules/Header";
import Menubar from "components/modules/Menubar";
import CreateClassModal, {
  useCreateClassModal,
} from "components/modules/Modal/CreateClass";
import JoinClassModal, {
  useJoinClassModal,
} from "components/modules/Modal/JoinClass";
import OnboardingModal, {
  useOnboardingModal,
} from "components/modules/Modal/Onboarding";
import Sidebar from "components/modules/Sidebar";
import useStyle from "context/styleContext";
import useAuth from "hooks/useAuth";
import useWindowSize from "hooks/useWindowSize";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSwipeable } from "react-swipeable";

const PageLayout: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen } = useStyle();
  const { closeOnboarding, isOnboardingOpen, openOnboarding } =
    useOnboardingModal();
  const { openCreateClass, isCreateClassOpen, closeCreateClass } =
    useCreateClassModal();
  const { openJoinClass, isJoinClassOpen, closeJoinClass } =
    useJoinClassModal();
  const { width } = useWindowSize();
  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwipedRight: () => setIsSidebarOpen(true),
    onSwipedLeft: () => setIsSidebarOpen(false),
  });

  useEffect(() => {
    if (width > 640) {
      setIsSidebarOpen(false);
    }
  }, [width]);

  const isOnMemberPage = () => {
    return pathname.includes("member");
  };

  useEffect(() => {
    if (
      user?.birthdate === null ||
      user?.gender === null ||
      user?.phone_number === null
    ) {
      openOnboarding();
    }
  }, [user]);

  return (
    <div className="flex flex-row w-full">
      <div className="h-full w-full bg-gray-800">
        <Header />
        <div
          className="w-full flex"
          style={{ height: "calc(100% - 4rem)" }}
          {...handlers}
        >
          <Menubar />
          {((!isOnMemberPage() && width > 640) || isSidebarOpen) && <Sidebar />}
          {children}
          {/* {!isOnMemberPage() && <Rightbar />} */}
        </div>
        <OnboardingModal
          onClose={closeOnboarding}
          open={isOnboardingOpen}
          openCreateClass={openCreateClass}
          openJoinClass={openJoinClass}
        />
        <CreateClassModal
          open={isCreateClassOpen}
          onClose={closeCreateClass}
          openOther={openJoinClass}
        />
        <JoinClassModal
          open={isJoinClassOpen}
          onClose={closeJoinClass}
          openOther={openCreateClass}
        />
      </div>
    </div>
  );
};

export default PageLayout;
