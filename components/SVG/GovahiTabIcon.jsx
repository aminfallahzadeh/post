// IMPORTS
import Svg, { Path } from "react-native-svg";

const GovahiTabIcon = ({ color }) => (
  <Svg
    id="پست_یافته"
    data-name="پست یافته"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 42 42"
  >
    <Path
      id="Rounded_Rectangle_1"
      data-name="Rounded Rectangle 1"
      class="cls-5"
      d="M17.557,2.1c8.392,0.412,18.613,1.142,18.613,1.142a2.093,2.093,0,0,1,1.936,2.069v32.84a1.942,1.942,0,0,1-1.936,1.95H7.071a2.1,2.1,0,0,1-2.143-2.058L4.592,6.588C12.794,15.3,22.654,2.345,17.557,2.1Z"
      fill="none"
      stroke={color}
      strokeWidth={2}
    />

    <Path
      id="Ellipse_33_copy"
      data-name="Ellipse 33 copy"
      class="cls-7"
      d="M33.94,6.176C36.452,3.26,21.3,29.984,18.451,30.882c-2.578.815-7.3-5.808-9.375-9.059-1.5-2.353,5.365,5,7.745,3.706C19.924,23.846,30.113,10.621,33.94,6.176Z"
      fill={color}
    />
  </Svg>
);

export default GovahiTabIcon;
