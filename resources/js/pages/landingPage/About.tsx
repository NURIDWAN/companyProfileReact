import AboutCompany from '@/components/ui/landingPageComponent/about/aboutCompany';
import CoreValuesSection from '@/components/ui/landingPageComponent/about/CoreValues';
import CTASection from '@/components/ui/landingPageComponent/about/CTASection';
import ManagementTeamSection from '@/components/ui/landingPageComponent/about/ManagementTeam';
import StatisticsSection from '@/components/ui/landingPageComponent/about/Statistics';
import VisionMissionSection from '@/components/ui/landingPageComponent/about/visionmision';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import React from 'react';



export default function AboutPage() {
    return (
        <LandingPageLayout>
            <AboutCompany />
            <VisionMissionSection />
            <CoreValuesSection />
            <StatisticsSection />
            <ManagementTeamSection />
            <CTASection />
        </LandingPageLayout>
    );
}