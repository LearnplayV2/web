import { css } from "@emotion/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { createSearchParams, useNavigate } from "react-router-dom";

interface IPaginationProps {
	left: IDirection;
	right: IDirection;
	totalPages?: number;
	active?: string;
	path: string;
	params?: object;
}

interface IDirection {
	disabled: boolean;
	callback: any;
}

const Pagination = (props: IPaginationProps) => {
	const { totalPages, left, right, active, path: pathname, params } = props;
	const navigate = useNavigate();

	class Handle {
		static navigate(disabled: boolean, callback: any) {
			if (!disabled) callback();
		}

		static page(i: any) {
			i = parseInt(i);
			return i + 1 == 0 ? i + 2 : i + 1;
		}
	}

	return (typeof totalPages != 'undefined' && totalPages > 1) && (
		<div css={Styles.pagination()}>
			<div>
				<div
					style={{
						opacity: left.disabled ? ".4" : "1",
						cursor: left.disabled ? "not-allowed" : "pointer",
					}}
					onClick={() => Handle.navigate(left.disabled, () => left.callback())}
					className="btn"
				>
					<MdKeyboardArrowLeft size={18} />
				</div>
				{Array(totalPages)
					.fill(0)
					.map((_, i) => (
						<div key={i}>
							<div onClick={() => {
									if(!(parseInt(active ?? "1") == i + 1)) {
										navigate({pathname, search: createSearchParams({...params, page: Handle.page(i)}).toString() })
									}
								}} className={`btn ${parseInt(active ?? "1") == i + 1 && "active"}`}>
								{i + 1}
							</div>
						</div>
					))}
				<div
					style={{
						opacity: right.disabled ? ".4" : "1",
						cursor: right.disabled ? "not-allowed" : "pointer",
					}}
					onClick={() => Handle.navigate(right.disabled, () => right.callback())}
					className="btn"
				>
					<MdKeyboardArrowRight size={18} />
				</div>
			</div>
		</div>
	);
};

class Styles {
	static pagination = () => css`
		margin: 2rem 0;

		div {
			display: flex;
		}

		.btn {
			padding: 0 0.5rem;
			cursor: pointer;
			user-select: none;
			padding: 0.5rem 1rem;
			background: #393b4c;
			color: #fff;
			box-shadow: 0px 0px 5px #121212;
			filter: brightness(90%);

			&:hover {
				text-decoration: none;
				filter: brightness(100%);
			}

			&.active {
				cursor: not-allowed;
				opacity: .4;
			}
		}
	`;
}

export { Pagination };
