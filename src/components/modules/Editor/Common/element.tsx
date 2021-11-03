import PreviewImageModal, {
  usePreviewImageModal,
} from "components/modules/Modal/PreviewImage";
import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

// @ts-ignore
const Image = ({ attributes, children, element }) => {
  const { isPreviewOpen, openPreview, closePreview } = usePreviewImageModal();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div {...attributes}>
        <div contentEditable={false}>
          {!loaded && <Skeleton height={200} width={300} />}
          <img
            src={element.url}
            className={`${
              loaded ? "" : "hidden"
            } w-1/2 md:w-1/4 cursor-pointer`}
            alt="attachment"
            onLoad={() => setLoaded(true)}
            onClick={openPreview}
          />
          {children}
        </div>
      </div>
      <PreviewImageModal
        onClose={closePreview}
        open={isPreviewOpen}
        url={element.url}
      />
    </>
  );
};

// @ts-ignore
const Attachment = ({ attributes, children, element }) => {
  return (
    <>
      <div {...attributes}>
        <div contentEditable={false}>
          <a
            href={element.url}
            download
            className="w-1/2 lg:w-1/4 bg-gray-700 border border-gray-800 rounded-md flex items-center px-2 py-2 cursor-pointer"
          >
            <div className="h-full border-r border-gray-100 pr-2 mr-2">
              <MdAttachFile className="text-3xl" />
            </div>
            <p className="font-thin text-blue-400">
              {element.key?.split("/")[1]}
            </p>
          </a>
          {children}
        </div>
      </div>
    </>
  );
};

export const isUrl = (text: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(text);
};

// @ts-ignore
export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          className="bg-gray-600 p-1 text-white border-l-2 border-gray-50 italic"
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc ml-6" {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 className="text-3xl" {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 className="text-2xl" {...attributes}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 className="text-xl" {...attributes}>
          {children}
        </h3>
      );
    case "heading-four":
      return (
        <h4 className="text-large" {...attributes}>
          {children}
        </h4>
      );
    case "heading-five":
      return (
        <h5 className="text-base" {...attributes}>
          {children}
        </h5>
      );
    case "heading-six":
      return (
        <h6 className="text-xs" {...attributes}>
          {children}
        </h6>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "image":
      return (
        <Image element={element} attributes={attributes}>
          {children}
        </Image>
      );
    case "attachment":
      return (
        <Attachment element={element} attributes={attributes}>
          {children}
        </Attachment>
      );
    default:
      return (
        <h5 className="text-base" {...attributes}>
          {children}
        </h5>
      );
  }
};
