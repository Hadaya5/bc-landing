import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role?: string;
  testimonial: string;
  initials?: string;
  rating?: number;
  styles?: string;
  quoteColor?: string;
  image?: string;
}

interface Props {
  data: Testimonial;
}

export function TestimonialPanel({ data }: Props) {
  return (
    <div className="panel w-screen h-full grid place-items-center">
      <div
        className={cn(
          data.styles,
          "w-full h-full flex items-center justify-center px-10"
        )}
      >
        <div className="relative max-w-2xl text-center">
          <span
            className={cn(
              data.quoteColor,
              "hidden md:inline font-serif absolute right-11/12 bottom-10 text-[16rem]"
            )}
          >
            “
          </span>
          <div className="flex flex-col sm:flex-row justify-center mb-10">
            <div className="grid place-items-end grid-cols-11 gap-9 rounded-full w-40 h-50">
              <img
                src={data.image}
                alt={data.name}
                className="rounded-lg w-full h-full object-cover col-span-5"
              />
            </div>
            <div className="sm:col-span-6 sm:flex flex-col justify-center">
              <h3 className="relative text-xl xs:text-left font-semibold mb-1">
                {data.name}
              </h3>
              {data.role && (
                <p className="text-sm text-center xs:text-left italic mb-4 relative">
                  {data.role}
                </p>
              )}
            </div>
          </div>

          {/* Contenido */}
          <p className="text-md sm:text-lg relative z-10">{data.testimonial}</p>

          <span
            className={cn(
              data.quoteColor,
              "hidden md:inline font-serif absolute top-75 left-11/12 text-[16rem]"
            )}
          >
            ”
          </span>
        </div>
        <div className="relative"></div>
      </div>
    </div>
  );
}
