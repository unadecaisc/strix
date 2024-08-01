import type { ComponentType } from "svelte";

export type BreadCrumItemType = {
  path: string;
  title: string;
  isHome?: boolean;
};

export type PageConfigType = {
  title: string;
  component: ComponentType;
  open?: boolean;
};

export type PageRequestsType = {
  title: string;
  component: ComponentType;
  open?: boolean;
};
