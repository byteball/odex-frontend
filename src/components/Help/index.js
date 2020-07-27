import React from 'react';
import { Classes, Popover, Tooltip, Icon } from "@blueprintjs/core";
import { Colors, Box } from '../Common'

function Help(props) {
  const {
    icon,
    position,
    disabled,
    children,
  } = props;

  return (
      <Popover
        content={children}
        position={position}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        disabled={disabled}
      >
        <Tooltip
          position={position}
          disabled={disabled}
        >
          <Box {...props}>
            <Icon icon={icon} color={Colors.GRAY1}/>
          </Box>
        </Tooltip>
      </Popover>
  );
}

Help.defaultProps = {
  label: 'Click to know more',
  icon: 'help'
};

export default Help;
