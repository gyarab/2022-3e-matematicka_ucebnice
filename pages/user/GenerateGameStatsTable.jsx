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
        <div>
            <Table
                bg={'black'}
                text={'red'}
                style={{width: '18rem', color: 'white'}}
                className={"m-4 mb-2 darkShadow"}
            >
                <tbody>
                <tr>
                    <td>nejlepsi vysledek:</td>
                    <td>3ka! ☻</td>
                </tr>
                </tbody>
            </Table>
        </div>

    )
}

export default StatsTable