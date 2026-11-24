import { getGitHubActivity, pickHighlights } from "@/lib/github-activity";
import { SiteFooter, SiteHeader } from "@/components/home/SiteChrome";
import {
  BuildAndContact,
  DevlogFeed,
  Hero,
  SelectedWork,
  StackStrip,
} from "@/components/home/HomeSections";

// GitHub activity is re-fetched at most every 5 minutes.
export const revalidate = 300;

export default async function Home() {
  const activity = await getGitHubActivity({ publicOnly: true });
  // Only public, link-able items are passed to the page.
  const highlights = pickHighlights(activity.lines, 5);

  return (
    <div className="flex min-h-screen flex-col bg-[#1f1f27] font-sans text-[#f1f4ef] antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[4px] focus:bg-[#00ce99] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#08231a]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <StackStrip />
        <SelectedWork />
        <DevlogFeed items={highlights} errorMessage={activity.errorMessage} />
        <BuildAndContact />
      </main>
      <SiteFooter />
    </div>
  );
}
