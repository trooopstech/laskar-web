const HEADER_TITLE_MAP: { [key: string]: string } = {
  class: "Kelas",
  dashboard: "Dashboard",
};

export const headerTitles = (pathname: string): string => {
  const splitPath = pathname.split("/").slice(1);

  if (splitPath.length === 1) {
    return HEADER_TITLE_MAP[splitPath[0]] as string;
  }

  if (splitPath.length > 1) {
    return HEADER_TITLE_MAP[splitPath[1]] as string;
  }

  return "";
};

export const checkPath = (pathname: string): string => {
  const slicePath = pathname.split("/").slice(1);

  if (
    slicePath[0] === "dashboard" &&
    slicePath[1] === "class" &&
    slicePath.length > 2
  ) {
    return "CLASS_DETAIL";
  }

  return "NORMAL";
};
