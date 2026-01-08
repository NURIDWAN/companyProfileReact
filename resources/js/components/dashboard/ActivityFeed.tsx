import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Activity, User, Settings, FileText, LogIn, LogOut, Package, Briefcase, MessageSquare, Users, AlertCircle, Clock, Monitor, Globe, ChevronRight } from "lucide-react";

export type ActivityItem = {
    id: number;
    description: string;
    causer_name: string;
    subject_type: string;
    subject_id?: number | null;
    properties?: Record<string, unknown>;
    created_at: string;
    created_at_full: string;
};

type Props = {
    activities: ActivityItem[];
};

const getActivityIcon = (description: string, subjectType: string) => {
    if (description.toLowerCase().includes('logged in')) return <LogIn className="h-4 w-4 text-green-500" />;
    if (description.toLowerCase().includes('logged out')) return <LogOut className="h-4 w-4 text-orange-500" />;
    if (description.toLowerCase().includes('failed login')) return <AlertCircle className="h-4 w-4 text-red-500" />;
    if (subjectType === 'CompanySetting' || description.toLowerCase().includes('setting')) return <Settings className="h-4 w-4 text-blue-500" />;
    if (subjectType === 'Page') return <FileText className="h-4 w-4 text-purple-500" />;
    if (subjectType === 'Product') return <Package className="h-4 w-4 text-emerald-500" />;
    if (subjectType === 'Service' || subjectType === 'Project') return <Briefcase className="h-4 w-4 text-cyan-500" />;
    if (subjectType === 'Testimonial') return <MessageSquare className="h-4 w-4 text-pink-500" />;
    if (subjectType === 'TeamMember' || subjectType === 'User') return <Users className="h-4 w-4 text-indigo-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
};

const getEventBadge = (description: string) => {
    if (description.toLowerCase().includes('created')) return <Badge variant="default" className="bg-green-100 text-green-700 text-[10px]">Created</Badge>;
    if (description.toLowerCase().includes('updated')) return <Badge variant="default" className="bg-blue-100 text-blue-700 text-[10px]">Updated</Badge>;
    if (description.toLowerCase().includes('deleted')) return <Badge variant="default" className="bg-red-100 text-red-700 text-[10px]">Deleted</Badge>;
    if (description.toLowerCase().includes('logged in')) return <Badge variant="default" className="bg-green-100 text-green-700 text-[10px]">Login</Badge>;
    if (description.toLowerCase().includes('logged out')) return <Badge variant="default" className="bg-orange-100 text-orange-700 text-[10px]">Logout</Badge>;
    if (description.toLowerCase().includes('failed')) return <Badge variant="default" className="bg-red-100 text-red-700 text-[10px]">Failed</Badge>;
    return null;
};

// Helper to render properties nicely
const renderPropertyValue = (value: unknown): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
};

