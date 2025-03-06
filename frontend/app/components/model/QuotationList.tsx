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
  handleClick: (field: string, selectedQuotation: ProjectQuota | null) => void;
}

const QuotationList: React.FC<QuotationListProps> = ({
  handleClick,
  projectQuota,
}) => {
  const [acceptedIndex, setAcceptedIndex] = useState<number | null>(null);
  const [selectedBreakdown, setSelectedBreakdown] = useState<Quotation | null>(
    null
  );

  const handleAccept = (quotation: ProjectQuota, index: number) => {
    setAcceptedIndex(index);
    setSelectedBreakdown(null);
  };

  const handleSelectBreakdown = (breakdown: Quotation) => {
    setSelectedBreakdown(breakdown);
   handleClick("chosenQuotation", breakdown);
  };

  return (
    <div>
      {projectQuota.map((quot, index) =>
        acceptedIndex === null || acceptedIndex === index ? (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Quotation {index + 1}</h2>
            <p className="text-gray-600">
              Budget: ${quot.budget.toLocaleString()}
            </p>

            <Accordion type="single" collapsible>
              {quot.quotation.map((q, qIndex) => (
                <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                  <AccordionTrigger>
                    Quotation Breakdown {qIndex + 1}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {Object.entries(q).map(([role, count]) => (
                        <li
                          key={role}
                          className="flex justify-between border-b pb-1"
                        >
                          <span className="font-medium">{role}</span>
                          <span>{count}</span>
                        </li>
                      ))}
                      <Button
                        variant="outlined"
                        disabled={selectedBreakdown !== null}
                        onClick={() => handleSelectBreakdown(q)}
                      >
                        Select
                      </Button>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex gap-2 mt-2">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleAccept(quot, index)}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAcceptedIndex(null);
                  setSelectedBreakdown(null);
                }}
              >
                Decline
              </Button>
            </div>
          </div>
        ) : null
      )}

      {acceptedIndex !== null && (
        <div className="mt-4 p-3 border rounded-md bg-gray-100">
          <h3 className="text-md font-semibold">Selected Quotation:</h3>
          <p>Budget: ${projectQuota[acceptedIndex].budget.toLocaleString()}</p>

          {selectedBreakdown && (
            <div className="mt-2">
              <h3 className="text-md font-semibold">Selected Breakdown:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {Object.entries(selectedBreakdown).map(([role, count]) => (
                  <li key={role} className="flex justify-between border-b pb-1">
                    <span className="font-medium">{role}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuotationList;
