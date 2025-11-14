import { usePage } from '@inertiajs/react';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import AboutCompany, { type AboutOverviewContent } from '@/components/ui/landingPageComponent/about/aboutCompany';
import VisionMissionSection, { type AboutVisionContent } from '@/components/ui/landingPageComponent/about/visionmision';
import CoreValuesSection, { type CoreValue } from '@/components/ui/landingPageComponent/about/CoreValues';
import StatisticsSection, { type StatisticsContent } from '@/components/ui/landingPageComponent/about/Statistics';
import ManagementTeamSection, { type TeamContent, type TeamMemberCardProps } from '@/components/ui/landingPageComponent/about/ManagementTeam';
import CTASection, { type AboutCtaContent } from '@/components/ui/landingPageComponent/about/CTASection';
import React from 'react';

type AboutPageProps = {
    overview: AboutOverviewContent;
    vision: AboutVisionContent;
    values: CoreValue[];
    statistics: StatisticsContent;
    team: TeamContent;
    teamMembers?: TeamMemberCardProps[];
    cta: AboutCtaContent;
};

export default function AboutPage() {
    const { overview, vision, values, statistics, team, teamMembers = [], cta } = usePage<AboutPageProps>().props;

    return (
        <LandingPageLayout>
            <AboutCompany content={overview} />
            <VisionMissionSection content={vision} />
            <CoreValuesSection values={values} />
            <StatisticsSection content={statistics} />
            <ManagementTeamSection content={team} members={teamMembers} />
            <CTASection content={cta} />
        </LandingPageLayout>
    );
}
