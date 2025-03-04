import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import useProject from "../api/project.api";

const Projects = () => {
  const [data, setData] = useState({
    projectName: "",
    projectBudget: "",
    shortName: "",
    clientEmail: "",
    techStack: [] as string[],
    proposedDuration: "",
    description: "",
  });
  const [techStackInput, setTechStackInput] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techStackInput.trim()) {
      e.preventDefault();
      setData((prev) => ({
        ...prev,
        techStack: prev.techStack.includes(techStackInput.trim())
          ? prev.techStack
          : [...prev.techStack, techStackInput.trim()],
      }));
      setTechStackInput("");
    }
  };

  const removeStack = (stackToRemove: string) => {
    setData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((stack) => stack !== stackToRemove),
    }));
  };

  const { projectCreate } = useProject();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      projectName : data.projectName,
      clientEmail : data.clientEmail,
      techStack : data.techStack,
      projectBudget: Number(data.projectBudget),
      proposedDuration: Number(data.proposedDuration),
      description : data.description
    };
    projectCreate(payload);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg  overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Project Name", name: "projectName" },
            { label: "Project Budget", name: "projectBudget" },
            { label: "Short Name", name: "shortName" },
            { label: "Client Email", name: "clientEmail", type: "email" },
            { label: "Proposed Duration", name: "proposedDuration" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 font-medium text-sm">{label}</label>
              <input
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                type={type}
                name={name}
                value={(data as any)[name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium text-sm">Tech Stack</label>
          <input
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            type="text"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            onKeyDown={handleKeypress}
            placeholder="Press Enter to add"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {data.techStack.map((stack, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs cursor-pointer hover:bg-blue-700"
                onClick={() => removeStack(stack)}
              >
                {stack} ✖
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium text-sm">Description</label>
          <textarea
            className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Projects;
