import React from 'react';
import JobCard from './JobCard';

export default function JobList({ jobs }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Posisi yang Tersedia</h2>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}