export interface JobPosition {
    id: number;
    title: string;
    slug: string;
    department?: string | null;
    location?: string | null;
    employment_type?: string | null;
    salary_range?: string | null;
    description?: string | null;
    requirements?: string[] | null;
    posted_at?: string | null;
}
