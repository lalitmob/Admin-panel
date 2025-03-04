import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function TermsAndConditions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Terms & Conditions</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-60 p-2">
          <p className="text-sm mb-4">
            1. **Scope of Work:** This agreement covers the services detailed in the quotation.
          </p>
          <p className="text-sm mb-4">
            2. **Payment Terms:** Payments must be made according to the agreed schedule.
          </p>
          <p className="text-sm mb-4">
            3. **Intellectual Property:** Ownership transfers upon full payment.
          </p>
          <p className="text-sm mb-4">
            4. **Revisions & Support:** Limited revisions are included, additional revisions are chargeable.
          </p>
          <p className="text-sm">
            5. **Termination:** Either party can terminate the agreement with a written notice.
          </p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
