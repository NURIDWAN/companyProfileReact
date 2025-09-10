import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock, DollarSign, Building } from 'lucide-react';

export default function JobCard({ job }) {
  // ... (Isi komponen sama seperti jawaban sebelumnya)
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-900">{job.title}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
              <span className="flex items-center gap-1"><Building className="h-4 w-4" />{job.department}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.posted}</span>
              <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{job.experience}</span>
            </CardDescription>
          </div>
          <div className="text-right ml-4">
            <Badge variant="secondary" className="mb-2">{job.type}</Badge>
            <p className="text-sm text-gray-500 flex items-center gap-1"><DollarSign className="h-4 w-4" />{job.salary}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (<Badge key={index} variant="outline" className="text-xs">{req}</Badge>))}
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700"><Briefcase className="h-4 w-4 mr-2" />Lamar Sekarang</Button>
          <Button variant="outline">Lihat Detail</Button>
        </div>
      </CardContent>
    </Card>
  );
}