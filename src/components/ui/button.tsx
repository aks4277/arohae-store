import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-stone-900 text-stone-50 shadow hover:bg-stone-900/90",
        destructive:
          "bg-red-500 text-stone-50 shadow-sm hover:bg-red-500/90",
        outline:
          "border border-stone-200 bg-transparent shadow-sm hover:bg-stone-100 hover:text-stone-900",
        secondary:
          "bg-stone-100 text-stone-900 shadow-sm hover:bg-stone-100/80",
        ghost: "hover:bg-stone-100 hover:text-stone-900",
        link: "text-stone-900 underline-offset-4 hover:underline",
        luxury: "bg-[#947156] text-white hover:bg-[#83634a] shadow-md transition-all duration-300",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
