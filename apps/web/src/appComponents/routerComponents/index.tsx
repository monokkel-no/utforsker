/** biome-ignore-all lint/suspicious/noExplicitAny: "" */
import type { FileRoutesByTo } from "../../routeTree.gen";
import { Button } from "@repo/ui-components/button";
import { IconButton } from "@repo/ui-components/iconButton";
// import { List } from "@repo/ui-components/list";
// import { MenuItem } from "@repo/ui-components/menu";
// import { StepButton } from "@repo/ui-components/stepper";
import { createLink } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type To = keyof FileRoutesByTo;

interface Props {
  to?: To;
  params?: Record<string, string | number>;
}

// Button

const LinkedButton = createLink(Button<"a">);

type RouterButtonProps = Props & Omit<ComponentProps<typeof LinkedButton>, "to" | "params">;

export const RouterButton = ({ to, params, ...props }: RouterButtonProps) => {
  return to ? <LinkedButton component="a" to={to} params={params as any} preload="intent" {...props} /> : null;
};

// ListItemButton

// const LinkedListItemButton = createLink(List.ListItemButton<"a">);

// type RouterListItemButtonProps = Props &
//   Omit<ComponentProps<typeof LinkedListItemButton>, "component" | "to" | "params">;

// export const RouterListItemButton = ({ to, params, ...props }: RouterListItemButtonProps) => {
//   return <LinkedListItemButton component="a" to={to} params={params as any} preload="intent" {...props} />;
// };

// IconButton

const LinkedIconButton = createLink(IconButton<"a">);

type RouterIconButtonProps = Props & Omit<ComponentProps<typeof LinkedIconButton>, "to" | "params">;

export const RouterIconButton = ({ to, params, ...props }: RouterIconButtonProps) => {
  return to ? <LinkedIconButton component="a" to={to} params={params as any} preload="intent" {...props} /> : null;
};
// MenuItem

// const LinkedMenuItem = createLink(MenuItem<"a">);

// type RouterMenuItemProps = Props & Omit<ComponentProps<typeof LinkedMenuItem>, "to" | "params">;

// export const RouterMenuItem = ({ to, params, ...props }: RouterMenuItemProps) => {
//   return to ? <LinkedMenuItem component="a" to={to} params={params as any} preload="intent" {...props} /> : null;
// };

// StepButton

// const LinkedStepButton = createLink(StepButton<"a">);

// type RouterStepButtonProps = Props & Omit<ComponentProps<typeof LinkedStepButton>, "to" | "params">;

// export const RouterStepButton = ({ to, params, ...props }: RouterStepButtonProps) => {
//   return to ? <LinkedStepButton component="a" to={to} params={params as any} preload="intent" {...props} /> : null;
// };

// Navigate

// interface NavigateOptions {
//   to: To;
//   params?: Record<string, string | number>;
//   search?: Record<string, string | number>;
// }

// export const useRouterNavigate = () => {
//   const navigate = useNavigate();

//   return (options: NavigateOptions) => {
//     return navigate(options);
//   };
// };
