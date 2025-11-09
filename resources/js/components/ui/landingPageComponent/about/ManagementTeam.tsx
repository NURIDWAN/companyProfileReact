import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

export type TeamMember = {
    name: string;
    role: string;
    image: string;
    description: string;
};

export type TeamContent = {
    badge: string;
    title: string;
    description: string;
    members: TeamMember[];
};

const TeamMemberCard = ({ name, role, image, description }: TeamMember) => (
    <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
        variants={itemVariants}
        whileHover={{ y: -6 }}
    >
        <img src={image || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'} alt={name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-100 dark:ring-blue-500/20" />
        <h5 className="text-xl font-bold text-gray-800 dark:text-white">{name}</h5>
        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{role}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{description}</p>
        <button className="bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-blue-400 font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
            Lihat Detail
        </button>
    </motion.div>
);

const ManagementTeamSection = ({ content }: { content: TeamContent }) => {
    const members = content.members?.length
        ? content.members
        : [
              {
                  name: 'Andi Wijaya',
                  role: 'Chief Executive Officer',
                  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
                  description: 'Memimpin visi dan strategi perusahaan.',
              },
          ];

    return (
        <motion.section
            className="py-20 bg-gray-50 dark:bg-gray-800"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div className="container mx-auto px-6" variants={containerVariants}>
                <motion.div className="text-center mb-12" variants={itemVariants}>
                    <span className="text-blue-600 font-semibold bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                        {content.badge ?? 'Tim Kami'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-4">
                        {content.title ?? 'Tim Manajemen'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-3xl mx-auto">
                        {content.description}
                    </p>
                </motion.div>
                <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center" variants={containerVariants}>
                    {members.map((member) => (
                        <TeamMemberCard key={member.name} {...member} />
                    ))}
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default ManagementTeamSection;
