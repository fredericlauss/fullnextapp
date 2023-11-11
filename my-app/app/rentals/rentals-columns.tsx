"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Rentals = {
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
]
