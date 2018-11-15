import React from 'react';

const SvgXas = props => (
  <svg width={64} height={64} {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx={16} cy={16} fill="#faa00d" r={16} />
      <path
        d="M25.992 14.471l-9.469 11.01-.425.519L6.007 14.582l.032-.013L6 14.563l3.922-6.557.002.002L9.922 8h12.254l-.002.007L26 14.47zm-13.136.459l-2.17 3.674 5.352 6.112 5.363-6.162-2.122-3.635zm-2.778 2.98l1.76-2.979-4.362.007zm9.723-3.846l4.954-.008-3.11-5.208-4.882.01zm4.771.846l-4.273.007 1.713 2.935zm-5.791-.844L16.09 9.454l-2.73 4.62zm-8.399-5.194l-3.1 5.213 5.06-.009 3.08-5.214z"
        fill="#fff"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default SvgXas;
