export const Content = (props: any) => {
  return <main className={`relative left-[200px] top-[65px] ${props.className}`}>{props.children}</main>;
};
