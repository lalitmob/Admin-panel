'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useProject from '@/app/api/project.api';
import ProjectCard from '@/app/components/Card';
import TermsAndConditions from '@/app/components/model/Terms';

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

const AcceptQuotation: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { requestQuot } = useProject();

  const [data, setData] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (!token) return;

   const handleData = (data: unknown) => {
      if (isProjectData(data)) {
        setData(data);
      } else {
        console.error('Received data is not of type ProjectData:', data);
      }
    };

    requestQuot(token, handleData);
  }, [token]);

  const isProjectData = (data: unknown): data is ProjectData => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'project' in data &&
      'projectManagerInfo' in data &&
      'projectQuota' in data
    );
  };

  if (!token) {
    return <div>No token provided.</div>;
  }

  return (
    <div className="flex bg-gray-100 flex-col items-center w-full h-screen">
      <ProjectCard token={token} data={data} />
      <TermsAndConditions />
    </div>
  );
};

export default AcceptQuotation;
