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
        next: {
          revalidate: 0
        }
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
        next: {
          revalidate: 0
        }
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
    getItems();
    getRentals();
  }, [items, rentals]);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Items list</h2>
        <AddItem />
        <ItemsDataTable columns={itemsColumns} data={items} />
        <h2>rentals list</h2>
        <RentalsDataTable columns={rentalsColumns} data={rentals} />
    </main>
  )
}
