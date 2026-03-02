import { logoSvg } from "@repo/core/logoSvg.js";
import { UserRole } from "@repo/core/types.ts";
import { FormControlLabel } from "@repo/ui-components/formControlLabel";
import { Icon } from "@repo/ui-components/icon";
import { Page } from "@repo/ui-components/page";
import { Switch } from "@repo/ui-components/switch";
import type { ReactNode } from "react";
import { RouterIconButton } from "../routerComponents";

interface Props {
  userRoleSwitch: UserRoleSwitchProps;
  children: ReactNode;
}

export const AppLayout = ({ userRoleSwitch, children }: Props) => (
  <Page.Layout
    header={
      <Page.Header
        home={
          <RouterIconButton to="/$userRole" params={{ userRole: userRoleSwitch.userRole }} color="primary">
            <Icon icon={logoSvg} />
          </RouterIconButton>
        }
        tools={<UserRoleSwitch {...userRoleSwitch} />}
      />
    }
    content={<Page.Content>{children}</Page.Content>}
  />
);

interface UserRoleSwitchProps {
  userRole: UserRole;
  navigateToUserRole: (userRole: UserRole) => void;
}

const UserRoleSwitch = ({ userRole, navigateToUserRole }: UserRoleSwitchProps) => (
  <FormControlLabel
    label="Student"
    control={
      <Switch
        checked={userRole === UserRole.Student}
        onChange={({ target }) => navigateToUserRole(target.checked ? UserRole.Student : UserRole.Teacher)}
      />
    }
  />
);
