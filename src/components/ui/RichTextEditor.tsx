import { setModal } from "@/store/alert";
import Media from "@/utils/media";
import { css } from "@emotion/react";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";

interface RichTextEditorCtx {
	value: string;
	setValue: Dispatch<SetStateAction<any>>;
}

const RichTextEditorContext = createContext<RichTextEditorCtx>({value: '', setValue: () => {}});

const RichTextWrapper = (props: PropsWithChildren) => {
	const { children } = props;
	const [value, setValue] = useState("");

	return <RichTextEditorContext.Provider value={{ value, setValue }}>{children}</RichTextEditorContext.Provider>;
};

const RichTextEditor = () => {
	const context = useContext(RichTextEditorContext);
	const dispatch = useDispatch();
	const quillRef = useRef<any>();

	class Handle {
		static imageHandler = async (e: any) => {
			const editor = quillRef.current.getEditor();
			console.log(editor);
			const input = document.createElement("input");
			input.setAttribute("type", "file");
			input.setAttribute("accept", "image/*");
			input.click();

			input.onchange = async () => {
        console.log('changed')
				if (input.files == null) return;
				const file = input.files[0];
				if (/^image\//.test(file.type)) {
					console.log(file);
					const formData = new FormData();
					formData.append("image", file);

					console.log("formData", formData);

					// const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
					// const url = res?.data?.url;

					const tempMedia = await Media.toBase64(file);
					editor.insertEmbed(editor.getSelection(), "image", tempMedia);
				} else {
					dispatch(setModal({ element: "Não foi possível enviar a imagem" }));
				}
			};
		};

		static modules = useMemo(
			() => ({
				toolbar: {
					container: [
						["bold", "italic", "underline", "strike"],
						[{ list: "ordered" }, { list: "bullet" }],
            ["link"]
						// ["image", "link"],
						// [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
					],
					handlers: {
						// image: this.imageHandler,
					},
				},
			}),
			[]
		);
	}

	return (
		<>
			<ReactQuill
				css={Styles.quill}
				ref={quillRef}
				theme="snow"
				value={context?.value}
				onChange={context?.setValue}
				modules={Handle.modules}
				placeholder="Digite sua postagem..."
			/>
		</>
	);
};

class Styles {
	static quill = css`
		* {
			border:none!important;
		}

		border-radius: 8px;
		background-color: #f9f9f9;
		color: #000;

		img {
			max-width: 25% !important;
		}

		.ql-editor {
			overflow-y: auto;
			padding-bottom: 30px;
			max-height: 30vh;
		}

		.ql-toolbar {
			background: #ebebeb!important
		}

		button {
			&:hover {
				background: #d6d9e5!important;
				filter: none;
			}
		}

		.ql-tooltip {
			left: 0 !important;

			&::before {
				content: "http://.." !important;
			}
		}
	`;
}

export { RichTextEditorContext, RichTextWrapper };
export default RichTextEditor;