export default function ActivityFeed({ activities }: Props) {
    const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleActivityClick = (activity: ActivityItem) => {
        setSelectedActivity(activity);
        setIsOpen(true);
    };

    const properties = selectedActivity?.properties as Record<string, unknown> | undefined;
    const oldValues = properties?.old as Record<string, unknown> | undefined;
    const newValues = properties?.attributes as Record<string, unknown> | undefined;

    return (
        <>
            <Card className="h-full">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Activity className="h-5 w-5 text-primary" />
                        Aktivitas Terbaru
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <ScrollArea className="h-[380px] pr-3">
                        <div className="space-y-3">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    onClick={() => handleActivityClick(activity)}
                                    className="flex gap-3 py-2 border-b border-border/50 last:border-0 cursor-pointer hover:bg-muted/50 rounded-lg px-2 -mx-2 transition-colors group"
                                >
                                    <div className="mt-0.5 flex-shrink-0 rounded-full p-1.5 bg-muted/50">
                                        {getActivityIcon(activity.description, activity.subject_type)}
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <p className="text-sm font-medium leading-tight truncate" title={activity.description}>
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {activity.causer_name}
                                            </span>
                                            <span className="text-muted-foreground/50">•</span>
                                            <span title={activity.created_at_full}>{activity.created_at}</span>
                                            {getEventBadge(activity.description)}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {activity.subject_type !== 'N/A' && !activity.description.toLowerCase().includes('logged') && !activity.description.toLowerCase().includes('failed') && (
                                            <Badge variant="outline" className="text-[10px] h-5 flex-shrink-0">
                                                {activity.subject_type}
                                            </Badge>
                                        )}
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                                    </div>
                                </div>
                            ))}
                            {activities.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                                    <Activity className="h-10 w-10 mb-2 opacity-50" />
                                    <p className="text-sm">Belum ada aktivitas</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {selectedActivity && getActivityIcon(selectedActivity.description, selectedActivity.subject_type)}
                            Detail Aktivitas
                        </DialogTitle>
                        <DialogDescription>
                            {selectedActivity?.description}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedActivity && (
                        <div className="space-y-4">
                            {/* General Info */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>Diubah oleh</span>
                                </div>
                                <div className="font-medium">{selectedActivity.causer_name}</div>

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Waktu</span>
                                </div>
                                <div className="font-medium">{selectedActivity.created_at_full}</div>

                                {selectedActivity.subject_type !== 'N/A' ? (
                                    <>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <FileText className="h-4 w-4" />
                                            <span>Tipe</span>
                                        </div>
                                        <div className="font-medium">{selectedActivity.subject_type}</div>
                                    </>
                                ) : null}

                                {selectedActivity.subject_id ? (
                                    <>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <span className="text-xs">ID</span>
                                        </div>
                                        <div className="font-medium">#{selectedActivity.subject_id}</div>
                                    </>
                                ) : null}
                            </div>

                            {/* IP & User Agent for login events */}
                            {properties?.ip ? (
                                <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Informasi Sesi</p>
                                    <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Globe className="h-3 w-3" />
                                            <span>IP Address</span>
                                        </div>
                                        <div className="font-mono text-xs">{String(properties.ip)}</div>

                                        {properties.user_agent ? (
                                            <>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Monitor className="h-3 w-3" />
                                                    <span>Browser</span>
                                                </div>
                                                <div className="font-mono text-xs truncate" title={String(properties.user_agent)}>
                                                    {String(properties.user_agent).slice(0, 50)}...
                                                </div>
                                            </>
                                        ) : null}

                                        {properties.email ? (
                                            <>
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <User className="h-3 w-3" />
                                                    <span>Email</span>
                                                </div>
                                                <div className="font-mono text-xs">{String(properties.email)}</div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            ) : null}

                            {/* Changed Values */}
                            {(oldValues || newValues) ? (
                                <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Perubahan Data</p>
                                    <div className="space-y-2">
                                        {Object.keys(newValues || oldValues || {}).map((key) => (
                                            <div key={key} className="text-sm">
                                                <p className="font-medium text-foreground mb-1">{key}</p>
                                                <div className="flex gap-2 text-xs">
                                                    {oldValues?.[key] !== undefined && (
                                                        <div className="flex-1 rounded bg-red-50 dark:bg-red-950/30 px-2 py-1 text-red-700 dark:text-red-300">
                                                            <span className="text-[10px] uppercase text-red-500 dark:text-red-400">Sebelum:</span>
                                                            <pre className="mt-0.5 whitespace-pre-wrap break-all font-mono">
                                                                {renderPropertyValue(oldValues[key])}
                                                            </pre>
                                                        </div>
                                                    )}
                                                    {newValues?.[key] !== undefined && (
                                                        <div className="flex-1 rounded bg-green-50 dark:bg-green-950/30 px-2 py-1 text-green-700 dark:text-green-300">
                                                            <span className="text-[10px] uppercase text-green-500 dark:text-green-400">Sesudah:</span>
                                                            <pre className="mt-0.5 whitespace-pre-wrap break-all font-mono">
                                                                {renderPropertyValue(newValues[key])}
                                                            </pre>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {/* Status Badge */}
                            <div className="flex justify-end">
                                {getEventBadge(selectedActivity.description)}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
