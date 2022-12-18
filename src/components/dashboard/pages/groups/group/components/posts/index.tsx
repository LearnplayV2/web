import RichTextEditor, { RichTextEditorContext, RichTextWrapper } from "@/components/ui/RichTextEditor";
import GroupPosts from "@/service/groups/groupPosts";
import { setModal } from "@/store/alert";
import { css } from "@emotion/react";
import { useFileUpload } from "js-media-package";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

interface Posts {}

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
	const { value, setValue } = useContext(RichTextEditorContext);

  const [imageList, setImageList] = useState<string[]>([]);
  const { sendFile, base64File, fileUrl } = useFileUpload();

  useEffect(() => {
    if(base64File && fileUrl && imageList.length <= 5) {
      setImageList(prevState => {
        const copyOfPrevState = [...prevState];
        copyOfPrevState.unshift(fileUrl);
        return copyOfPrevState;
      });
    }
  }, [base64File, fileUrl]);

	class Handle {
		static async submit(e: FormEvent) {
			e.preventDefault();
      console.log(value)
		}

    static selectImages() {
      if(imageInputRef.current) {
        imageInputRef.current.click();
      }
    }

    static previewImage(url: string) {
      const PreviewImg = () => (
        <div style={{textAlign: 'center'}}>
          <img src={url} height="300px" />
        </div>
      )
      dispatch(setModal({element: <PreviewImg />}));
    }

    static removeLastImg() {
      setImageList(prevState => {
        const copyOfPrevState = [...prevState];
        copyOfPrevState.pop();
        return copyOfPrevState;
      });
    }
	}

	return (
		<div css={Styles.postWrapper}>
			<form onSubmit={Handle.submit}>
				<RichTextEditor />

        <input onChange={sendFile} ref={imageInputRef} type="file" id="images" name="images" accept="image/*" hidden/>

        <div className="buttons">
            {imageList.length > 0 ? (
              <div className="imageList">
                {imageList.length} {imageList.length == 1 ? 'imagem anexada' : 'imagens anexadas'}:
                &nbsp;
                {imageList.map((image, index) => (
                  <li key={index}>
                    <img title="visualizar imagem" onClick={() => Handle.previewImage(image)} src={image} alt="imagem" />
                  </li>
                ))}
              </div>
            ): <div></div>}
          
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
	const [posts, setPosts] = useState<Posts[]>([]);
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

	return (
		<>
			{message && <p>{message}</p>}
			{posts.map((post, index) => (
				<article key={index}>
					<p>{index}</p>
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

    .imageList {
      font-weight: bold;
      display: flex;
      flex-direction: row;
      align-items: center;
      
      li {
        display: inline;
        list-style: none;
        margin-right: 10px;
        
        img {
          border-radius: 5px;
          object-fit: cover;
          cursor: pointer;
          width: 58px;
          height: 58px;
        }
      }
    }

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
          height: inherit;
          &.ico-btn {
            font-size: 24px;
            margin-right: 10px;
            svg {
              position: relative;
              top: -4px;
            }
        }

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
