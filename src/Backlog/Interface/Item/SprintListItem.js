import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import ItemMoreOptionsList from '../Item/ItemMoreOptionsList'

// import GetIconForItemType from '../../ExpressionRules/GetIconForItem';


import Tooltip from '@material-ui/core/Tooltip';

import { GetIconForItemType, GetIconForItemPriority } from '../../ExpressionRules/ItemHelper';

class SprintListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: "",
            data: null,
            selectedItemID: null,
            anchorEl: null
        };
        this.handleSelect = this.handleSelect.bind(this);

    }

    handleSelect(event) {
        this.setState({ selectedItemID: event.target.id });
        console.log(event.target.id)
        // this.setState({selectedItemID: event.target.value});
        // console.log(event.target.value)
    }




    render() {
        var itemTypeIcon = GetIconForItemType(this.props.data.ItemTypeID);
        var itemPriorityIcon = GetIconForItemPriority(this.props.data.ItemPriorityID);

        return (
            <div>
                <ListItem button id={this.props.data.ItemID}
                    onClick={this.handleSelect}
                >
                    <ListItemIcon>
                        <DragIndicatorIcon />
                    </ListItemIcon>

                    {itemTypeIcon}

                    <ListItemText><b>{this.props.data.ItemID}</b> - {this.props.data.Summary}</ListItemText>



                    {itemPriorityIcon}

                    <Avatar>{String(this.props.data.AssigneeID).charAt(1).toUpperCase()}</Avatar>
                    <ListItemSecondaryAction>
                        {/* <IconButton edge="end" aria-label="more">
                            <MoreHorizIcon />
                        </IconButton> */}

                        <ItemMoreOptionsList />


                    </ListItemSecondaryAction>
                </ListItem>
            </div >
        );
    }
}

export default SprintListItem;