// @flow
import React from 'react';
import styled from 'styled-components'

import { Button, Collapse } from '@blueprintjs/core';

type Props = {
  visible: boolean,
  hash: string,
  toggleVisible: (SyntheticEvent<>) => void,
};

const TxReceiptRenderer = (props: Props) => {
  const { hash, visible, toggleVisible } = props;

  console.log(hash)

  return (
    <div>
      <Button minimal text={visible ? `Hide Receipt` : `Show Receipt`} onClick={toggleVisible} />
      <Collapse isOpen={visible}>
        <List>
          <Item key="1">Transaction Hash: {hash}</Item>
        </List>
      </Collapse>
    </div>
  );
};

const List = styled.ul`
`

const Item = styled.li`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default TxReceiptRenderer;
