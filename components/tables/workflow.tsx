"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface DataRows {
  id: number;
  flowId: string;
  title?: string;
  type?: string;
}

const flows: DataRows[] = [
  {
    id: 1,
    title: "Default",
    flowId: "33774438jjd88333",
    type: "SDK",
  },
  {
    id: 1,
    title: "Loan App Flow",
    flowId: "5553333TEE",
    type: "CDN",
  },
];

const FlowTable = () => {
  const columns: { key: string; label: string }[] = [
    {
      key: "title",
      label: "title",
    },
    {
      key: "type",
      label: "type",
    },
    {
      key: "flowId",
      label: "Flow ID",
    },
    {
      key: "action",
      label: "action",
    },
  ];

  const router = useRouter();

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {flows.map((item: DataRows) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium  text-card-foreground/80">
                {item.title}
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  color={
                    (item.type === "sdk" && "default") ||
                    (item.type === "CDN" && "success") ||
                    (item.type === "owner" && "info") ||
                    (item.type === "editor" && "warning") ||
                    "default"
                  }
                  className="capitalize"
                >
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>{item.flowId}</TableCell>
              <TableCell className="ltr:pr-5 rtl:pl-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      color="secondary"
                      className=" h-7 rounded-full bg-transparent w-7 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground  "
                    >
                      <Icon
                        icon="heroicons:ellipsis-horizontal"
                        className=" h-6 w-6 "
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" avoidCollisions>
                    <DropdownMenuLabel>Action Center</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push(`/workflows/${item.id}`)}
                    >
                      <Icon
                        icon="heroicons:pencil"
                        className=" h-4 w-4 mr-2 "
                      />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon icon="heroicons:eye" className=" h-4 w-4 mr-2 " />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon icon="heroicons:trash" className=" h-4 w-4 mr-2 " />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default FlowTable;
