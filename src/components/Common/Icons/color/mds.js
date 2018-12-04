import React from 'react';

const SvgMds = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx={16} cy={16} fill="#1e252c" r={16} />
      <path
        d="M14.22 15.589a1.507 1.507 0 1 1 0-3.014 1.507 1.507 0 0 1 0 3.014zm3.698 0a1.507 1.507 0 1 1 0-3.014 1.507 1.507 0 0 1 0 3.014zm-3.699 3.699a1.507 1.507 0 1 1 0-3.014 1.507 1.507 0 0 1 0 3.014zm3.699 0a1.507 1.507 0 1 1 0-3.014 1.507 1.507 0 0 1 0 3.014zm3.698-4.11a1.096 1.096 0 1 1 0-2.192 1.096 1.096 0 0 1 0 2.192zm0 3.699a1.096 1.096 0 1 1 0-2.192 1.096 1.096 0 0 1 0 2.192zm-11.232-3.699a1.096 1.096 0 1 1 0-2.192 1.096 1.096 0 0 1 0 2.192zm0 3.699a1.096 1.096 0 1 1 0-2.192 1.096 1.096 0 0 1 0 2.192zm3.835 3.698a1.096 1.096 0 1 1 0-2.191 1.096 1.096 0 0 1 0 2.191zm3.699 0a1.096 1.096 0 1 1 0-2.191 1.096 1.096 0 0 1 0 2.191zM14.219 11.48a1.096 1.096 0 1 1 0-2.191 1.096 1.096 0 0 1 0 2.191zm3.699 0a1.096 1.096 0 1 1 0-2.191 1.096 1.096 0 0 1 0 2.191zm-3.699-4.11a.685.685 0 1 1 0-1.369.685.685 0 0 1 0 1.37zm3.699 0a.685.685 0 1 1 0-1.369.685.685 0 0 1 0 1.37zm7.397 7.398a.685.685 0 1 1 0-1.37.685.685 0 0 1 0 1.37zm0 3.699a.685.685 0 1 1 0-1.37.685.685 0 0 1 0 1.37zm-18.63-3.699a.685.685 0 1 1 0-1.37.685.685 0 0 1 0 1.37zm0 3.699a.685.685 0 1 1 0-1.37.685.685 0 0 1 0 1.37zM14.219 26a.685.685 0 1 1 0-1.37.685.685 0 0 1 0 1.37zm3.699 0a.685.685 0 1 1 0-1.37.685.685 0 0 1 0 1.37z"
        fill="#fff"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default SvgMds;
