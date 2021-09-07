type PageRoute = {
  path: string;
  exact: boolean;
  component: () => JSX.Element;
};
