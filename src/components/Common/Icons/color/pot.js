import React from 'react';

const SvgPot = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx={16} cy={16} r={16} fill="#105B2F" />
      <path
        fill="#FFF"
        d="M12.033 18.18l-.39 1.987-.71 3.651c-.02.11-.048.184-.188.182-.882-.013-1.764-.02-2.646-.03-.021 0-.043-.014-.099-.035l1.99-9.94H8.313c.004-.074.002-.118.01-.16.103-.537.214-1.073.307-1.612.026-.15.093-.188.233-.187.41.004.82-.011 1.228.003.195.006.27-.05.308-.242.228-1.188.472-2.372.706-3.558.028-.141.059-.238.243-.238 2.008.006 4.017-.013 6.025.013 1.172.015 2.347.075 3.5.312.397.082.8.188 1.168.352 1.058.47 1.695 1.284 1.872 2.411.275 1.751-.096 3.36-1.22 4.762-.83 1.032-1.968 1.611-3.239 1.963-1.008.279-2.042.366-3.084.368-1.355.003-2.71 0-4.065-.001h-.272zm.555-2.738h.283c1.433 0 2.866.003 4.3-.002.305 0 .614-.013.917-.05 1.157-.138 2.036-.693 2.598-1.7a2.14 2.14 0 0 0 .229-1.434c-.118-.697-.534-1.152-1.241-1.28a9.826 9.826 0 0 0-1.569-.17c-1.472-.027-2.944-.016-4.417-.02-.053 0-.106.008-.177.014l-.244 1.248h4.09l-.376 1.938h-4.103l-.29 1.456z"
      />
    </g>
  </svg>
);

export default SvgPot;
