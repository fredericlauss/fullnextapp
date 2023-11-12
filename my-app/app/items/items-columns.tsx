"use client"
import { DeleteItem } from "@/components/deleteItem"
import { ColumnDef } from "@tanstack/react-table"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Items = {
  _id: string
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
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const isRented = row.original.isRented;

      return (
        <div className="text-right font-medium">
          {isRented ? "Rented" : <div><button>Rent</button><button>Update</button><DeleteItem id={row.original._id}/></div>}
        </div>
      );
    },
  },
];


