import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@mui/material";

interface Quotation {
  [role: string]: number;
}

interface ProjectQuota {
  budget: number;
  quotation: Quotation[];
}

interface QuotationListProps {
  projectQuota: ProjectQuota[];
  handleClick: (field : string,selectedQuotation: ProjectQuota | null) => void;
}

const QuotationList: React.FC<QuotationListProps> = ({ handleClick, projectQuota }) => {
  const [selected, setSelected] = useState<ProjectQuota | null>(null);

  const handleAccept = (quotation: ProjectQuota) => {
    setSelected(quotation);
    handleClick("chosenQuotation",quotation);
  };

  return (
    <div>
      {projectQuota.map((quot, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Quotation {index + 1}</h2>
          <p className="text-gray-600">Budget: ${quot.budget.toLocaleString()}</p>

          <Accordion type="single" collapsible>
            {quot.quotation.map((q, qIndex) => (
              <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                <AccordionTrigger>
                  Quotation Breakdown {qIndex + 1}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {Object.entries(q).map(([role, count]) => (
                      <li key={role} className="flex justify-between border-b pb-1">
                        <span className="font-medium">{role}</span>
                        <span>{count}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex gap-2 mt-2">
            <Button
              className={`${
                selected?.budget === quot.budget ? "bg-green-700" : "bg-green-500"
              } hover:bg-green-600`}
              onClick={() => handleAccept(quot)}
            >
              Accept
            </Button>
            <Button variant="outlined" color="error" onClick={() => setSelected(null)}>
              Decline
            </Button>
          </div>
        </div>
      ))}
      {selected && (
        <div className="mt-4 p-3 border rounded-md bg-gray-100">
          <h3 className="text-md font-semibold">Selected Quotation:</h3>
          <p>Budget: ${selected.budget.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default QuotationList;
