import type { IconType } from "react-icons";

export type Menu = {
  label: string;
  to: string;
  icon: IconType;
  badge?: number;
  active?: boolean;
  isTitle?: boolean;
  children?: Menu[];
  defaultColor: string;
  value?: number;
};
