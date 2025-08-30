import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropdownButton({ inputDriverNum, inputDriverName }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseReplace = (driverName) => {
        const driverNum = drivers.find(driver => driverName === driver.name)
        setAnchorEl(null);
        setSelectedDriver(driverName);
        inputDriverNum(driverNum.numberInt);
        inputDriverName(driverName);
    }

    const [hovering, setHovering] = React.useState(false);
    const [drivers, setDrivers] = React.useState([]);
    const [selectedDriver, setSelectedDriver] = React.useState('Select Driver')

    React.useEffect(() => {
        fetch('https://f1-project-backend.onrender.com/drivers')
        .then((response) => {return response.json()})
        .then((data) => {
            setDrivers(data);
        })
    }, [])

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                sx={hovering === true ? {color: '#18191A', border: 1, backgroundColor: '#f2e9e5', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 17, height: '37px'} : {color: '#f2e9e5', border: 1, fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: 17, height: '37px'}} 
            >
                {selectedDriver}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                paper: {
                    style: {
                        maxHeight: '155px',
                    },
                },
                list: {
                    'aria-labelledby': 'basic-button',
                }
                }}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                sx={{fontFamily: 'Helvetica, Arial, sans-serif'}}
            >
                {drivers.map((item, i) => (
                    <MenuItem 
                        key={item.name}
                        onClick={() => handleCloseReplace(item.name)} 
                        sx={{fontFamily: 'Helvetica, Arial, sans-serif'}}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
