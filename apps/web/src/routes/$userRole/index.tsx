import { AppLayout } from "@/appComponents/appLayout/AppLayout";
import { RouterButton } from "@/appComponents/routerComponents";
import type { UserRole } from "@repo/core/types.js";
import { BookOpen, Icon } from "@repo/ui-components/icon";
import { Layout } from "@repo/ui-components/layout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/$userRole/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { userRole } = Route.useParams();

  const navigateToUserRole = (userRole: UserRole) => {
    navigate({ to: "/$userRole", params: { userRole } });
  };

  return (
    <AppLayout userRoleSwitch={{ userRole: userRole as UserRole, navigateToUserRole }}>
      <Layout.Box padding={16}>
        <RouterButton to="/$userRole/courses/$" variant="outlined" startIcon={<Icon icon={BookOpen} />}>
          Courses
        </RouterButton>
      </Layout.Box>
    </AppLayout>
  );
}
