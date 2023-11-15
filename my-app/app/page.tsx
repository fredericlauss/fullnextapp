"use client"
import { Items, itemsColumns } from "./items/items-columns"
import { ItemsDataTable } from "./items/items-data-table"
import { Rentals, rentalsColumns } from "./rentals/rentals-columns"
import { RentalsDataTable } from "./rentals/rentals-data-table"
import { AddItem } from "@/components/addItem"
import { useEffect, useState } from "react"

export default function Home() {
  const [items, setItems] = useState<Items[]>([]);
  const [rentals, setRentals] = useState<Rentals[]>([]);

  const getItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/items', {
      })
      if (res.ok) {
        const data = await res.json();
        const items = data;
        if (items) {
          setItems(items);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getRentals = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/rentals', {
      })
      if (res.ok) {
        const data = await res.json();
        const rentals = data;
        if (rentals) {
          setRentals(rentals);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRentals();
    getItems();
  }, []);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Items </h2>
        <AddItem getItems={getItems} />
        <ItemsDataTable columns={itemsColumns({ getItems, getRentals })} data={items} />
        <h2>rentals</h2>
        <RentalsDataTable columns={rentalsColumns({ getItems, getRentals })} data={rentals} />
    </main>
  )
}
