import { Picker } from "emoji-mart";

const EmojiPicker = ({
  open,
  setClose,
  setMessage,
}: {
  open: number;
  setClose: () => void;
  setMessage: (val: string) => void;
}) => {
  if (open > 0) {
    return (
      <div
        className="fixed h-screen w-screen bg-black bg-opacity-75 top-0 left-0 z-10 shadow-sm flex justify-center items-center"
        onClick={setClose}
      >
        <div className="rounded-sm z-100" onClick={(e) => e.stopPropagation()}>
          <Picker
            // @ts-ignore
            onSelect={(e) => setMessage(e.native)}
            theme="dark"
            emoji=""
          />
        </div>
      </div>
    );
  }
  return null;
};

export default EmojiPicker;
