import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConcernType } from "@/types/customer-types";
import { format } from "date-fns";
import { Check, Eye, MessageSquare, Reply } from "lucide-react";

interface CustomerConcernsTableProps {
  concerns: ConcernType[];
  onReplyConcern: (concern: ConcernType) => void;
}

export function CustomerConcernsTable({
  concerns,
  onReplyConcern,
}: CustomerConcernsTableProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Customer Concerns</h2>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Concerns</SelectItem>
              <SelectItem value="open">Open Concerns</SelectItem>
              <SelectItem value="resolved">Resolved Concerns</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Concern</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {concerns.map((concern) => (
              <TableRow key={concern.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {concern.isRegistered
                          ? concern.customerName.charAt(0)
                          : "G"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{concern.customerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {concern.isRegistered ? "Registered" : "Guest"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-md truncate">{concern.message}</div>
                </TableCell>
                <TableCell>
                  <div>{format(concern.submittedAt, "MMM d, yyyy")}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(concern.submittedAt, "h:mm a")}
                  </div>
                </TableCell>
                <TableCell>
                  {concern.status === "Open" ? (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Open
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">
                      Resolved
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {concern.status === "Open" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => onReplyConcern(concern)}
                        >
                          <Reply className="h-3 w-3" />
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Resolve
                        </Button>
                      </>
                    )}
                    {concern.status === "Resolved" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        View History
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>{concerns.length}</strong> of{" "}
          <strong>{concerns.length}</strong> concerns
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
