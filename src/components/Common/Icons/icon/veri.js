import React from 'react';

const SvgVeri = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <defs>
      <linearGradient id="veri_svg__c" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF" stopOpacity={0.5} />
        <stop offset="100%" stopOpacity={0.5} />
      </linearGradient>
      <circle id="veri_svg__b" cx={16} cy={15} r={15} />
      <filter id="veri_svg__a" width="111.7%" height="111.7%" x="-5.8%" y="-4.2%" filterUnits="objectBoundingBox">
        <feOffset dy={0.5} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation={0.5} />
        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1" />
        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0" />
      </filter>
      <path
        id="veri_svg__e"
        d="M6 7c1.104.002 2.209.002 3.312 0l2.091 11.18c.033.165.073.328.116.49.164-.65.267-1.314.404-1.97L13.827 7l3.204.001c-1.175 5.232-2.35 10.465-3.527 15.697H9.527C8.35 17.469 7.175 12.24 6 7.01V7zm12.314 4.932c.697-.876 1.811-1.273 2.885-1.343 1.06-.074 2.202.022 3.1.654.795.556 1.231 1.496 1.438 2.431.251 1.172.264 2.376.263 3.57h-5.87c.005.883-.05 1.794.245 2.64.143.416.41.83.834.981.452.147.996.051 1.326-.313.44-.498.532-1.196.628-1.835h2.664c-.06 1.06-.256 2.18-.95 3.013-.696.866-1.818 1.22-2.88 1.263-1.154.044-2.407-.113-3.327-.89-.855-.713-1.228-1.843-1.376-2.926-.148-1.247-.156-2.509-.087-3.762.093-1.222.314-2.516 1.106-3.484zm2.274 1.245c-.454.654-.466 1.496-.458 2.267h3.032c-.047-.733-.042-1.507-.372-2.178-.41-.828-1.706-.831-2.2-.088h-.002z"
      />
      <filter id="veri_svg__d" width="117.5%" height="121.9%" x="-8.8%" y="-7.8%" filterUnits="objectBoundingBox">
        <feOffset dy={0.5} in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation={0.5} />
        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.204257246 0" />
      </filter>
    </defs>
    <g fill="none">
      <use fill="#000" filter="url(#veri_svg__a)" xlinkHref="#veri_svg__b" />
      <use fill="#F93" fillRule="evenodd" xlinkHref="#veri_svg__b" />
      <use
        fill="url(#veri_svg__c)"
        fillRule="evenodd"
        style={{
          mixBlendMode: 'soft-light',
        }}
        xlinkHref="#veri_svg__b"
      />
      <circle cx={16} cy={15} r={14.5} stroke="#000" strokeOpacity={0.097} />
      <use fill="#000" filter="url(#veri_svg__d)" xlinkHref="#veri_svg__e" />
      <use fill="#FFF" fillRule="evenodd" xlinkHref="#veri_svg__e" />
    </g>
  </svg>
);

export default SvgVeri;
