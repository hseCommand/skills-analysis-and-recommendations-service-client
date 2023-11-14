import React, { forwardRef } from 'react'

import './paddingWrapper.less'

interface IPaddingWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const PaddingWrapper = forwardRef<HTMLDivElement, IPaddingWrapperProps>(
  (props, ref) => {
    const { children, ...rest } = props
    return (
      <div ref={ref} className="paddingWrapper" {...rest}>
        {children}
      </div>
    )
  },
)

PaddingWrapper.displayName = 'PaddingWrapper'
