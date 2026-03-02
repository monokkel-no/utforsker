import { PageContent } from "./pageContent/PageContent";
import { PageHeader } from "./pageHeader/PageHeader";
import { PageLayout } from "./pageLayout/PageLayout";
import { PageBanner } from "./pageBanner/PageBanner";

export type { PageContentProps } from "./pageContent/PageContent";
export type { PageHeaderProps } from "./pageHeader/PageHeader";
export type { PageLayoutProps } from "./pageLayout/PageLayout";
export type { PageBannerProps } from "./pageBanner/PageBanner";

export const Page = {
  Content: PageContent,
  Header: PageHeader,
  Layout: PageLayout,
  Banner: PageBanner,
};
