import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import type { Report } from "../types/report.types";
import { EditReportDialog } from "./EditReportDialog";

export function EditReportDialogButton({ report }: { report: Report }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Pencil size={14} /></Button>
            </DialogTrigger>

            <EditReportDialog report={report} />
        </Dialog>
    )
}