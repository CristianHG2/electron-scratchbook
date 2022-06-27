import { MouseEventHandler, ReactNode } from "react";
import { FCParent } from "../../../types/react";
import useNewtonStore from "./hooks/useNewtonStore";

const NewtonLink: FCParent<{ href: string }> = ({ children, href }) => {
  const setComponent = useNewtonStore((state) => state.setComponent);

  const handler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setComponent(href, {});
  };

  return (
    <a href="src/react/components/newton/NewtonLink#" onClick={handler}>
      {children}
    </a>
  );
};

export default NewtonLink;
