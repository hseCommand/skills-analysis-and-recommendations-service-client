import React from "react";

import './button.less';

type IButtonProps = {
  disabled?: boolean,
  onClick: () => void,
  children: React.ReactNode
}

export const Button: React.FC<IButtonProps> = ({ onClick, children, disabled = false }): React.ReactElement => {
  return (
    <button className="button" onClick={onClick} disabled={disabled} >
      {children}
    </button>
  );
}