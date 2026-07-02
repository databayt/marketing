"use client"

import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Product, { type ProductProps } from "./product"

type EmblaApi = UseEmblaCarouselType[1]

interface ProductsCarouselProps {
  products: ProductProps[]
  isRTL?: boolean
}

export default function ProductsCarousel({ products, isRTL = false }: ProductsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: isRTL ? "rtl" : "ltr",
    loop: false,
    containScroll: "trimSnaps",
  })
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)

  const onSelect = React.useCallback((api: EmblaApi) => {
    if (!api) return
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("select", onSelect).on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  // In RTL the visual "previous" arrow points right, "next" points left.
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight

  return (
    // `@container` makes 100cqi resolve to this element's width (= the
    // `container mx-auto` width). Card widths below are then identical to the
    // original `grid grid-cols-3 gap-4`.
    <div className="@container">
      {/*
        Full-bleed clipper: spans the whole screen and clips the peeking cards
        at the screen edges. `overflow-x-clip` clips without creating scrollable
        overflow, so the bleed never produces a horizontal scrollbar.
      */}
      <div className="[margin-inline:calc(50%_-_50vw)] overflow-x-clip">
        {/*
          This is Embla's viewport, re-contained to the container width
          (`w-[100cqi]` + `mx-auto`) and left `overflow-visible`. Because Embla
          measures THIS element, its scroll rail equals the container: one
          "next" advances exactly one card, and the last card lands in the final
          in-container slot while the previous card peeks out the opposite side
          — clipped to the screen edge by the parent above.
        */}
        <div className="mx-auto w-[100cqi] overflow-visible" ref={emblaRef}>
          <div className="flex gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-[100cqi] md:basis-[calc((100cqi-2rem)/3)]"
              >
                <Product {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apple-style paddle navigation, aligned to the end of the container */}
      <div className="mt-8 flex justify-end gap-3">
        <PaddleButton
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          label={isRTL ? "السابق" : "Previous"}
        >
          <PrevIcon className="size-5" strokeWidth={2.25} />
        </PaddleButton>
        <PaddleButton
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          label={isRTL ? "التالي" : "Next"}
        >
          <NextIcon className="size-5" strokeWidth={2.25} />
        </PaddleButton>
      </div>
    </div>
  )
}

function PaddleButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-muted text-foreground/70",
        "transition-colors hover:bg-muted-foreground/20 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40"
      )}
    >
      {children}
    </button>
  )
}
