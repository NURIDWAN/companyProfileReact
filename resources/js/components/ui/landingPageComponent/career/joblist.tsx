import React from 'react';
import JobCard from './jobcard';
import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';

interface JobListProps {
  jobs: JobPosition[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Posisi yang Tersedia
      </h2>
      <div className="flex flex-col gap-5">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
