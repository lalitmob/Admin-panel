import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@mui/material";

interface UserName {
  firstName: string;
  lastName: string;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

interface Manager {
  id: string;
  userName: UserName;
  phoneNumber: PhoneNumber;
  email: string;
  branch: string;
}

interface ProjectManagersProps {
  managers: Manager[];
  handleClick: (role?: string, managerId?: string) => void;
}

const ProjectManagers: React.FC<ProjectManagersProps> = ({ handleClick, managers }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (managerId: string) => {
    setSelected(managerId);
    handleClick("projectLead", managerId); 
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-gray-500/70 px-3 py-2 rounded-xl mb-3 text-white font-semibold">
            View Project Managers
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Project Managers</DialogTitle>
            <DialogDescription>List of assigned project managers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {managers.map((manager) => (
              <div
                key={manager.id}
                className={`border p-3 rounded-lg ${
                  selected === manager.id ? "border-green-500 bg-green-50" : ""
                }`}
              >
                <p>
                  <strong>Name:</strong> {manager.userName.firstName} {manager.userName.lastName}
                </p>
                <p>
                  <strong>Phone:</strong> {manager.phoneNumber.countryCode} {manager.phoneNumber.number}
                </p>
                <p>
                  <strong>Email:</strong> {manager.email}
                </p>
                <p>
                  <strong>Branch:</strong> {manager.branch}
                </p>
                <Button
                  variant={selected === manager.id ? "contained" : "outlined"}
                  color={selected === manager.id ? "success" : "primary"}
                  onClick={() => handleSelect(manager.id)}
                >
                  {selected === manager.id ? "Selected" : "Select"}
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <p className="text-sm text-gray-500">
              <span className="text-md font-semibold text-black">Disclaimer:</span> Only one manager can be selected. Please choose accordingly.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagers;
