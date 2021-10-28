import useClassDetail from "hooks/useDetailClass";

const NonChannel = () => {
  const { classDetail } = useClassDetail();

  return (
    <div className="container p-4 flex items-center justify-center">
      <h1 className="text-xl">{classDetail?.name}</h1>
    </div>
  );
};
export default NonChannel;
