import Button from '@mui/material/Button/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC<any> = ({ route, title }) => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <Button variant="contained" onClick={() => navigate(route)}>
        {title}
      </Button>
    </div>
  );
};

export default Footer;
