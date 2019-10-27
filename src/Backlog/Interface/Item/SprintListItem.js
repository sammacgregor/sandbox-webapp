import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Avatar from '@material-ui/core/Avatar';

import ItemMoreOptionsList from '../Item/ItemMoreOptionsList'

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
        var itemTypeIcon = GetIconForItemType(this.props.data.item_type_id);
        var itemPriorityIcon = GetIconForItemPriority(this.props.data.item_priority_id);

        return (
            <div>
                <ListItem button id={this.props.data.item_id}
                    onClick={this.handleSelect}
                >
                    <ListItemIcon>
                        <DragIndicatorIcon />
                    </ListItemIcon>

                    {itemTypeIcon}

                    <ListItemText><b>{this.props.data.item_id}</b> - {this.props.data.summary}</ListItemText>



                    {itemPriorityIcon}

                    <Avatar>{String(this.props.data.assignee_id).charAt(1).toUpperCase()}</Avatar>
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