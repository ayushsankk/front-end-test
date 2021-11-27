import React from 'react';

import { Link } from 'react-router-dom';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import WebIcon from '@mui/icons-material/Web';

import './user-detail.styles.scss';

const UserDetail = ({ userDetail }) => {
  const { name, email, address, phone, website } = userDetail;
  return (
    <div className="user-details">
      <h1>{name}</h1>
      <div className="icon-group">
        <LocalPhoneIcon />
        <p>{phone}</p>
      </div>
      <div className="icon-group">
        <EmailIcon />
        <p>{email}</p>
      </div>
      <div className="icon-group">
        <HomeIcon />
        <Link
          to={{
            pathname: `https://maps.google.com?q=${address.geo.lat},${address.geo.lng}`,
          }}
          target="_blank"
        >
          {address.city}
        </Link>
      </div>
      <div className="icon-group">
        <WebIcon />
        <Link to={{ pathname: `https://${website}` }} target="_blank">
          {website}
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
