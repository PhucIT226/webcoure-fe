import type { IconType } from "react-icons";

export type Menu = {
  label: string;
  to: string;
  icon: IconType;
  active?: boolean;
  defaultColor: string;
};
