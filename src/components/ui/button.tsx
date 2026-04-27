import * as React from "react"

import { cn } from "@/lib/utils"

const baseButtonClass =
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50"

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  outline: "border-border bg-background hover:bg-muted hover:text-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-muted hover:text-foreground",
  destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  link: "text-primary underline-offset-4 hover:underline",
} as const

const sizeClasses = {
  default: "h-8 gap-1.5 px-2.5",
  xs: "h-6 gap-1 px-2 text-xs",
  sm: "h-7 gap-1 px-2.5 text-[0.8rem]",
  lg: "h-9 gap-1.5 px-2.5",
  icon: "size-8",
  "icon-xs": "size-6",
  "icon-sm": "size-7",
  "icon-lg": "size-9",
} as const

type ButtonVariant = keyof typeof variantClasses
type ButtonSize = keyof typeof sizeClasses

function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return cn(baseButtonClass, variantClasses[variant], sizeClasses[size], className)
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
