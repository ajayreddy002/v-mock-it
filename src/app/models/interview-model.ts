export enum InterviewTabLabels {
    Upcoming = 'Upcoming',
    InProgress = 'In progress',
    Completed = 'Completed',
}
export interface Interview {
    title?: InterviewTabLabels;
    date: Date;
    startTime: Date;
    endTime: Date;
    selectedPlan: string;
    skills: string[];
    resume: string;
    _id: string;
    userId: string;
    status: string;
}