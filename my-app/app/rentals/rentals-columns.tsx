"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SendReminder } from "@/components/sendReminder"
import { DeleteRental } from "@/components/deleteRental"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Rentals = {
    _id: string
    studentEmail: string
    startDate: string
    endDate: string
}

export const rentalsColumns: ColumnDef<Rentals>[] = [
  {
    accessorKey: "studentEmail",
    header: "Mail",
  },
  {
    accessorKey: "startDate",
    header: "Start",
  },
  {
    accessorKey: "endDate",
    header: "End",
  },
  {
    id: "actions",
    cell: ({ row }) => {
 
      return (
      <div className="text-right font-medium">
        <div><SendReminder id={row.original._id}/><DeleteRental id={row.original._id}/></div>
      </div>
      )
    },
  },
];