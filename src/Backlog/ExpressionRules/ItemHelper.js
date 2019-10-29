import React from 'react';

import AssignmentIcon from '@material-ui/icons/Assignment';
import BugIcon from '@material-ui/icons/BugReport';
import BookIcon from '@material-ui/icons/Book';
import Help from '@material-ui/icons/Help';
import LabelImportant from '@material-ui/icons/LabelImportant';
import Tooltip from '@material-ui/core/Tooltip';

import ListItemIcon from '@material-ui/core/ListItemIcon';



export const LOOKUP_ITEM_PRIORITY = [
  {
    value: 1,
    label: 'Urgent',
  },
  {
    value: 2,
    label: 'High',
  },
  {
    value: 3,
    label: 'Normal',
  },
  {
    value: 4,
    label: 'Low',
  },
];

export const LOOKUP_ITEM_TYPE = [
  {
    value: 1,
    label: 'User story',
  },
  {
    value: 2,
    label: 'Epic',
  },
  {
    value: 3,
    label: 'Defect',
  }
];


export function GetIconForItemType(itemTypeID) {

  // const classes = useStyles();
  var data = null;
  var label = LOOKUP_ITEM_TYPE[itemTypeID-1].label;

  switch (itemTypeID) {
    case 1:
      data =
        <BookIcon style={{ color: "blue" }} />;

      break;
    case 2:
      data = <AssignmentIcon  style={{ color: "green" }} />;

      break;
    case 3:
      data = <BugIcon style={{color: "red"}} />;

      break;
    default: data = <Help />
      break;
  }

  return (
    <Tooltip title={label} placement="top">
      <ListItemIcon>
        {data}
      </ListItemIcon>
    </Tooltip>
  )

}

export function GetIconForItemPriority(itemPriorityID) {
  var data = null;

  var label = LOOKUP_ITEM_PRIORITY[itemPriorityID-1].label;


  switch (itemPriorityID) {
    case 1:
      data = <LabelImportant style={{ color: "red" }} />;
      break;

    case 2:
      data = <LabelImportant style={{ color: "orange" }} />;
      break;

    case 3:
      data = <LabelImportant style={{ color: "green" }} />;
      break;

    case 4:
      data = <LabelImportant style={{ color: "blue" }} />;
      break;

    default: data = <LabelImportant style={{ color: "05C7F2" }} />
      break;

  }

  return (
    <Tooltip title={label} placement="top">
      <ListItemIcon>
        {data}
      </ListItemIcon>
    </Tooltip>
  )

}
