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
    default:
      return (
        <h5 className="text-base" {...attributes}>
          {children}
        </h5>
      );
  }
};