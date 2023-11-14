import React from 'react'

import './texts.less'

/**
 * Фабрика компонетов для текстов
 *
 */

interface ITextProps {
  // text: string
  className?: string
  children: React.ReactNode
}

const TextConfigurableComponent: React.FC<ITextProps> = (props) => {
  console.log(props)

  return <div className={'text ' + props.className}>{props.children}</div>
}

export const Header: React.FC<ITextProps> = (props) => {
  return (
    <TextConfigurableComponent className="header">
      {props.children}
    </TextConfigurableComponent>
  )
}

export const Description: React.FC<ITextProps> = (props) => {
  return (
    <TextConfigurableComponent className="description">
      {props.children}
    </TextConfigurableComponent>
  )
}
