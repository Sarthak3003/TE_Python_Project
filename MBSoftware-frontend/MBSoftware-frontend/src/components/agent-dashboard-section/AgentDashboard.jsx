import React,{ useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Navbar from '../Navbar';
import AgentFilter from './AgentFilter';
import Pending from './Pending';
import NewForm from './NewForm';
import { MdLogout, MdAppRegistration, MdFilterAlt,MdAddCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

export default function AgentDashboard() {
    const navigate = useNavigate()
    const { isAdmin } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [agentFilter, setAgentFilter] = useState(false);
    const [pending, setPending] = useState(false)
    const [newForm, setNewForm] = useState(false)

    useEffect(() => {
        setAgentFilter(true);
        if(isAdmin) {
            navigate('/admin-dashboard')
        }
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Navbar />
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List color="primary">
                        {["Filters", "Pending"].map((t, index) => (
                            <ListItem
                                button
                                key={t}
                                onClick={() => {
                                    if (t === "Filters") {
                                        setAgentFilter(true);
                                        setPending(false);
                                        setNewForm(false);
                                    } else if (t === "Pending") {
                                        setAgentFilter(false);
                                        setPending(true);
                                        setNewForm(false);
                                        
                                    } 
                                    
                                }}
                            >
                                <ListItemIcon sx={{ color: "#9333ea", fontSize: "25px" }}>
                                    {index === 0 && <MdFilterAlt />}
                                    {index === 1 && <MdAppRegistration />}
                                    {/* {index === 2 && <MdUpdate />} */}
                                </ListItemIcon>
                                <ListItemText primary={t} sx={{ color: "black" }} />
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        {['New Form'].map((text, index) => (
                            <ListItem key={text} button sx={{backgroundColor : '#9333ea','&:hover': {
                                backgroundColor: '#581c87',
                                boxShadow: 'none',
                              },}}
                            
                            onClick={() =>{
                                //navigate to form page
                                navigate('form/new')}}
                            >

                                <ListItemIcon sx={{ color: "white", fontSize: "25px" }}>
                                    {index === 0 && <MdAddCircle />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: "white" }}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Logout'].map((text, index) => (
                            <ListItem key={text} button onClick={() => dispatch(logOut())}>

                                <ListItemIcon sx={{ color: "#dc2626", fontSize: "25px" }}>
                                    {index === 0 && <MdLogout />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: "black" }}/>

                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {agentFilter && <AgentFilter />}
                {pending && <Pending />}
                {/* {newForm && <NewForm />} */}

            </Box>
        </Box>
    );
}
