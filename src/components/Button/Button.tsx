import React from "react";

import './button.less';
import { useTranslation } from "react-i18next";

type IButtonProps = {
  disabled?: boolean,
  onClick: () => void,
  children: React.ReactNode
}

export const Button: React.FC<IButtonProps> = ({ onClick, children, disabled = false }): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <button className="button" onClick={onClick} disabled={disabled} >
      {t(`example-of-i18next-usage`)}
    </button>
  );
}