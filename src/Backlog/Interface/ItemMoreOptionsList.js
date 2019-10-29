import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import ItemModel from '../Models/ItemModel';

export default function ItemMoreOptionsList(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleClone = () => {
        setAnchorEl(null);
        var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const clonedItem = new ItemModel(
            {
                summary: props.item.summary + "(1)",
                description: props.item.description,
                item_type_id: props.item.item_type_id,
                item_priority_id: props.item.item_priority_id,
                item_status_id: props.item.item_status_id,
                sprint_id: props.item.sprint_id,
                created_by: "system.user",
                created_date: now,
                updated_by: "system.user",
                updated_date: now
            }
        );

        props.cloneItem(clonedItem)
    };

    const handleDelete = () => {
        setAnchorEl(null);
        props.deleteItem(props.item)
    }

    return (
        <div>

            <IconButton edge="end" aria-label="more" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClone}>Clone</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    )
}