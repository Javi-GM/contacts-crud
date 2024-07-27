import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

interface ButtonProps extends Partial<HTMLButtonElement> {
  className?: string
  icon?: any
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

export const buttonVariants = cva(
  `text-white py-2 px-4 rounded-md flex gap-2 items-center`,
  {
    variants: {
      variant: {
        default:
          "bg-slate-500 hover:bg-slate-600",
        secondary:
          "bg-slate-100 hover:bg-slate-200 text-slate-800",
        destructive:
          "bg-red-500 hover:bg-red-600",
        outline: "bg-transparent border border-slate-500 hover:bg-slate-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export default function Button({ children, variant = 'default', icon, ...props }: ButtonProps) {
  return <button {...props as any} class={cn(buttonVariants({ variant }))}>{icon} {children}</button>
}
