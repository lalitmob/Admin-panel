import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProjectDetails from "./model/ProjectDetalis";
import ProjectManagers from "./model/ProjectManagers";
import QuotationList from "./model/QuotationList";
import { useState } from "react";
import { Button } from "@mui/material";
import useProject from "../api/project.api";
interface Project {
  projectName: string;
}

interface Quotation {
  [role: string]: number;
}

interface ProjectQuota {
  budget: number;
  quotation: Quotation[];
}

interface Manager {
  id: string;
  userName: { firstName: string; lastName: string };
  phoneNumber: { countryCode: string; number: string };
  email: string;
  branch: string;
}

interface ProjectData {
  project: Project;
  projectManagerInfo: Manager[];
  projectQuota: ProjectQuota[];
}

interface ProjectCardProps {
  token: string;
  data: ProjectData;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ token, data }) => {
  const [quotationData, setQuotationData] = useState<{
    projectLead: string;
    chosenQuotation: ProjectQuota | null;
    token: string;
    budget: string;
  }>({
    projectLead: "",
    chosenQuotation: null,
    token: token.toString(),
    budget: "",
  });

  const { confirmProjectsApi } = useProject();
  if (!data || !data.project || !data.projectQuota) return <p>Loading...</p>;
  const handleClick = (field: string, chosenQuotation: object) => {
    setQuotationData((prev) => ({
      ...prev,
      [field]: chosenQuotation,
      budget: chosenQuotation?.budget || prev.budget,
    }));
  };
  const handleSubmit = () => {
    const { projectLead, chosenQuotation, token, budget } = quotationData;
     console.log(quotationData)
    if (!projectLead || !chosenQuotation || !token) {
        alert("Please select a Project Lead and a Quotation");
        return;
      }
  
    const payload = {
      projectLead,
      chosenQuotation,
      token,
      budget,
      projectStatus: "Ongoing",
    };
    confirmProjectsApi(payload);
  };
  return (
    <Card className="w-[50%] h-[90%] overflow-auto mx-auto p-4 my-5 shadow-lg rounded-lg border">
      <CardHeader>
        <CardTitle className="text-2xl text-center capitalize font-semibold">
          {data.project.projectName}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <ProjectDetails project={data.project} />

        <ProjectManagers
          handleClick={handleClick}
          managers={data.projectManagerInfo}
        />

        <Separator />

        <QuotationList
          handleClick={handleClick}
          projectQuota={data.projectQuota}
        />
      </CardContent>
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </Card>
  );
};

export default ProjectCard;
