import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingPageLayout from '@/layouts/landingPage-layouts';
import { Building, Calendar, CheckCircle, Clock, Code, ExternalLink, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

// Sample data for projects
const projects = [
  {
    id: 1,
    title: 'Aplikasi Mobile Banking BankDigital',
    client: 'PT Bank Digital Indonesia',
    category: 'Mobile Application',
    status: 'Completed',
    description:
      'Pengembangan aplikasi mobile banking dengan fitur lengkap termasuk transfer, pembayaran, dan investasi.',
    image: 'https://picsum.photos/seed/bankdigital/500/300',
    duration: '8 bulan',
    teamSize: '12 orang',
    budget: 'Rp 2.5 Miliar',
    completedDate: '2024-01-15',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase'],
    features: ['Biometric Authentication', 'Real-time Notifications', 'Investment Portfolio', 'QR Payment'],
    results: {
      userGrowth: '150%',
      transactionVolume: 'Rp 500M/bulan',
      userRating: '4.8/5',
    },
    testimonial: {
      text: 'Tim Hancode memberikan solusi yang sangat profesional dan sesuai dengan kebutuhan kami.',
      author: 'Budi Santoso',
      position: 'IT Director, PT Bank Digital Indonesia',
    },
  },
  {
    id: 2,
    title: 'Platform E-Commerce TechMart',
    client: 'PT Teknologi Perdagangan',
    category: 'Web Application',
    status: 'Completed',
    description:
      'Platform e-commerce B2B dengan sistem inventory management dan analytics dashboard yang comprehensive.',
    image: 'https://picsum.photos/seed/techmart/500/300',
    duration: '6 bulan',
    teamSize: '8 orang',
    budget: 'Rp 1.2 Miliar',
    completedDate: '2023-11-20',
    technologies: ['React', 'Laravel', 'MySQL', 'Redis'],
    features: ['Multi-vendor System', 'Advanced Analytics', 'Payment Gateway', 'Mobile Responsive'],
    results: {
      salesIncrease: '200%',
      merchantGrowth: '300+',
      systemUptime: '99.9%',
    },
    testimonial: {
      text: 'Platform yang dikembangkan sangat membantu meningkatkan efisiensi bisnis kami.',
      author: 'Sari Dewi',
      position: 'CEO, PT Teknologi Perdagangan',
    },
  },
  {
    id: 3,
    title: 'Smart City Dashboard Jakarta',
    client: 'Pemerintah DKI Jakarta',
    category: 'IoT Application',
    status: 'In Progress',
    description:
      'Dashboard monitoring smart city dengan integrasi berbagai sensor IoT untuk monitoring traffic, air quality, dan utilities.',
    image: 'https://picsum.photos/seed/smartcity/500/300',
    duration: '12 bulan',
    teamSize: '15 orang',
    budget: 'Rp 5.8 Miliar',
    completedDate: null,
    progress: 75,
    technologies: ['Angular', 'Python', 'InfluxDB', 'Grafana'],
    features: ['Real-time Monitoring', 'Predictive Analytics', 'Mobile Dashboard', 'Alert System'],
    results: {
      sensorsDeployed: '1000+',
      dataPoints: '10M/day',
      responseTime: '<100ms',
    },
  },
  {
    id: 4,
    title: 'Learning Platform EduTech',
    client: 'Universitas Digital Indonesia',
    category: 'Education Platform',
    status: 'Completed',
    description:
      'Platform pembelajaran online dengan video streaming, interactive content, dan sistem assessment yang comprehensive.',
    image: 'https://picsum.photos/seed/edutech/500/300',
    duration: '5 bulan',
    teamSize: '10 orang',
    budget: 'Rp 800 juta',
    completedDate: '2023-09-15',
    technologies: ['Vue.js', 'Python Django', 'PostgreSQL', 'WebRTC'],
    features: ['Video Streaming', 'Interactive Quizzes', 'Discussion Forums', 'Progress Tracking'],
    results: {
      activeUsers: '50,000+',
      courseCompletion: '85%',
      satisfaction: '4.7/5',
    },
    testimonial: {
      text: 'Solusi pembelajaran yang inovatif dan user-friendly untuk mahasiswa kami.',
      author: 'Dr. Ahmad Rahman',
      position: 'Rektor, Universitas Digital Indonesia',
    },
  },
];

const ProyekPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusOptions = ['All', 'Completed', 'In Progress'];

  const filteredProjects =
    selectedStatus === 'All'
      ? projects
      : projects.filter((project) => project.status === selectedStatus);

  return (
    <LandingPageLayout>

    <div className="mx-auto max-w-7xl space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Portfolio Proyek</h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Lihat berbagai proyek yang telah kami kerjakan untuk berbagai klien.
          Setiap proyek menunjukkan komitmen kami terhadap kualitas dan inovasi.
        </p>
      </div>

      {/* Project Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {projects.filter((p) => p.status === 'Completed').length}
          </h3>
          <p className="text-sm text-gray-600">Proyek Selesai</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {projects.filter((p) => p.status === 'In Progress').length}
          </h3>
          <p className="text-sm text-gray-600">Sedang Berjalan</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">45+</h3>
          <p className="text-sm text-gray-600">Tim Ahli</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">98%</h3>
          <p className="text-sm text-gray-600">Success Rate</p>
        </Card>
      </div>

      {/* Status Filter */}
      <div className="flex justify-center gap-2">
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            onClick={() => setSelectedStatus(status)}
            size="sm"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Project Image */}
              <div className="relative aspect-video w-full bg-gray-100">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200">
                    <Code className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={project.status === 'Completed' ? 'default' : 'secondary'}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {project.category}
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-gray-600">{project.description}</p>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="flex items-center gap-1 font-medium text-gray-700">
                        <Building className="h-4 w-4" />
                        Klien:
                      </p>
                      <p className="text-gray-600">{project.client}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 font-medium text-gray-700">
                        <Calendar className="h-4 w-4" />
                        Durasi:
                      </p>
                      <p className="text-gray-600">{project.duration}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 font-medium text-gray-700">
                        <Users className="h-4 w-4" />
                        Tim:
                      </p>
                      <p className="text-gray-600">{project.teamSize}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Budget:</p>
                      <p className="text-gray-600">{project.budget}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <p className="mb-2 font-medium text-gray-700">Teknologi:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <p className="mb-2 font-medium text-gray-700">Fitur Utama:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  {project.results && (
                    <div>
                      <p className="mb-2 font-medium text-gray-700">Hasil:</p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(project.results).map(([key, value], index) => (
                          <div
                            key={index}
                            className="rounded-lg bg-gray-50 p-3"
                          >
                            <p className="text-lg font-bold text-blue-600">
                              {value}
                            </p>
                            <p className="text-xs text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progress for ongoing projects */}
                  {project.progress && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm text-gray-600">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Testimonial */}
                  {project.testimonial && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <p className="mb-2 text-sm text-gray-700 italic">
                          "{project.testimonial.text}"
                        </p>
                        <div className="text-xs text-gray-600">
                          <p className="font-medium">
                            {project.testimonial.author}
                          </p>
                          <p>{project.testimonial.position}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Completion Date */}
                  {project.completedDate && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Selesai:{' '}
                      {new Date(project.completedDate).toLocaleDateString(
                        'id-ID'
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <Button className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Lihat Detail Proyek
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </LandingPageLayout>
  );
};

export default ProyekPage;
