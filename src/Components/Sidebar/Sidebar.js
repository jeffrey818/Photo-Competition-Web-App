import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {auth} from "../../firebase"
import {onAuthStateChanged } from "firebase/auth";

// for sidebar
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import "./Sidebar.css";

// for icons
import { AiFillPlusCircle } from "react-icons/ai";
import { GiVote } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { ImEnter } from "react-icons/im";
import { BiPhotoAlbum, BiGlassesAlt } from "react-icons/bi";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const Sidebar = () => {

    const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    onAuthStateChanged(auth, (user)=>{
        if (user){
            return setIsUserSignedIn(true);
        } setIsUserSignedIn(false);
    })

    if (isUserSignedIn === true) {
        return (
        <>
            <div id='sidebar'>
                <ProSidebar collapsed={menuCollapse}>

                    <div className="closemenu" onClick={menuIconClick}>
                        {/* changing menu collapse icon on click */}
                        {menuCollapse ? (
                            <FiArrowRightCircle size={30}/>
                        ) : (
                            <FiArrowLeftCircle size={30} />
                        )}
                    </div>
                    
                    <Menu iconShape="circle">
                        <MenuItem icon={<AiFillPlusCircle />}>
                            Create Competition
                            <Link to={"../CreateCompetition"}></Link>
                        </MenuItem>
                        <MenuItem icon={<ImEnter />}>
                            Join Competition
                            <Link to={"../JoinCompetition"}></Link>
                        </MenuItem>
                        <MenuItem icon={<BiPhotoAlbum />}>
                            Gallery
                            <Link to={"/"}></Link>
                        </MenuItem>
                        <MenuItem icon={<GiVote />}>
                            Vote
                            <Link to={"../Vote"}></Link>
                        </MenuItem>
                        <MenuItem icon={<VscGraphLine />}>
                            Competition Results
                            <Link to={"../Results"}></Link>
                        </MenuItem>
                        <MenuItem icon={<BiGlassesAlt />}>View All</MenuItem>
                    </Menu>
                </ProSidebar>
            </div>
        </>
        );
    }
    else{
        return (
            <>
                <div id='sidebar'>
                    <ProSidebar collapsed={menuCollapse}>
    
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle size={30}/>
                            ) : (
                                <FiArrowLeftCircle size={30} />
                            )}
                        </div>
                        
                        <Menu iconShape="circle">
                            <MenuItem icon={<BiPhotoAlbum />}>
                                Gallery
                                <Link to={"/"}></Link>
                            </MenuItem>
                            {/*<MenuItem icon={<VscGraphLine />}>*/}
                            {/*    Competition Results*/}
                            {/*    <Link to={"../Results"}></Link>*/}
                            {/*</MenuItem>*/}
                            {/*<MenuItem icon={<BiGlassesAlt />}>View All</MenuItem>*/}
                        </Menu>
                    </ProSidebar>
                </div>
            </>
        );
    }
};

export default Sidebar;