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

export type Students = {
  id: number
  nom: string
  prenom: string
  mail: string
}

interface ItemsColumnsProps {
  getItems: () => void;
  getRentals: () => void;
  getStudents: () => void;
  student: Students[];
}

export const itemsColumns = ({ getItems, getRentals, getStudents, student }: ItemsColumnsProps): ColumnDef<Items>[] => [
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
          {isRented ? "Rented" : <div className="flex gap-1 justify-end items-center"><AddRental student={student} getStudents={getStudents} getRentals={getRentals} getItems={getItems} id={row.original._id}/><UpdateItem getItems={getItems} id={row.original._id} name={row.original.name}/><DeleteItem getItems={getItems} id={row.original._id}/></div>}
        </div>
      );
    },
  },
];


