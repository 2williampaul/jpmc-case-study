"use client";
import React, { forwardRef } from "react";
import { clsx } from "clsx";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
  </svg>
);

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "outline" | "default";
  size?: "icon" | "default";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" && "border border-white/30 bg-transparent shadow-sm hover:bg-white/10 hover:border-white/50",
          size === "icon" && "h-10 w-10",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={clsx("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={clsx(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={clsx(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={clsx("size-11 shrink-0", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="size-5" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={clsx("size-11 shrink-0", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="size-5" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

// Testimonial data
const testimonials = [
  {
    quote: "Billy Paul is a superb product designer. Adding value from minute 1. Always scrutinising patterns and looking for ways to improve the work. I would trust him with systems of any complexity. Highly organised and collaborative, and a joy to work with to boot.",
    name: "Kristin Agnarsdottir",
    role: "Global Creative Director",
    company: "Huge",
  },
  {
    quote: "Billy worked with Digitas as a lead designer on a HSBC Banking App. He was a central member of the governance team that developed the UI design language, defined the design patterns and established and maintained the toolkit for designers and developers. He has a fantastic knowledge of the tools he uses and for creating systematic toolkits. We found his contribution invaluable. Bill has a super in-depth understanding of App design, is a master craftsman and would be an asset in any creative team.",
    name: "Aran Burtenshaw",
    role: "Creative Director",
    company: "Digitas (Publicis)",
  },
  {
    quote: "I worked alongside Billy on a large design system for a global client. He brought invaluable knowledge and experience regarding the creation, construction and management of a global design system, a proactive \"can-do\" attitude and a healthy contribution to the team's culture and the relationship with the client. Having him on my team was great, and I sincerely hope to work with him again.",
    name: "Ben Bashford",
    role: "Experience Design Director",
    company: "Huge",
  },
  {
    quote: "Billy was centric to the Design System solution at LSEG. He managed and helped own the Figma library taxonomy, strategy and delivery with expert precision while delivering updates to key stakeholders on the vision, working well within a wider team. Not only that, Billy is a totally down to earth guy and a pleasure to work with.",
    name: "Matt Davies",
    role: "Senior Product Manager",
    company: "LSEG",
  },
  {
    quote: "Will is one of the most skilful and focused product designers I've had the pleasure to work with on developing a complex business banking app. I value his positive can-do attitude towards collaboration and his passion for delivering meaningful design. He approaches challenges methodically from UX scamping to UI design that helps give products a competitive edge. A great designer and an awesome team member.",
    name: "Will Krüger",
    role: "Design Director",
    company: "Digitas (Publicis)",
  },
];

interface TestimonialsCarouselProps {
  align?: "left" | "center";
}

export function TestimonialsCarousel({ align = "center" }: TestimonialsCarouselProps) {
  const isLeft = align === "left";
  
  return (
    <Carousel opts={{ loop: true }}>
      {/* Desktop: side by side, Mobile: stacked */}
      <div className={clsx("flex flex-col md:flex-row gap-6", isLeft ? "" : "justify-center")}>
        {/* Content */}
        <div className={clsx("relative flex-1 min-w-0", isLeft ? "md:max-w-3xl" : "md:max-w-4xl")}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="pb-4">
                  <div className={isLeft ? "text-left" : "text-center"}>
                    <QuoteIcon className={clsx("text-white/30 mb-4 sm:mb-6 w-8 h-8 sm:w-10 sm:h-10", isLeft ? "" : "mx-auto")} />
                    <p className={clsx(
                      "text-base sm:text-lg md:text-xl leading-relaxed font-light text-white/90",
                      isLeft ? "max-w-3xl" : "mx-auto max-w-3xl"
                    )}>
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-4 sm:mt-6">
                      <h4 className="text-sm sm:text-base font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/60 text-xs sm:text-sm mt-1">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        
        {/* Controls - below on mobile, right side on desktop */}
        <div className="flex flex-row md:flex-col gap-3 md:pt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
}

export default TestimonialsCarousel;
