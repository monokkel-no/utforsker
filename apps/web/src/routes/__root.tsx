import { UIProvider } from "@repo/ui-components/uiProvider";
import { ThemeProvider } from "@repo/ui-theme/themeProvider/ThemeProvider.tsx";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { faviconLinks, faviconMeta } from "virtual:favicons";

const RootDocument = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body className="repo-light-theme">
      <ThemeProvider>
        <UIProvider>{children}</UIProvider>
      </ThemeProvider>
      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
      />
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Utforsker" },
      ...faviconMeta,
    ],
    links: faviconLinks,
  }),
  shellComponent: RootDocument,
});
