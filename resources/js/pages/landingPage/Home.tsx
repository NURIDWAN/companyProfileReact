import AppLogo from "@/components/app-logo";
import { About } from "@/components/ui/landingPageComponent/home/about";
import { LatestArticles } from "@/components/ui/landingPageComponent/home/article";
import { FinalCTA } from "@/components/ui/landingPageComponent/home/finalCTA";
import { Footer } from "@/components/ui/landingPageComponent/footer";
import { HeroModern } from "@/components/ui/landingPageComponent/home/HeroHome";
import { CompanyNavbar } from "@/components/ui/landingPageComponent/navbar";
import { Services } from "@/components/ui/landingPageComponent/home/service";
import { Testimonial } from "@/components/ui/landingPageComponent/home/testimonial";
import LandingPageLayout from "@/layouts/landingPage-layouts";
import { LucideFoldHorizontal } from "lucide-react";





export default function HomePage() {
    return (
        <>
            <LandingPageLayout>

            
            <HeroModern />
            <About />
            <Services />
            <Testimonial />
            <LatestArticles />
            <FinalCTA />
            </LandingPageLayout>
        </>
    );
}
