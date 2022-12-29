import { PropsWithChildren } from "react";
import Styles from "./styles.css";

function Gallery(props: PropsWithChildren) {
    
    return(
        <div className="group__posts-gallery" css={Styles.index}>
            {props.children}
        </div>
    );
}

export default Gallery;