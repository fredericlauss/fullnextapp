"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Items = {
  name: number
  isRented: boolean
}

export const itemsColumns: ColumnDef<Items>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isRented",
    header: "Status",
  },
]
