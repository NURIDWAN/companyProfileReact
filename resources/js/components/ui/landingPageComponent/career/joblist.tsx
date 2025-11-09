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
      className="mx-auto w-full px-4 sm:px-6 lg:px-8"
    >
      <motion.h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white" variants={itemVariants}>
        Posisi yang Tersedia
      </motion.h2>
      <motion.div className="flex flex-col gap-5" variants={containerVariants}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </motion.div>
    </motion.div>
  );
}
