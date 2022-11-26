import { RootState } from "@/store/storeConfig";
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import toggleMenu from "./store";

interface Props extends PropsWithChildren {
  id: string;
  header: React.ReactNode;
}

interface IMenuProps {
  disabled: boolean;
}

interface CompleteProps extends Props, IMenuProps{}

const ToggleMenu = (props: Props) => {
  const dispatch = useDispatch();
  const {id, children, header, disabled} = props as CompleteProps;
  
  useEffect(() => {
    return () => {
      dispatch(toggleMenu.actions.resetMenu());
    }
  }, []);

  return(
    <div css={Style.container} onClick={() => dispatch(toggleMenu.actions.setMenu(id))}>
      <div style={{display: 'flex', flexDirection: 'row'}} className="titleMenu">
        {header}
      </div>
      <div onClick={e => e.stopPropagation()} style={{display: disabled ? 'none' : 'block' }}>
          {children}
      </div>
    </div>
  );
};

function mapStateToProps(state: RootState, ownProps: Props) {
  return {
    disabled: !state.toggleMenu.find(m => m == ownProps.id)
  }
}

class Style {
  static container = css`
    .titleMenu {
      cursor: pointer;
      user-select: none;
      background-color: #222222;
      padding: 1rem;
      transition: background-color .3s;
      
      &:hover {
        background-color: #444444;
      }
    }
  `;
}

export default connect(mapStateToProps)(ToggleMenu);