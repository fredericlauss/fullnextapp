import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface DeleteRentalProps {
    id: string;
    getItems: () => void;
    getRentals: () => void;
  }
  
  export function DeleteRental({ id, getRentals, getItems}: DeleteRentalProps) {
    const { toast } = useToast()

    async function DeleteRental() {
        try {
            const response = await fetch(`${apiUrl}/api/v1/rentals/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            getRentals();
            getItems();
            toast({
                title: `${response.status}`,
              })
          } catch (error) {
            console.error("Create error:", error);
          }
    }
    return (
        <Button variant="outline" size="icon" onClick={DeleteRental}><Trash2 className="h-4 w-4" /></Button>
    )
  }