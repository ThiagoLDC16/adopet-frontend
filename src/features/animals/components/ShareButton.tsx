import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"


interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
}

export const ShareButton = ({ title, text, url }: ShareButtonProps) => {

    const handleRedirect = async () => {
        // Verifica se o navegador suporta Web Share API
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: url || window.location.href,
                });
                console.log('Compartilhado com sucesso!');
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Erro ao compartilhar:', error);
                    fallbackShare();
                }
            }
        } else {

            fallbackShare();
        }
    };

    const fallbackShare = () => {
        // Copia o link para a área de transferência
        const shareUrl = url || window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Link copiado para a área de transferência!');

        });
    };
    return (<Button variant="outline" onClick={handleRedirect}>

        <Share2 size={20} />
        <p>
            Compartilhar
        </p>
    </Button>)

}