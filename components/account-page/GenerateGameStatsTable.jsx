import {Table} from "react-bootstrap";

/**
 * TABLE GENERATOR
 *
 * - component renders a TABLE for redirection into specific class
 *
 *
 * @param statsMap
 * @param redirectDestination
 * @returns {JSX.Element}
 * @constructor
 */
const StatsTable = ({statsMap}) => {
    return (
        <Table
            bgcolor={'primary'}
            style={{width: '18rem', color: 'white'}}
            className={"m-4 mb-2 darkShadow rounded"}
        >
            <tbody>
            <tr>
                <td>nejlepsi vysledek:</td>
                <td>3ka! ☻</td>
            </tr>
            </tbody>
        </Table>
    )
}

export default StatsTable