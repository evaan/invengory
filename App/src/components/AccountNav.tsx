import { Avatar, Skeleton, Menu, MenuItem, IconButton, ListItemAvatar, ListItemText, ListItemIcon, Divider } from "@mui/material"
import useSWR from "swr"
import { fetcher, logout } from "../api"
import { redirect, useLocation } from "react-router-dom"
import React from "react"
import { useState } from "react"
import { Logout } from "@mui/icons-material"

function AccountNav() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { data, error, isLoading } = useSWR('/api/auth/whoami', fetcher);
    const location = useLocation();

    if (error) {
        if (location.pathname !== "/login") {
            redirect("/login");
        } 
        return (<></>)
    } // TODO: think about how to handle this
    if (isLoading) return <Skeleton />



    return (
        <>
            <IconButton onClick={handleClick}>
                <Avatar src={data.google_profile_photo_url}></Avatar>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <ListItemAvatar>
                        <Avatar src={data.google_profile_photo_url}></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={data.full_name} secondary={data.email}></ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon><Logout></Logout></ListItemIcon>
                    <ListItemText primary="Logout" onClick={logout}></ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export default AccountNav
