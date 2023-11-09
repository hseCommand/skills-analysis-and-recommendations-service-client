import React from "react";

import './button.less';

type IButtonProps = {
  title: string,
  disabled?: boolean,
  onClick: () => void,
  children: any
}

export const Button: React.FC<IButtonProps> = (props): React.ReactElement => {
  const { onClick, children } = props
  return (
    <button className={'button'} onClick={onClick}>
      {children}
    </button>
  )

}