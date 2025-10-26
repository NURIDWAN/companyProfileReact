import React from 'react';
import JobCard from './jobcard';
import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animations';

interface JobListProps {
  jobs: JobPosition[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="text-2xl font-bold text-gray-900 mb-6" variants={itemVariants}>
        Posisi yang Tersedia
      </motion.h2>
      <motion.div className="grid gap-6" variants={containerVariants}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </motion.div>
    </motion.div>
  );
}
