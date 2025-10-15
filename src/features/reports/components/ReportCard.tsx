import { useEffect, useState } from "react";
import { ReportStatus, type Report } from "../types/report.types"
import { EditReportDialogButton } from "./EditReportDialogButton";
import { DeleteButton } from "./DeleteButton";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { UserType } from "@/features/auth/types";
import { SendReportToReviewDialogButton } from "./SendReportToReviewDialogButton";


export const ReportCard = ({ report, fetchReports }: { report: Report, fetchReports?: () => Promise<void> }) => {
    const { user } = useAuth();

    const [count, setCount] = useState<number>(0)
    const [statusMessage, setStatusMessage] = useState<string>("")
    useEffect(() => {
        const statusMessage = () => {
            switch (report.status) {
                case ReportStatus.PENDING:
                    setStatusMessage("Pendente");
                    break
                case ReportStatus.UNDER_REVIEW:
                    setCount(1)
                    setStatusMessage("Em Triagem");
                    break
                case ReportStatus.REJECTED:
                    setStatusMessage("Rejeitado");
                    break
                case ReportStatus.IN_PROGRESS:
                    setCount(2)
                    setStatusMessage("Em progresso");
                    break
                case ReportStatus.RESOLVED:
                    setCount(3)
                    setStatusMessage("Resolvido");
                    break
                default:
                    setStatusMessage("Desconhecido");
            }
        }
        statusMessage()
    })



    return (<div className="border-1 border-black-50 w-full rounded-md p-4">
        <div className=" flex justify-between">
            <div>
                <h3 className="text-left text-md font-bold">Denúncia nº <span className="font-bold">{report.id}</span></h3>
                <p className="text-sm font-light">{report.description}</p>
                <p className="mb-2">Status: {statusMessage}</p>
            </div>


            {count < 1 &&
                <div className="flex gap-2">
                    {
                        user?.type == UserType.USER
                            ? <>
                                <EditReportDialogButton report={report} fetchReports={fetchReports}/>
                                <DeleteButton id={report.id} fetchReports={fetchReports}/>
                            </>
                            : <>
                                {report.status === ReportStatus.PENDING && <SendReportToReviewDialogButton id={report.id} fetchReports={fetchReports} />}
                            </>
                    }
                </div>
            }
        </div>


        <div className="flex items-center justify-start gap-2 w-full mb-2">
            {Array.from({ length: 3 }).map((_, index) => <span key={index} className={`h-[4px] w-full bg-accent-foreground ${index + 1 <= count && count != 0 ? "opacity-100" : "opacity-25"}`}> </span>)}
        </div>
        <p>{report.midia.length} {report.midia.length > 1 ? "mídias" : "mídia"}</p>

    </div>)
}