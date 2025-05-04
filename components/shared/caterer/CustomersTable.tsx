import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { CustomerType } from "@/types/customer-types";
import { formatCurrency } from "@/utils/format-currency";
import { format } from "date-fns";
import { Edit, Eye, MoreHorizontal, Search, Trash2, Users } from "lucide-react";
import Link from "next/link";

interface CustomersTableProps {
  customers: CustomerType[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hasEditableButtons?: boolean;
  onViewCustomer?: (customer: CustomerType) => void;
  onEditCustomer?: (customer: CustomerType) => void;
  onDeleteCustomer?: (customer: CustomerType) => void;
}

export function CustomersTable({
  customers,
  searchQuery,
  hasEditableButtons = true,
  onSearchChange,
  onViewCustomer,
  onEditCustomer,
  onDeleteCustomer,
}: CustomersTableProps) {
  return (
    <div className="mt-8">
      {hasEditableButtons && (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users className="mr-2 w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Registered Customers</h2>
          </div>
          <div className="flex overflow-y-auto gap-2 items-center">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <Select defaultValue="registration">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Registration Date</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="reservations">Total Reservations</SelectItem>
                <SelectItem value="spent">Total Spent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Total Reservations</TableHead>
              <TableHead>Total Spent</TableHead>
              {hasEditableButtons && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="gap-2">
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell className="py-4">
                  <div className="flex gap-2 items-center">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {format(customer.registrationDate, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{customer.totalReservations}</TableCell>
                <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                {hasEditableButtons && (
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewCustomer!(customer)}
                      >
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditCustomer!(customer)}
                      >
                        <Edit className="w-4 h-4" />
                        <span className="sr-only">Edit customer</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteCustomer!(customer)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Delete customer</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link
                              href={`/reservations?customer=${customer.id}`}
                              className="flex w-full"
                            >
                              View Reservations
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuItem>Add Note</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>{customers.length}</strong> of{" "}
          <strong>{customers.length}</strong> customers
        </div>
        <div className="flex gap-2 items-center">
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
