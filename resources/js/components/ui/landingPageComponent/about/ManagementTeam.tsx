import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';
import { Linkedin } from 'lucide-react';

export type TeamMemberContent = {
    name: string;
    role: string;
    image?: string;
    description?: string;
};

export type TeamMemberCardProps = {
    id?: number;
    name: string;
    role?: string | null;
    photo?: string | null;
    image?: string | null;
    bio?: string | null;
    description?: string | null;
    linkedin?: string | null;
};

export type TeamContent = {
    badge: string;
    title: string;
    description: string;
    members: TeamMemberContent[];
};

const FALLBACK_AVATAR =
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop';

const TeamMemberCard = ({ name, role, photo, description, linkedin }: {
    name: string;
    role?: string;
    photo?: string | null;
    description?: string;
    linkedin?: string | null;
}) => (
    <motion.div
        className="rounded-2xl bg-white p-6 text-center shadow-md dark:bg-gray-800"
        variants={itemVariants}
        whileHover={{ y: -6 }}
    >
        <img
            src={photo || FALLBACK_AVATAR}
            alt={name}
            className="mx-auto mb-4 h-28 w-28 rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-500/20"
            loading="lazy"
        />
        <h5 className="text-xl font-bold text-gray-800 dark:text-white">{name}</h5>
        <p className="mb-3 text-blue-600 dark:text-blue-400">{role ?? 'Leadership Team'}</p>
        {description && <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        {linkedin ? (
            <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200 dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
            >
                <Linkedin className="h-4 w-4" />
                Terhubung
            </a>
        ) : (
            <span className="inline-flex items-center justify-center rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 dark:bg-gray-700 dark:text-gray-300">
                Lihat Detail
            </span>
        )}
    </motion.div>
);

const defaultMembers: TeamMemberContent[] = [
    {
        name: 'Andi Wijaya',
        role: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        description: 'Memimpin visi dan strategi perusahaan.',
    },
    {
        name: 'Sari Indrawati',
        role: 'Chief Strategy Officer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
        description: 'Mengawal pengembangan solusi dan orkestrasi program lintas industri.',
    },
];

const normalizeMembers = (
    members?: TeamMemberCardProps[],
    fallback?: TeamMemberContent[]
): Array<{
    key: string;
    name: string;
    role?: string;
    photo?: string | null;
    description?: string;
    linkedin?: string | null;
}> => {
    if (members && members.length) {
        return members.map((member) => ({
            key: `member-${member.id ?? member.name}`,
            name: member.name,
            role: member.role ?? undefined,
            photo: member.photo ?? member.image ?? undefined,
            description: member.bio ?? member.description ?? undefined,
            linkedin: member.linkedin ?? null,
        }));
    }

    const source = fallback && fallback.length ? fallback : defaultMembers;
    return source.map((member, index) => ({
        key: `content-${index}-${member.name}`,
        name: member.name,
        role: member.role,
        photo: member.image,
        description: member.description,
        linkedin: null,
    }));
};

const ManagementTeamSection = ({
    content,
    members,
}: {
    content: TeamContent;
    members?: TeamMemberCardProps[];
}) => {
    const resolvedMembers = normalizeMembers(members, content.members);

    return (
        <motion.section
            className="bg-gray-50 py-20 dark:bg-gray-900"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto px-6" variants={containerVariants}>
                <motion.div className="mb-12 text-center" variants={itemVariants}>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                        {content.badge ?? 'Tim Kami'}
                    </span>
                    <h2 className="mt-4 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
                        {content.title ?? 'Tim Manajemen'}
                    </h2>
                    <p className="mx-auto mt-2 max-w-3xl text-gray-600 dark:text-gray-400">{content.description}</p>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                    variants={containerVariants}
                >
                    {resolvedMembers.map((member) => (
                        <TeamMemberCard
                            key={member.key}
                            name={member.name}
                            role={member.role}
                            photo={member.photo}
                            description={member.description}
                            linkedin={member.linkedin}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default ManagementTeamSection;
