import Button from "@mui/material/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonNavProps {
  route: string;
  title: string;
  footerClicked?: (route: string) => void;
  disabled?: boolean;
}

const ButtonNav: React.FC<ButtonNavProps> = ({
  route,
  title,
  footerClicked,
  disabled,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          navigate(route);
          if (footerClicked) {
            footerClicked(route);
          }
        }}
        disabled={disabled}
      >
        {title}
      </Button>
    </>
  );
};

export default ButtonNav;
