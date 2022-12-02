import { css } from "@emotion/react";
import { CSSProperties } from "@emotion/serialize";
import { PropsWithChildren } from "react";

interface Props {
	style?: any;
	width: string;
	height: string;
  darkMode?: boolean;
}

const Skeleton = (props: Props) => {
	const { darkMode, style, height, width } = props;

  class Styles {
    static skeleton = css`
      ${darkMode 
        ? 'background: #ffffff12;'
        : 'background: #3a373712;'
      }
      animation: shine 1s ease-in-out forwards infinite;
      animation-direction: alternate;
  
      @keyframes shine {
        0% {
          opacity: .3;
          transform: translateY(3px) scale(0.98);
        }
        85%, 100% {
          opacity: 1;
          transform: translateY(0px) scale(1);
        }
      }
    `;
  }

	return <div className="skeleton" css={Styles.skeleton} style={{ ...style, width, height }}></div>;
};


export { Skeleton };
