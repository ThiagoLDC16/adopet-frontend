import type { User } from "@/features/auth/types"

export interface Midia {
    id: number
    type: string
    extension: string
    url: string
    reportId: number
}


export interface Report {
    id: number
    description: string
    details: string
    ocurrenceDate: Date,
    updatedAt: Date
    createdAt: Date
    midia: Midia[]
    location: string
    status: ReportStatus
    userId: number
}

export const ReportStatus = {
    PENDING: "PENDING",
    UNDER_REVIEW: "UNDER_REVIEW",
    REJECTED: "REJECTED",
    IN_PROGRESS: "IN_PROGRESS",
    RESOLVED: "RESOLVED"
} as const;

export type ReportStatus = typeof ReportStatus[keyof typeof ReportStatus];