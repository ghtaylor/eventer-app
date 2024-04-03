import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";
import { LuPlus } from "react-icons/lu";

const CreateEventListItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement> & Pick<LinkProps, "href">>(
  ({ href, className, ...props }, ref) => {
    return (
      <li ref={ref} {...props}>
        <Link href={href} className={cn("h-full w-full flex flex-col justify-center items-center", className)}>
          <LuPlus className="text-7xl" />
          <span className="text-lg">Create Event</span>
        </Link>
      </li>
    );
  },
);

CreateEventListItem.displayName = "CreateEventListItem";

export default CreateEventListItem;
