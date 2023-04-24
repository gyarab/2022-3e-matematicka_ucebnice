import {Popover} from "react-bootstrap";
import React from "react"

/**
 * CUSTOM POPOVER
 *
 * This component standardizes the Popover component for this application
 * @param title
 * @param text
 * @returns {JSX.Element}
 * @constructor
 */
const CustomPopover = React.forwardRef((props, ref) => {
    return (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{props.title}</Popover.Header>
            <Popover.Body>
                {props.text}
            </Popover.Body>
        </Popover>
    )
})

export default CustomPopover