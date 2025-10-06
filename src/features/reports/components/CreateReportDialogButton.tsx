import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateReportDialog } from "./CreateReportDialog";

export function CreateReportDialogButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>
                    Nova denúncia
                </Button>
            </DialogTrigger>

            <CreateReportDialog />
        </Dialog>
    )
}