import Input from "components/elements/Form/input";
import useChat from "context/Chat";
import { FaHashtag } from "react-icons/fa";

const About = () => {
  const { chatGroup } = useChat();

  return (
    <div className="w-full">
      <Input
        label="Nama Channel"
        type="text"
        name="name"
        disabled
        value={chatGroup?.channel.name}
        startAddorment={<FaHashtag className="text-xl font-bold" />}
      />
      <div className="flex flex-col my-2 w-full">
        <span className="font-bold mb-1">Dibuat Oleh</span>
        <div className="flex w-full items-center rounded-lg px-2 py-2 bg-gray-700">
          <div
            className="w-8 h-8 rounded-full mr-2"
            style={{
              backgroundColor:
                chatGroup?.channel.creator?.member.color ?? "pink",
            }}
          ></div>
          {chatGroup?.channel.creator?.member.name ?? "Admin"}
        </div>
      </div>
    </div>
  );
};

export default About;
