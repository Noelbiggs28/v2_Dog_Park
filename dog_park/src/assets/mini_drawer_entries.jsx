import AccountCircle from '@mui/icons-material/AccountCircle';
import ParkIcon from '@mui/icons-material/Park';

export const MiniDrawerEntries = [
    {
        id: 0,
        icon: <AccountCircle />,
        label: 'My Profile',
        route: '/MyProfile',
    },
    {
        id: 1,
        icon: <ParkIcon />,
        label: 'Parks',
        route: '/Parks'
    }
]