import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useState} from "react";
import Image from "next/image";
import {navBarImageAltText, navBarImagePath} from "../../lib/frontend-env-variables";
import navBarStyles from '../../styles/NavBar.module.css'

/**
 * NAVIGATOR
 *
 * - bar on the top of the page
 * - after clicking on one of the buttons is user redirected to the requested route
 *
 * @type {string}
 * @param currentRoute
 * @returns {JSX.Element}
 * @constructor
 */
const NavBar = ({activeRoute}) => {
    /*
    TODO -> onClick outside the navbar => roll out the nav if it was rolled out
     */

    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined')
            setWindowWidth(window.innerWidth)
    }, [])

    return (
        <Navbar
            bg={"secondary"}
            expand={"lg"}
            fixed={'top'}
            className={`${navBarStyles.customNav}`}
        >
            <Container>
                <Navbar.Brand href={"/homepage"} className={'d-flex align-items-center'}>
                    {
                        windowWidth > 330 &&
                        <>
                            <Image
                                alt={navBarImageAltText}
                                src={navBarImagePath}
                                width={30}
                                height={30}
                                className={"rounded"}
                                priority={true}
                            />
                        </>
                    }
                    <div className={'ms-1'}>
                        Matematická učebnice
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls={"basic-navbar-nav"}
                />
                <Navbar.Collapse id={"basic-navbar-nav"}>
                    <Nav className={"me-auto"} activeKey={activeRoute}>
                        <Nav.Link href={"/class/sixth"} eventKey={'/class/sixth'}>Šestá třída</Nav.Link>
                        <Nav.Link href={"/class/seventh"} eventKey={'/class/seventh'}>Sedmá třída</Nav.Link>
                        <Nav.Link href={"/class/eight"} eventKey={'/class/eight'}>Osmá třída</Nav.Link>
                        <Nav.Link href={"/class/ninth"} eventKey={'/class/ninth'}>Devátá třída</Nav.Link>
                        <Nav.Link href={"/user/account"} eventKey={'/user/account'}>Můj účet</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    /*
    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
            Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider/>
        <NavDropdown.Item href="#action/3.4">
            Separated link
        </NavDropdown.Item>
    </NavDropdown>
     */
}

export default NavBar