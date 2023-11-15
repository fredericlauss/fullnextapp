import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface DeleteItemProps {
    id: string;
    getItems: () => void;
  }

  export function DeleteItem({ id, getItems }: DeleteItemProps) {
    const { toast } = useToast()

    async function DeleteItem() {
        try {
            const response = await fetch(`${apiUrl}/api/v1/items/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            getItems();
            toast({
                title: `${response.status}`,
              })
          } catch (error) {
            console.error("Create error:", error);
          }
    }
    return (
        <Button variant="outline" size="icon" onClick={DeleteItem}><Trash2 className="h-4 w-4" /></Button>
    )
}