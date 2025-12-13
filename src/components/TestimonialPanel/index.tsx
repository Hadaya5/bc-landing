import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="panel w-[100vw] h-[100%] grid place-items-center">
      <div
        className={cn(
          data.styles,
          "w-full h-full flex items-center justify-center"
        )}
      >
        <div className="relative max-w-2xl text-center p-6">
          <span
            className={cn(
              data.quoteColor,
              "font-serif absolute left-0 bottom-10 text-[16rem]"
            )}
          >
            “
          </span>
          {/* Avatar */}
          <div className="flex justify-center mb-10">
            <div className="grid grid-cols-11 gap-9 rounded-full w-50 h-50 ">
              <img
                src={data.image}
                alt={data.name}
                className="rounded-lg w-full h-full object-cover col-span-5"
              />

              <div className="col-span-6 flex flex-col justify-center">
                <h3 className="text-xl text-left font-semibold mb-2 relative z-10">
                  {data.name}
                </h3>
                {data.role && (
                  <p className="text-sm text-left italic mb-4 relative z-10">
                    {data.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contenido */}
          <p className="text-lg relative z-10">{data.testimonial}</p>

          <span
            className={cn(
              data.quoteColor,
              "font-serif absolute top-75 -right-10 text-[16rem]"
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
