"use client";

import { sidebarConst as options } from "@/app/constants/sidebarconst.js";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Users,
  Settings,
  Calendar,
  PersonStandingIcon,
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();

  const handleSelected = (option: string) => {
    const path = option.toLowerCase();
    router.replace(`/admin/${path}`);
  };

  return (
    <Card className="w-full md:w-full lg:w-full fixed flex flex-col min-h-[90%] bg-white/65 shadow-lg">
      <ScrollArea className="flex-1">
        <div className="flex flex-col space-y-2">
          {options.fields.map((field, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex justify-start w-full text-lg text-gray-800 font-medium capitalize hover:text-blue-500"
              onClick={() => handleSelected(field)}
            >
              {index === 0 ? <Home className="mr-2 h-5 w-5" /> : null}
              {index === 1 ? <Users className="mr-2 h-5 w-5" /> : null}
              {index === 2 ? <Settings className="mr-2 h-5 w-5" /> : null}
              {index === 3 ? <Calendar className="mr-2 h-5 w-5" /> : null}
              {index === 4 ? (
                <PersonStandingIcon className="mr-2 h-5 w-5" />
              ) : null}
              {field}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Separator className="my-2" />

      <Card className="bg-white p-4 text-center shadow-md">
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        <h3 className="text-gray-500 text-sm">Version 1.0.1.11</h3>
      </Card>
    </Card>
  );
};

export default Sidebar;
