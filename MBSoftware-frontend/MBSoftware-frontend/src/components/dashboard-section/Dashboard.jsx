import { useState, useEffect } from 'react';
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
import Navbar from '../../components/Navbar';
import NewApplication from './NewApplication';
import UpdateApplication from './UpdateApplication';
import BlankVerification from './BlankVerification';
import Filter from './Filter';
import PendingPayment from './PendingPayment';
import AllMembers from './AllMembers';
import VerifiedApplication from './VerifiedApplications';
import AllApplicants from './AllApplicants';
import AgentInfo from './AgentInfo'
import NewRegistration from './NewRegistration';
import { MdLogout, MdGroups, MdDangerous, MdPayments, MdUpdate, MdAppRegistration, MdFilterAlt, MdCheck, MdAddCircle, MdInfo, MdAccountCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

export default function ClippedDrawer() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isAgent } = useSelector(state => state.auth)
    const [filter, setFilter] = useState(false);
    const [newApplication, setNewApplication] = useState(false)
    const [updateApplication, setUpdateApplication] = useState(false)
    const [declinedApplication, setDeclinedApplication] = useState(false)
    const [pendingPayment, setPendingPayment] = useState(false)
    const [allMembers, setAllMembers] = useState(false)
    const [allApplicants, setAllApplicants] = useState(false)
    const [verifiedApplication, setVerifiedApplication] = useState(false)
    const [agentInfo, setAgentInfo] = useState(false)
    const [newRegistration, setNewRegistration] = useState(false)

    useEffect(() => {
        setNewApplication(true);
        if(isAgent) {
            console.log(isAgent)
            navigate('/agent-dashboard')
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
                        {["Filters", "New Application", "Updated Application", "Declined Application", "Payment Pending", "All Members", "All Applicants", "Agent Information", "Agent Registration"].map((t, index) => (
                            <ListItem
                                button
                                key={t}
                                onClick={() => {
                                    if (t === "New Application") {
                                        setFilter(false);
                                        setNewApplication(true);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setVerifiedApplication(false);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)

                                    } else if (t === "Updated Application") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(true);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)

                                    } else if (t === "Declined Application") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(true);
                                        setPendingPayment(false);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)

                                    }
                                    else if (t === "Filters") {
                                        setFilter(true);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)

                                    }
                                    else if (t === "Payment Pending") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(true);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)

                                    }
                                    else if (t === "All Members") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setAllMembers(true);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)
                                    }
                                    else if (t === "All Applicants") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setAllMembers(false);
                                        setAllApplicants(true);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(false)
                                    }
                                    
                                    else if (t === "Agent Information") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(true)
                                        setNewRegistration(false)
                                    }
                                    else if (t === "Agent Registration") {
                                        setFilter(false);
                                        setNewApplication(false);
                                        setUpdateApplication(false);
                                        setDeclinedApplication(false);
                                        setPendingPayment(false);
                                        setAllMembers(false);
                                        setAllApplicants(false);
                                        setVerifiedApplication(false);
                                        setAgentInfo(false)
                                        setNewRegistration(true)
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: "#9333ea", fontSize: "25px" }}>
                                    {index === 0 && <MdFilterAlt />}
                                    {index === 1 && <MdAppRegistration />}
                                    {index === 2 && <MdUpdate />}
                                    {index === 3 && <MdDangerous />}
                                    {index === 4 && <MdCheck />}
                                    {index === 5 && <MdPayments />}
                                    {index === 6 && <MdGroups />}
                                    {index === 7 && <MdGroups />}
                                    {index === 8 && <MdInfo />}
                                    {index === 9 && <MdAccountCircle />}

                                </ListItemIcon>
                                <ListItemText primary={t} sx={{ color: "black" }} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['New Form'].map((text, index) => (
                            <ListItem key={text} button sx={{
                                backgroundColor: '#9333ea', '&:hover': {
                                    backgroundColor: '#581c87',
                                    boxShadow: 'none',
                                },
                            }}

                                onClick={() => {
                                    //navigate to form page
                                    navigate('/form/new')
                                }}
                            >

                                <ListItemIcon sx={{ color: "white", fontSize: "25px" }}>
                                    {index === 0 && <MdAddCircle />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: "white" }} />
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        {['Logout'].map((text, index) => (
                            <ListItem key={text} button onClick={() => dispatch(logOut())}>

                                <ListItemIcon sx={{ color: "#dc2626", fontSize: "25px" }}>
                                    {index === 0 && <MdLogout />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: "black" }} />

                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {newApplication && (<NewApplication />)}
                {updateApplication && (<UpdateApplication />)}
                {declinedApplication && (<BlankVerification />)}
                {filter && (<Filter />)}
                {pendingPayment && (<PendingPayment />)}
                {allMembers && (<AllMembers />)}
                {allApplicants && (<AllApplicants />)}
                {/* {verifiedApplication && (<VerifiedApplication />)} */}
                {agentInfo && (<AgentInfo />)}
                {newRegistration && (<NewRegistration />)}

            </Box>
        </Box>
    );
}
