import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  Home as HomeIcon,
  // Lock as LockIcon,
  Settings as SettingsIcon,
  Clipboard as ClipboardIcon,
  User as UserIcon,
  // UserPlus as UserPlusIcon,
  Users as UsersIcon,
  FileText as FileTextIcon
} from 'react-feather';
import AccountCircle from '@material-ui/icons/AccountCircle'
import AddLocation from '@material-ui/icons/AddLocation'
import NavItem from './NavItem';
import { useSelector } from 'react-redux';

const user = {
  avatar: <AccountCircle />,
};

const items = [
  {
    href: '/app/dashboard',
    icon: HomeIcon,
    title: 'INÍCIO'
  },
  {
    href: '/app/aidpi',
    icon: ClipboardIcon,
    title: 'AIDPI'//PRODUCTS
  },
  {
    href: '/app/patients',
    icon: UsersIcon,
    title: 'PACIENTES'
  },
  {
    href: '/app/vaccination',
    icon: FileTextIcon,
    title: 'VACINAÇÃO'//PRODUCTS
  },
  {
    href: '/app/user',
    icon: UserIcon,
    title: 'USUÁRIOS'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'AJUSTES'
  },/*
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }*/
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  Icon: {
    fontSize: 15
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const jobTitle = useSelector(state => state.office)
  const name = useSelector(state => state.name)
  const serviceStation = useSelector(state => state.serviceStation)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {jobTitle}
        </Typography> <Typography
          color="textPrimary"
          variant="body2"
        >
          <AddLocation className={classes.Icon} /> {serviceStation}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
