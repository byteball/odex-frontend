import React from 'react';

const SvgKmd = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-27L8.518 8.207a.932.932 0 0 0-.494.5L5 16l3.023 7.38c.094.228.275.41.504.506L16 27l7.473-3.114a.932.932 0 0 0 .504-.507L27 16l-3.024-7.294a.932.932 0 0 0-.494-.5L16 5zm0 4.475l4.568 1.957L22.525 16l-1.957 4.568L16 22.525l-4.568-1.957L9.475 16l1.957-4.568L16 9.475zm0 1.957l-3.263 1.305L11.432 16l1.305 3.263L16 20.568l3.263-1.305L20.568 16l-1.305-3.263L16 11.432z"
    />
  </svg>
);

export default SvgKmd;
