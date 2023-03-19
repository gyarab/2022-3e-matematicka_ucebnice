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
    console.log(statsMap);

    return (
        <Table
            bgcolor={'secondary'}
            style={{color: 'white'}}
            className={`table rounded`}
        >
            <tbody>
            {
                [...statsMap.keys()].map((key) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{statsMap.get(key)}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    )
}

export default StatsTable