import { Items, itemsColumns } from "./items/items-columns"
import { ItemsDataTable } from "./items/items-data-table"
import { Rentals, rentalsColumns } from "./rentals/rentals-columns"
import { RentalsDataTable } from "./rentals/rentals-data-table"

async function getItems(): Promise<Items[]> {
    const res = await fetch('http://localhost:5000/api/v1/items', {
        next: {
          revalidate: 0
        }
      })
      return res.json();
}

async function getRentas(): Promise<Rentals[]> {
  const res = await fetch('http://localhost:5000/api/v1/rentals', {
      next: {
        revalidate: 0
      }
    })
    return res.json();
}



export default async function Home() {
  const items = await getItems()
  const rentals = await getRentas();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>Items</h2>
        <ItemsDataTable columns={itemsColumns} data={items} />
        <h2>rentals</h2>
        <RentalsDataTable columns={rentalsColumns} data={rentals} />
    </main>
  )
}
