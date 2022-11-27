import { RootState } from "@/store/storeConfig";
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import toggleMenu from "./store";

interface Props extends PropsWithChildren {
  id: string;
  header: React.ReactNode;
  firstActive?: boolean;
}

interface IMenuProps {
  active: boolean;
}

interface CompleteProps extends Props, IMenuProps{}

const ToggleMenu = (props: Props) => {
  const dispatch = useDispatch();
  const {id, children, header, active, firstActive} = props as CompleteProps;

  useEffect(() => {
    // set first active
    if(firstActive) dispatch(toggleMenu.actions.setMenu({id, active: true}));
    
    return () => {
      dispatch(toggleMenu.actions.resetMenu());
    }
  }, []);

  return(
    <div css={Style.container} onClick={() => dispatch(toggleMenu.actions.setMenu({id, active: !active}))}>
      <div style={{background: !active ? '#000' : '#3F51B5' }} className="titleMenu">
        {header}
      </div>
      <div onClick={e => e.stopPropagation()} style={{display: !active ? 'none' : 'block' }}>
          {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: Props) => {
  return {
    active: state.toggleMenu.find((m, i) => m.id == ownProps.id )?.active ?? false,
  }
};

class Style {
  static container = css`
    .titleMenu {
      cursor: pointer;
      user-select: none;
      background-color: #222222;
      padding: 1rem;
      display: flex;
      flex-direction: row;
    }
  `;
}

export default connect(mapStateToProps)(ToggleMenu);