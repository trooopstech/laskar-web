import { useQuery } from "@apollo/client";
import Button from "components/elements/Button";
import LoginModal, {
  useLoginModal,
} from "components/modules/Modal/Auth/login.modal";
import RegisterModal, {
  useRegisterModal,
} from "components/modules/Modal/Auth/register.modal";
import useAuth from "hooks/useAuth";
import useJoinClass from "hooks/useJoinClass";
import useQueryParams from "hooks/useQueryParams";
import { useEffect, useState } from "react";
import { GET_CLASS_BY_TOKEN } from "schema/classes";
import logo from "assets/full_logo_white.png";

const Member = ({ color }: { color: string }) => {
  return (
    <div
      className="rounded-full h-12 w-12 first:ml-0 -ml-4"
      style={{ background: color }}
    ></div>
  );
};

const JoinClass = () => {
  // @ts-ignore
  const query = useQueryParams();

  const [isMember, setIsMember] = useState(false);
  const { isLoginOpen, closeLogin, openLogin } = useLoginModal();
  const { isRegisterOpen, closeRegister, openRegister } = useRegisterModal();
  const { joinByToken } = useJoinClass();
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
      joinByToken(query.get("token") as string);
    } else {
      window.localStorage.setItem("class", query.get("token") as string);
      openRegister();
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-800 text-white flex-col">
      <div className="w-full flex justify-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
          style={{ minWidth: "120px", maxWidth: "250px" }}
        />
      </div>
      <h1 className="text-3xl my-4 text-center">
        Gabung Kelas {data?.getClassByToken?.name} di Trooops
      </h1>
      <div className="flex items-center" id="members">
        {data?.getClassByToken?.class_member
          ?.slice(0, 8)
          .map((member: ClassMember) => (
            <Member color={member.member.color as string} />
          ))}
        {data?.getClassByToken?.class_member.length > 8 && (
          <p className="ml-2 font-bold">
            +{data?.getClassByToken?.class_member.length - 8}
          </p>
        )}
      </div>
      <div className="flex items-center justify-center">
        {data?.getClassByToken?.class_member?.length === 1 && (
          <p>
            {
              (data?.getClassByToken?.class_member[0] as ClassMember).member
                .name
            }{" "}
            sudah bergabung
          </p>
        )}
        {data?.getClassByToken?.class_member?.length > 1 && (
          <p>
            {
              (data?.getClassByToken?.class_member[0] as ClassMember).member
                .name
            }{" "}
            dan {data?.getClassByToken?.class_member?.length - 1} lainnya sudah
            bergabung
          </p>
        )}
      </div>
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
