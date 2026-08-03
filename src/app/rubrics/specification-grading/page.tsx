import ScrollUp from "@/components/Common/ScrollUp";
import SpecificationGradingRubric from "@/components/Rubrics/SpecificationGradingRubric";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Specification Grading Rubric — Qamar Labs",
  description:
    "The standard every Qamar Labs specification is scored against: five dimensions, 100 points, with worked pass/fail examples. Read it or download it.",
  // other metadata
};

export default function SpecificationGradingRubricPage() {
  return (
    <div>
      <ScrollUp />
      <SpecificationGradingRubric />
    </div>
  );
}
