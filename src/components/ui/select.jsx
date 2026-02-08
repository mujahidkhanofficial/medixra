"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext(null)

const Select = ({ children, value, onValueChange, defaultValue }) => {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(defaultValue || "")

    const val = value !== undefined ? value : selectedValue

    const handleValueChange = (newValue) => {
        if (value === undefined) setSelectedValue(newValue)
        onValueChange?.(newValue)
        setOpen(false)
    }

    const containerRef = React.useRef(null)

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <SelectContext.Provider value={{ open, setOpen, value: val, onValueChange: handleValueChange }}>
            <div className="relative" ref={containerRef}>{children}</div>
        </SelectContext.Provider>
    )
}

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(SelectContext)
    return (
        <button
            onClick={() => setOpen(!open)}
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
            type="button"
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => {
    const { open } = React.useContext(SelectContext)
    if (!open) return null

    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 w-full mt-1",
                position === "popper" && "translate-y-1",
                className
            )}
            {...props}
        >
            <div className="p-1">{children}</div>
        </div>
    )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
    const isSelected = selectedValue === value

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 cursor-pointer",
                className
            )}
            onClick={() => onValueChange(value)}
            {...props}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            <span className="truncate">{children}</span>
        </div>
    )
})
SelectItem.displayName = "SelectItem"

const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
    const { value } = React.useContext(SelectContext)
    // We can't easily find the label for the value without more complex logic or children traversal.
    // For this simple mock, we might need the parent to pass the label, OR we assume the value IS the label if no children mapping exists.
    // Ideally, SelectValue should display the text content of the selected SelectItem.
    // To keep this simple and compatible with typical usage, we'll just display the value for now, 
    // or rely on the user passing the display text if it differs significantly.
    // In many cases `value` is an ID but we want to show a Name. 
    // The Quick Fix for a custom select without Context-based label lookup:
    // We will render the `value` directly. 
    // BETTER FIX: The `children` of `Select` are usually static. We can't easily peek inside `SelectContent`.

    // ADJUSTMENT: For this specific app, the `value` is usually readable (City names, etc). 
    // If it's an ID, this simple mock might show the ID.
    // Given the `AddListingPage` uses `value` which is state, we can use that.

    return (
        <span ref={ref} className={className} {...props}>
            {value || placeholder}
        </span>
    )
})
SelectValue.displayName = "SelectValue"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
