import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export function ReasonForLeave({ open, setOpen, title, setTitle }) {
  const[input, setInput] = useState("")
  const handleSubmit = () =>{
    setTitle(input)
    setOpen(false)
    setInput("")
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Give leave reason</DialogTitle>
          <DialogDescription>
            Please provide a reason for your leave request.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Enter your reason..."
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
