import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { MapPin, Briefcase, Clock, DollarSign, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils/animations';

import type { JobPosition } from '@/components/ui/landingPageComponent/career/types';

interface JobCardProps {
  job: JobPosition;
}

export default function JobCard({ job }: JobCardProps) {
  const requirements = job.requirements && job.requirements.length
    ? job.requirements
    : ['Komitmen tinggi', 'Kemampuan kolaborasi'];

  const postedLabel = job.posted_at ? new Date(job.posted_at).toLocaleDateString('id-ID') : 'Segera Bergabung';
  const typeLabel = job.employment_type ?? 'Full-time';
  const salaryLabel = job.salary_range ?? 'Diskusikan bersama kami';

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
                <span className="flex items-center gap-1"><Building className="h-4 w-4" />{job.department ?? 'Semua Divisi'}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location ?? 'Flexible/Remote'}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{postedLabel}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{typeLabel}</span>
              </CardDescription>
            </div>
            <div className="text-right ml-4">
              <Badge variant="secondary" className="mb-2">{typeLabel}</Badge>
              <p className="text-sm text-gray-500 flex items-center gap-1"><DollarSign className="h-4 w-4" />{salaryLabel}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4 leading-relaxed">{job.description ?? 'Kami mencari talenta terbaik untuk bergabung dan berkembang bersama tim kami.'}</p>
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {requirements.map((req, index) => (
                <Badge key={`${req}-${index}`} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full"><Briefcase className="h-4 w-4 mr-2" />Lamar Sekarang</Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/career/${job.slug}`}>Lihat Detail</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
