import CategoriesSection from "@/components/ui/CategoriesSection";
import DealsSection from "@/components/DealsSection";
import DiscoverGiftsSection from "@/components/DiscoverGiftsSection";
import EditorPicsSection, {
  EditorPicsSectionSmall,
} from "@/components/EditorPicsSection";
import HeroSection from "@/components/HeroSection";
import PicksSection from "@/components/PicksSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 max-w">
      <HeroSection />
      <DiscoverGiftsSection />
      <PicksSection />
      <DealsSection />
      <CategoriesSection />
      <EditorPicsSection />
      <EditorPicsSectionSmall />
    </div>
  );
}
