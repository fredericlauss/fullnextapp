import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IdItemProps {
    id: string;
  }

  export function SendReminder({ id }: IdItemProps) {
    const { toast } = useToast()

    async function SendReminder() {
        try {
            const response = await fetch(`${apiUrl}/api/v1/rentals/${id}/send-reminder`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            toast({
                title: `${response.status}`,
              })
          } catch (error) {
            console.error("Create error:", error);
          }
    }
    return (
        <Button variant="outline" size="icon" onClick={SendReminder}><Mail className="h-4 w-4" /></Button>
    )
}