import useClassDetail from "hooks/useDetailClass";
import logo from "assets/full_logo_white.png";

const NonChannel = () => {
  const { classDetail } = useClassDetail();

  return (
    <div className="container p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center">
        <img
          src={logo}
          alt="logo"
          className="w-1/2"
          style={{ minWidth: "120px", maxWidth: "250px" }}
        />
      </div>
      <h1 className="text-xl">{classDetail?.name}</h1>
    </div>
  );
};
export default NonChannel;
