import RichTextEditor, { RichTextEditorContext, RichTextWrapper } from "@/components/ui/RichTextEditor";
import GroupPosts from "@/service/groups/groupPosts";
import { setModal } from "@/store/alert";
import { css } from "@emotion/react";
import { useFileUpload } from "js-media-package";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import IPosts from "./types";

const Posts = () => {
	return (
		<>
			<section css={Styles.section}>
				<RichTextWrapper>
					<PostForm />
				</RichTextWrapper>
				<PostsContent />
			</section>
		</>
	);
};

const PostForm = () => {
	const dispatch = useDispatch();
	const imageInputRef = useRef<HTMLInputElement>(null);
	const { id: groupId } = useParams();
	const { value, setValue } = useContext(RichTextEditorContext);

	const [imageList, setImageList] = useState<string[]>([]);
	const { sendFile, base64File, fileUrl } = useFileUpload();

	useEffect(() => {
		if (base64File && fileUrl && imageList.length <= 5) {
			setImageList((prevState) => {
				const copyOfPrevState = [...prevState];
				copyOfPrevState.unshift(fileUrl);
				return copyOfPrevState;
			});
		}
	}, [base64File, fileUrl]);

	class Handle {
		static async submit(e: FormEvent) {
			e.preventDefault();
      const valueWithoutHtmlTag = value.replace(/(<([^>]+)>)/gi, "");
      
      if(groupId && valueWithoutHtmlTag.length != 0) {
        try {
          await GroupPosts.create(groupId, {content: value});
          setValue("");
        } catch(err: any) {
          console.log(err);
          dispatch(setModal({ element: <div>{err?.response?.data?.message ?? "Não foi possível criar a postagem, ocorreu um erro inesperado."}</div> }));
        }
      }
		}

		static selectImages() {
			if (imageInputRef.current) {
				imageInputRef.current.click();
			}
		}

		static previewImage(url: string) {
			const PreviewImg = () => (
				<div style={{ textAlign: "center" }}>
					<img src={url} height="300px" />
				</div>
			);
			dispatch(setModal({ element: <PreviewImg /> }));
		}

		static removeImg(index: number) {
			setImageList((prevState) => {
				const copyOfPrevState = [...prevState.filter((_, i) => i !== index)];
				return copyOfPrevState;
			});
		}
	}

	return (
		<div css={Styles.postWrapper}>
			<form onSubmit={Handle.submit}>
				<RichTextEditor />

				<input onChange={sendFile} ref={imageInputRef} type="file" id="images" name="images" accept="image/*" hidden />

				<div className="buttons">
					{imageList.length > 0 ? (
						<div css={Styles.imageList}>
							{imageList.map((image, index) => (
								<li key={index}>
									<div className="removeBtn" onClick={() => Handle.removeImg(index)}>
										<AiOutlineClose size={20} />
									</div>
									<img src={image} alt="imagem" />
								</li>
							))}
						</div>
					) : (
						<div></div>
					)}

					<div className="button-group">
						{imageList.length <= 5 && (
							<button onClick={Handle.selectImages} className="btn ico-btn bg warning" type="button" title="inserir imagens">
								<RiImageAddLine />
							</button>
						)}

						<button type="submit" className="bg info">
							Postar
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const PostsContent = () => {
	const { id: groupId } = useParams();
	const [posts, setPosts] = useState<IPosts | undefined>(undefined);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		Handle.get();
	}, []);

	class Handle {
		static async get() {
			if (typeof groupId != "undefined") {
				try {
					const res = await GroupPosts.index(groupId);
					setPosts(res.data);
				} catch (err: any) {
					console.log(err);
					setMessage(err?.response?.data?.message ?? "Erro ao carregar posts.");
				}
			}
		}
	}

	console.log(posts);

	return (
		<>
			{message && <p>{message}</p>}
			{posts?.data.map((post, index) => (
				<article key={index}>
					<p>{post.content}</p>
				</article>
			))}
		</>
	);
};

class Styles {
	static postWrapper = css`
		padding: 1rem 0;
		padding-bottom: 2rem;
		border-bottom: 1px dotted #575656;

		.buttons {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 50px;
			margin-top: 12px;
			justify-content: space-between;

			.button-group {
				display: flex;
				flex-direction: row;
				box-sizing: border-box;
				height: inherit;

				button {
					padding: 8px 1rem;
					height: inherit;

					&.ico-btn {
						font-size: 24px;
						margin-right: 10px;
						svg {
							position: relative;
							top: 2px;
						}
					}
				}
			}
		}
	`;

	static imageList = css`
		font-weight: bold;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 4px;

		li {
			display: inline;
			list-style: none;
			margin-right: 10px;
			position: relative;

			:hover {
				img {
					opacity: 0.4;
					filter: brightness(150%);
				}
			}

			.removeBtn {
				display: inline-flex;
				position: absolute;
				right: 0;
				z-index: 2;
				cursor: pointer;
				width: 100%;
				height: 90%;
				background: transparent;
				color: transparent;
				font-weight: bold;

				& > svg {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					text-shadow: 1px 0px 0px #fff;
				}

				&:hover {
					color: #f9f9f9;
				}
			}

			img {
				border-radius: 5px;
				object-fit: cover;
				cursor: pointer;
				width: 58px;
				height: 58px;
				transition: filter 0.2s, opacity 0.2s;
			}
		}

		@media screen and (max-width: 800px) {
			li {
				img {
					zoom: 0.6;
				}
			}
		}

		@media screen and (max-width: 1000px) {
			li {
				.removeBtn {
					color: #fff;
				}
				img {
					opacity: 0.4;
					filter: brightness(150%);
				}
			}
		}
	`;

	static section = css`
		font-size: 15px;
		line-height: 1.6em;
		word-spacing: 3px;
		text-align: justify;

		article {
			margin: 0;

			&:not(:last-child) {
				margin-bottom: 8rem;
			}

			p {
				margin: 0;
				color: #b9b9b9;
				font-weight: 600;
				background: #363535;
				padding: 2rem 1rem;
			}
		}
	`;
}

export default Posts;
