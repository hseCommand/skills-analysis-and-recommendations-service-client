import React from "react";

import './button.less';

type IButtonProps = {
  title: string,
  disabled?: boolean,
  onClick: () => void,
  children: React.ReactNode
}

export const Button: React.FC<IButtonProps> = ({ title, onClick, children, disabled = false }): React.ReactElement => {
  return (
    <button className="button" onClick={onClick} disabled={disabled} aria-label={title}>
      {children}
    </button>
  );
}