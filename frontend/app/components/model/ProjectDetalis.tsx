import React from 'react'
import Image from 'next/image'
const ProjectDetails = ({project}) => {
  return (
     <div className="flex justify-between mb-5">
        <div className="flex flex-col gap-3">
          <p>
            <strong className="text-lg">Budget:</strong> $
            {project.budget.toLocaleString()}
          </p>
          <p>
            <strong>Client Email:</strong> {project.clientEmail}
          </p>
          <p>
            <strong>Duration:</strong> {project.proposedDuration} months
          </p>
          <p>
            <strong>Tech Stack:</strong> {project.techStack?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {project.description || "No description available."}
          </p>
        </div>
        <div className="relative self-center mb-5">
          <Image
            src="/icon.svg"
            alt="icon"
            width={100}
            height={100}
            className="rounded-xl"
          />
        </div>
      </div>
  )
}

export default ProjectDetails