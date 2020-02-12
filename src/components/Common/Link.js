// @flow 
import React from 'react'
import type { Node } from 'react';

type Props = {
  url: string,
  children: Node
}

const Link = ({ url, children }: Props) => {
  return (
    <a href={url} 
       rel="noopener noreferrer"
       target="_blank" 
    >
      {children}
    </a>
  )
}

export default Link