import AboutCompany, { type AboutOverviewContent } from '@/components/ui/landingPageComponent/about/aboutCompany';
import CoreValuesSection, { type CoreValue } from '@/components/ui/landingPageComponent/about/CoreValues';
import CTASection, { type AboutCtaContent } from '@/components/ui/landingPageComponent/about/CTASection';
import ManagementTeamSection, { type TeamContent, type TeamMemberCardProps } from '@/components/ui/landingPageComponent/about/ManagementTeam';
import StatisticsSection, { type StatisticsContent } from '@/components/ui/landingPageComponent/about/Statistics';
import VisionMissionSection, { type AboutVisionContent } from '@/components/ui/landingPageComponent/about/visionmision';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { usePage } from '@inertiajs/react';

type SectionKey = 'overview' | 'vision' | 'values' | 'statistics' | 'team' | 'cta';
type SectionVisibility = Partial<Record<SectionKey, boolean>>;

type AboutPageProps = {
    overview: AboutOverviewContent;
    vision: AboutVisionContent;
    values: CoreValue[];
    statistics: StatisticsContent;
    team: TeamContent;
    teamMembers?: TeamMemberCardProps[];
    cta: AboutCtaContent;
    sections?: SectionVisibility;
};

export default function AboutPage() {
    const { overview, vision, values, statistics, team, teamMembers = [], cta, sections } = usePage<AboutPageProps>().props;
    const visibility = sections ?? {};
    const isEnabled = (key: SectionKey) => visibility[key] ?? true;

    return (
        <LandingPageLayout>
            {isEnabled('overview') && (
                <div id="profil">
                    <AboutCompany content={overview} />
                </div>
            )}
            {isEnabled('vision') && (
                <div id="visi-misi">
                    <VisionMissionSection content={vision} />
                </div>
            )}
            {isEnabled('values') && (
                <div id="akreditasi-institusi">
                    <CoreValuesSection values={values} />
                </div>
            )}
            {isEnabled('statistics') && (
                <div id="sambutan">
                    <StatisticsSection content={statistics} />
                </div>
            )}
            {isEnabled('team') && (
                <div id="struktur-organisasi">
                    <ManagementTeamSection content={team} members={teamMembers} />
                </div>
            )}
            {isEnabled('cta') && <CTASection content={cta} />}
        </LandingPageLayout>
    );
}
