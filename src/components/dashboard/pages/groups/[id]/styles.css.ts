import { css } from "@emotion/react";

class Styles {

  static cover = css`
    width: 100%;
    background: #3F51B5;
    overflow: hidden;
    height: 200px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-sizing: border-box;
    position:relative;

    .title {
      flex-grow: 1;
      font-size: 28px;
      padding: 2rem 3rem;

      span {
        background: #00000059;
        padding: 8px 2rem;
        line-height: 3rem;
      }
      
      .description {
        font-size: 18px;
      }

      .config {
        > svg {
          color: #ccc;
          opacity: .3;
          transition: opacity .2s;
          cursor: pointer;
          position: absolute;
          right: 1.4rem;
          top: 1.4rem;
  
          &:hover {
            opacity: 1;
          }
        }
      }
    }

    .links {
      align-self: flex-end;
      padding: 1rem;
      padding-bottom: 8px;
      position: absolute;
      right: 0;
      bottom: 0;

      li {
        list-style: none;
        display: inline-flex;

        &:not(:last-child) {
          margin-right: 8px;
        }

        a {
          background: #00000059;
          padding: 8px 2rem;
          color: #fff;

          &:hover {
            text-decoration: none;
            filter: #00000020;
          }
        }

      }
    }
  `;
  
}

export {Styles};