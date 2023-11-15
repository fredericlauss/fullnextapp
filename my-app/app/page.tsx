"use client"
import { Items, itemsColumns } from "./items/items-columns"
import { ItemsDataTable } from "./items/items-data-table"
import { Rentals, rentalsColumns } from "./rentals/rentals-columns"
import { RentalsDataTable } from "./rentals/rentals-data-table"
import { AddItem } from "@/components/addItem"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <main className="">
        <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <h1>NWS rent app</h1>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <p>sdqsdqsd</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Items</CardTitle>
                    <CardDescription>
                      <AddItem getItems={getItems} />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ItemsDataTable columns={itemsColumns({ getItems, getRentals })} data={items} />
                  </CardContent>
                </Card>
                <Card className="col-span-5">
                  <CardHeader>
                    <CardTitle>Rentals</CardTitle>
                  </CardHeader>
                  <CardContent>
                   <RentalsDataTable columns={rentalsColumns({ getItems, getRentals })} data={rentals} />
                  </CardContent>
                </Card>
              </div>
        </div>
      </div>
    </main>
  )
}
