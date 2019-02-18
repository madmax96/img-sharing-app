import styled from 'styled-components';
import React from 'react';

const LogoSvg = styled.svg`
  height:150px;
  width:150px;
`;
const LogoImg = () => (
  <LogoSvg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 224 224"
  >
    <g
      fill="none"
      fillRule="nonzero"
      stroke="none"
      strokeWidth="1"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit="10"
      strokeDasharray=""
      strokeDashoffset="0"
    >
      <path d="M0,224v-224h224v224z" fill="none" />
      <g fill="#13547a">
        <g id="surface1">
          <path d="M3.64,0c-2.135,0.4025 -3.675,2.2925 -3.64,4.48v152.32c0,2.4675 2.0125,4.48 4.48,4.48h14l-0.56,3.78c-0.1925,1.19 0.0875,2.415 0.805,3.395c0.7,0.9625 1.785,1.61 2.975,1.785l13.72,2.38l-2.66,11.9c-0.525,2.3975 0.98,4.76 3.36,5.32l148.4,34.02c2.3975,0.525 4.76,-0.98 5.32,-3.36l34.02,-148.26c0.525,-2.3975 -0.98,-4.76 -3.36,-5.32l-21.42,-4.9l3.36,-20.02c0.42,-2.4325 -1.2075,-4.76 -3.64,-5.18l-37.52,-6.44v-25.9c0,-2.4675 -2.0125,-4.48 -4.48,-4.48h-152.32c-0.14,0 -0.28,0 -0.42,0c-0.14,0 -0.28,0 -0.42,0zM8.96,8.96h143.36v143.36h-143.36zM21.56,17.92c-2.135,0.4025 -3.675,2.2925 -3.64,4.48v103.04c0,2.4675 2.0125,4.48 4.48,4.48h116.48c2.4675,0 4.48,-2.0125 4.48,-4.48v-103.04c0,-2.4675 -2.0125,-4.48 -4.48,-4.48h-116.48c-0.14,0 -0.28,0 -0.42,0c-0.14,0 -0.28,0 -0.42,0zM26.88,26.88h107.52v94.08h-8.96c0.0175,-0.2275 0.0175,-0.4725 0,-0.7c-0.4025,-5.6875 -2.8,-10.3775 -6.02,-13.58c-3.22,-3.2025 -7.0175,-5.04 -10.64,-6.58c-3.6225,-1.54 -7.175,-2.835 -9.66,-4.06c-2.2925,-1.1375 -3.325,-2.065 -3.78,-2.94c-0.1575,-1.96 0.0525,-3.78 0.14,-5.88c0.07,-0.105 0.21,-0.175 0.28,-0.28c0.6475,-0.875 1.3475,-1.9425 1.96,-3.08c0.91,-1.7325 1.47,-3.9375 1.96,-6.16c0.6125,-0.455 1.505,-0.3675 1.96,-0.98c1.295,-1.7325 1.8025,-3.955 2.1,-6.58h0.14c0,-0.0525 0,-0.0875 0,-0.14c0,-0.0525 0,-0.0875 0,-0.14c0.3325,-2.5375 -0.3675,-4.6375 -1.54,-6.3c0.9625,-3.465 2.205,-7.9275 1.82,-13.44c-0.2275,-3.3075 -1.0325,-6.79 -3.22,-9.8c-1.96,-2.695 -5.25,-4.4975 -9.1,-5.32c-2.94,-2.555 -6.7025,-3.64 -11.2,-3.64c-0.0525,0 -0.0875,0 -0.14,0c-10.465,0.245 -17.885,4.8125 -21,11.76c-2.8175,6.3 -2.2575,13.5975 -0.56,21.14c-0.9625,1.61 -1.54,3.4475 -1.54,5.6c0,0.14 0,0.28 0,0.42c0.2975,2.94 1.1375,5.3025 2.52,7c0.385,0.4725 1.12,0.455 1.54,0.84c0.4375,2.17 1.0675,4.375 1.96,6.16c0.5775,1.1375 1.6975,1.855 2.38,2.8v6.58c-0.385,0.7875 -1.2425,1.82 -3.5,2.94c-2.45,1.225 -5.8625,2.38 -9.52,3.92c-3.6575,1.54 -7.525,3.3775 -10.78,6.58c-3.255,3.2025 -5.7575,7.875 -6.16,13.58c0,0.0875 0,0.1925 0,0.28h-8.96zM161.28,39.34l31.64,5.6l-24.22,141.26l-141.26,-24.22l0.14,-0.7h128.52l3.22,0.42c2.38,0.3325 4.62,-1.2775 5.04,-3.64l17.5,-101.78c0.1925,-1.19 -0.0875,-2.415 -0.805,-3.395c-0.7,-0.9625 -1.785,-1.61 -2.975,-1.785l-16.8,-2.52zM80.64,40.32c0.0875,0 0.0525,0 0.14,0c3.465,0.07 6.0375,1.8025 5.74,1.4c0.7175,0.9275 1.785,1.5225 2.94,1.68c2.485,0.315 3.3775,1.12 4.2,2.24c0.8225,1.12 1.3825,2.94 1.54,5.18c0.315,4.48 -0.9975,10.2375 -1.82,12.88c-0.6125,1.8725 0.07,3.9025 1.68,5.04c0,0.0875 0,0.1925 0,0.28c-0.14,1.4 -0.455,1.7675 -0.56,1.96c-1.68,0.5425 -2.8875,2.03 -3.08,3.78c-0.14,1.365 -0.875,3.3775 -1.68,4.9c-0.4025,0.77 -0.7875,1.3825 -1.12,1.82c-0.1575,0.2275 -0.35,0.455 -0.42,0.56c-1.0675,0.8575 -1.68,2.135 -1.68,3.5c0,2.7125 -0.525,5.3375 0,9.52c0.0525,0.385 0.14,0.7525 0.28,1.12c1.645,4.0075 5.0925,6.3525 8.4,7.98c3.3075,1.6275 6.7375,2.695 9.94,4.06c3.2025,1.365 6.0725,3.01 7.98,4.9c1.9075,1.89 3.0975,3.9725 3.36,7.7c0,0.0525 0,0.0875 0,0.14h-71.68c0.2975,-3.5175 1.47,-5.565 3.36,-7.42c1.9425,-1.9075 4.8825,-3.395 8.12,-4.76c3.2375,-1.365 6.7725,-2.555 10.08,-4.2c3.3075,-1.645 6.6325,-4.025 8.12,-8.12c0.175,-0.49 0.28,-1.015 0.28,-1.54v-8.96c0.0175,-1.505 -0.7175,-2.9225 -1.96,-3.78c0.07,-0.0875 -0.8575,-0.8575 -1.4,-1.96c-0.735,-1.47 -1.3825,-3.3775 -1.54,-4.9c-0.175,-1.715 -1.3125,-3.185 -2.94,-3.78c-0.0875,-0.1225 -0.385,-0.77 -0.56,-1.68c-0.035,-0.2275 -0.105,-0.1225 -0.14,-0.42h-0.42c1.82,-1.0325 2.695,-3.1675 2.1,-5.18c-1.89,-7.35 -1.995,-13.685 -0.28,-17.5c1.6975,-3.78 4.8125,-6.2125 13.02,-6.44zM161.28,57.54l10.92,1.68l-10.92,63.84zM197.54,70.84l16.66,3.78l-32.06,139.58l-139.58,-32.06l1.68,-8.12l127.54,21.7c2.4325,0.42 4.76,-1.2075 5.18,-3.64l0.56,-3.22c0.9975,-0.63 1.6975,-1.645 1.96,-2.8l22.96,-100.38c0.525,-2.3975 -0.98,-4.76 -3.36,-5.32l-3.08,-0.84z" />
        </g>
      </g>
    </g>
  </LogoSvg>
);

export default LogoImg;
