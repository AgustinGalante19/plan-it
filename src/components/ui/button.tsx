import React, { forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/utils/cn"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "rounded flex items-center justify-center transition-colors gap-2 hover:bg-opacity-90 disabled:bg-opacity-70",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline:
          "bg-secondary text-primary border border-primary border-opacity-50",
      },
      size: {
        small: "text-sm px-2 py-1",
        normal: "text-base py-1 px-3",
        large: "text-lg px-3 py-2",
      },
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = "button",
    children,
    variant = "default",
    className,
    size = "normal",
    isLoading = false,
    disabled,
    ...rest
  } = props
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(buttonVariants({ className, variant, size }))}
      disabled={disabled || isLoading}
    >
      {children}
      {isLoading && <Loader2 className='animate-spin' size={16} />}
    </button>
  )
})

Button.displayName = "Button"

export default Button
