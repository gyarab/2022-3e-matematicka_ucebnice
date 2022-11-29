import Link from 'next/link'
import navbarStyles from '../../styles/NavBar.module.css'

/**
 * Navigator
 * - bar on the top of the page
 * - after clicking on one of the buttons is user redirected to the requested route
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const NavBar = () => {
    return (
        <nav>
            <Link href={'/homepage'}>Home</Link>
            <Link href={'/class/sixth'}>Šestá třída</Link>
            <Link href={'/class/seventh'}>Sedmá třída</Link>
            <Link href={'/class/eight'}>Osmá třída</Link>
            <Link href={'/class/ninth'}>Devátá třída</Link>
        </nav>
    )
}

export default NavBar