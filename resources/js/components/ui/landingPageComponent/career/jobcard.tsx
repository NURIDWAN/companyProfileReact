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
    : ['Kolaborasi lintas tim', 'Paham teknologi modern'];

  const postedLabel = job.posted_at ? new Date(job.posted_at).toLocaleDateString('id-ID') : 'Segera bergabung';
  const typeLabel = job.employment_type ?? 'Full-time';
  const salaryLabel = job.salary_range ?? 'Diskusikan bersama kami';

  return (
    <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="w-full">
      <Card className="w-full rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg dark:border-white/10 dark:bg-[#0f1c3c]/95 dark:text-white dark:shadow-xl dark:backdrop-blur">
        <CardHeader className="space-y-4 px-6 pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">{job.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-white/70">
                <span className="flex items-center gap-2"><Building className="h-4 w-4 text-slate-500 dark:text-white/70" />{job.department ?? 'Semua Divisi'}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-500 dark:text-white/70" />{job.location ?? 'Jakarta / Remote'}</span>
                <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-slate-500 dark:text-white/70" />{typeLabel}</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-500 dark:text-white/70" />{postedLabel}</span>
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge className="rounded-full bg-blue-50 text-blue-700 dark:bg-white/10 dark:text-white">{typeLabel}</Badge>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-white/70">
                <DollarSign className="h-4 w-4 text-slate-400 dark:text-white/70" />
                {salaryLabel}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-white/80">{job.description ?? 'Kami mencari talenta terbaik untuk bergabung dan berkembang bersama tim kami.'}</p>
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/60">Persyaratan Utama</h4>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div
                  key={`${req}-${index}`}
                  className="rounded-2xl bg-slate-100 px-4 py-2 text-xs leading-relaxed text-slate-700 sm:text-[11px] dark:bg-white/12 dark:text-white/90"
                >
                  <span className="break-words">{req}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="w-full rounded-full bg-blue-600 px-6 py-5 text-base font-semibold text-white hover:bg-blue-700" asChild>
              <Link href={route('career.apply', job.slug)}>Lamar Sekarang</Link>
            </Button>
            <Button variant="outline" className="w-full rounded-full border-slate-200 px-6 py-5 text-base font-semibold text-slate-900 hover:bg-slate-50 dark:border-white/40 dark:text-white dark:hover:bg-white/10" asChild>
              <Link href={route('career.show', job.slug)}>Lihat Detail</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
