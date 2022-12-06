import { css } from "@emotion/react";

class Styles {
	static notMember = css`
		margin-top: 10px;
		text-align: right;
	`;

	static cover = css`
		width: 100%;
		background-color: #383838;
		overflow: hidden;
		height: 200px;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		box-sizing: border-box;
		position: relative;

		.title {
			flex-grow: 1;
			word-wrap: break-word;
			font-size: 28px;
			font-weight: bold;
			padding: 2rem 0;
			color: #c1c1c1;

			span {
				padding: 8px 2rem;
				line-height: 3rem;
			}

			.description {
				font-size: 18px;
			}

			.config {
				z-index: 1;
				> svg {
					color: #ccc;
					opacity: 0.3;
					transition: opacity 0.2s;
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
			padding-bottom: .6rem;
			overflow-x: auto;
			width: -webkit-fill-available;

			::-webkit-scrollbar {
				height: 8px;
			}

			::-webkit-scrollbar-thumb {
				background: #00000030;
        border-radius:1rem;
			}

			li {
				list-style: none;
				display: inline;

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

export { Styles };
