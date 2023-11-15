"use client"
import { DeleteItem } from "@/components/deleteItem"
import { UpdateItem } from "@/components/updateItem"
import { ColumnDef } from "@tanstack/react-table"
import { AddRental } from "@/components/addRental"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Items = {
  _id: string
  name: string
  isRented: boolean
}

interface ItemsColumnsProps {
  getItems: () => void;
}

export const itemsColumns = ({ getItems }: ItemsColumnsProps): ColumnDef<Items>[] => [
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
          {isRented ? "Rented" : <div><AddRental id={row.original._id}/><UpdateItem getItems={getItems} id={row.original._id} name={row.original.name}/><DeleteItem getItems={getItems} id={row.original._id}/></div>}
        </div>
      );
    },
  },
];


