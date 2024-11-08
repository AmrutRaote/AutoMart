import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef( ( { className, ...props }, ref ) => (
  <CheckboxPrimitive.Root
    ref={ ref }
    className={ cn(
      "peer size-2 shrink-0 rounded-sm border border-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white-foreground",
      className
    ) }
    { ...props }>
    <CheckboxPrimitive.Indicator className={ cn( "flex items-center justify-center text-current" ) }>
      <Check className="size-1" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
) )
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
