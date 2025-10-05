import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"


export const WhatsappButton = ({ phone }: { phone: string | undefined }) => {

    const handleRedirect = () => {
        const formattedPhone = phone?.replace(/\D/g, '')
        const whatsappUrl = `https://wa.me/${formattedPhone}`
        window.open(whatsappUrl, "_blank")
    }

    return (<Button variant="outline" onClick={handleRedirect}>

        <Phone size={20} />
        <p>
            Contato com a ONG
        </p>
    </Button>)

}