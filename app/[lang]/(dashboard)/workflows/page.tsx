"use client";
import FlowTable from "@/components/tables/workflow";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
const WorkflowPage = () => {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Utility</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Blank Page</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-5 text-2xl font-medium text-default-900">
        <Card title="User table in Card">
          <FlowTable />
        </Card>
      </div>
    </div>
  );
};

export default WorkflowPage;
