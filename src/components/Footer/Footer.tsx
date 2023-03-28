import Button from "@mui/material/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  route: string;
  title: string;
  footerClicked?: (route: string) => void;
  disabled?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  route,
  title,
  footerClicked,
  disabled,
}) => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <Button
        variant="contained"
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
    </div>
  );
};

export default Footer;
