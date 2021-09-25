import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  content: string;
}

interface AccordionProps {
  item: AccordionItemProps[];
}

const AccordionItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`text-xl font-thin p-3 flex justify-between border-gray-100 cursor-pointer ${
          open ? "border-b-0" : "border-b"
        }`}
        role="alert"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {open && (
        <div
          className="p-3 pt-1 border-gray-100 border-b text-gray-500"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </>
  );
};

const Accordion = ({ item }: AccordionProps) => {
  return (
    <div>
      {item.map((i: AccordionItemProps) => (
        <AccordionItem content={i.content} title={i.title} key={i.title} />
      ))}
    </div>
  );
};

export default Accordion;
