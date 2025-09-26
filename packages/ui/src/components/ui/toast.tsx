import {ToasterProps, Toaster as Sonner} from "sonner";
import React from "react";

export const Toaster = ({...props}: ToasterProps) => {
  return (
    <Sonner
      className={'toaster group'}
      style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties
    }
      {...props}
      />
  )
}
