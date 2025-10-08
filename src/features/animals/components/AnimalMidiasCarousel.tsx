
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getImageUrl } from "@/lib/getImageURL"
import type { Midia } from "../types/animal.types"

export function AnimalMidiasCarousel({ midias, name }: { midias: Midia[], name: string }) {

    return (
        <Carousel className="w-full max-w-xs mx-auto ">
            <CarouselContent>
                {midias && midias.length > 0 && midias.map((item, index) => (
                    <CarouselItem key={index} >
                        {item.type === "image" ? <img
                            className="w-full h-full  object-cover overflow-hidden rounded-md"
                            src={getImageUrl(item.url) ?? "/"}
                            alt={name + index} /> :
                            <video className="w-full h-full  object-cover overflow-hidden rounded-md" src={getImageUrl(item.url) ?? "/"} controls>

                            </video>
                        }


                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
