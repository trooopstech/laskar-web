export const getInitials = (name: string): string => {
  if (!name) {
    return "";
  }

  const initials = name?.split(" ") ?? [];
  let res = "";

  if (initials.length > 1) {
    res = (initials?.shift() as string)?.charAt(0) + initials?.pop()?.charAt(0);
  } else {
    res = name.substring(0, 2);
  }

  return res?.toUpperCase();
};
