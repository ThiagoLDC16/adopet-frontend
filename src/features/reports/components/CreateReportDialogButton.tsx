import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateReportDialog } from "./CreateReportDialog";
import { useState } from "react";

export function CreateReportDialogButton({fetchReports}: {fetchReports: () => Promise<void>}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Nova denúncia
                </Button>
            </DialogTrigger>

            <CreateReportDialog setIsOpen={setIsOpen} fetchReports={fetchReports}/>
        </Dialog>
    )
}