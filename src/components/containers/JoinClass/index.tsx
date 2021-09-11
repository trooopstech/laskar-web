import { useQuery } from "@apollo/client";
import Button from "components/elements/Button";
import LoginModal, {
  useLoginModal,
} from "components/modules/Modal/login.modal";
import RegisterModal, {
  useRegisterModal,
} from "components/modules/Modal/register.modal";
import useAuth from "hooks/useAuth";
import useJoinClass from "hooks/useJoinClass";
import useQueryParams from "hooks/useQueryParams";
import { useEffect, useState } from "react";
import { GET_CLASS_BY_TOKEN } from "schema/classes";

const JoinClass = () => {
  // @ts-ignore
  const query = useQueryParams();

  const [isMember, setIsMember] = useState(false);
  const { isLoginOpen, closeLogin, openLogin } = useLoginModal();
  const { isRegisterOpen, closeRegister, openRegister } = useRegisterModal();
  const { join } = useJoinClass();
  const { data } = useQuery(GET_CLASS_BY_TOKEN, {
    variables: { token: query.get("token") },
  });
  const { user } = useAuth();

  const checkIsUserAlreadyMember = () => {
    if (data && user) {
      const classMember = data.getClassByToken.class_member;
      if (
        classMember.filter(
          (d: { member: { id: string } }) => d.member.id === user.id
        ).length > 0
      ) {
        setIsMember(true);
      }
    }
  };

  useEffect(() => {
    checkIsUserAlreadyMember();
  }, [data, user]);

  const joinAction = () => {
    if (user) {
      join(data.getClassByToken.id);
    } else {
      window.localStorage.setItem("class", data.getClassByToken.id);
      openRegister();
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-800 text-white flex-col">
      <h1 className="text-3xl">
        Bergabung dengan Kelas {data?.getClassByToken?.name}?
      </h1>
      <div className="flex mt-4 flex-col">
        <Button variant="primary" disabled={isMember} onClick={joinAction}>
          {isMember ? "Sudah Bergabung" : "Gabung"}
        </Button>
        {isMember && (
          <Button variant="text" href="/dashboard">
            Kembali
          </Button>
        )}
      </div>
      <LoginModal
        open={isLoginOpen}
        onClose={closeLogin}
        openOther={openRegister}
      />
      <RegisterModal
        open={isRegisterOpen}
        onClose={closeRegister}
        openOther={openLogin}
      />
    </div>
  );
};

export default JoinClass;
