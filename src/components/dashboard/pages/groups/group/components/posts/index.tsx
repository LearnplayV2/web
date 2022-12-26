import Attachments from '@/class/attachments';
import RichTextEditor, { RichTextEditorContext, RichTextWrapper } from '@/components/ui/RichTextEditor';
import { useTimeout } from '@/hooks/useTimeout';
import GroupAttachments from '@/service/groups/groupAttachments';
import GroupPosts from '@/service/groups/groupPosts';
import { setModal } from '@/store/alert';
import store, { RootState } from '@/store/storeConfig';
import Media from '@/utils/media';
import { css } from '@emotion/react';
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiImageAddLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Data from '../../data';
import groupPostsStore from './store';

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

interface IimageUpload {
    url: string;
    error: boolean;
}

const PostForm = () => {
    const dispatch = useDispatch();
    const attachmentsInputRef = useRef<HTMLInputElement>(null);
    const { id: groupId } = useParams();
    const { value, setValue } = useContext(RichTextEditorContext);

    const [imageList, setImageList] = useState<IimageUpload[]>([]);
    class Handle {
        static async submit(e: FormEvent) {
            e.preventDefault();
            const valueWithoutHtmlTag = value.replace(/(<([^>]+)>)/gi, '');

            const imagesData = new FormData(e.target as HTMLFormElement);
            const fileInput = (e.target as HTMLFormElement).querySelector('input[name=attachments]') as HTMLInputElement;
            const hasAttachments = fileInput.files && fileInput.files.length > 0;

            if (groupId && valueWithoutHtmlTag.length != 0) {
                try {
                    // create post and send files
                    const post = await GroupPosts.create(groupId, { content: value });
                    if (hasAttachments) {
                        imagesData.append('postId', post.data.id);
                        // insert images only
                        imagesData.append('filesType', Attachments.fileType.image);
                        await GroupAttachments.create(groupId, imagesData);
                    }
					dispatch(groupPostsStore.actions.addPost(post.data));
					console.log('novo post', post)
                    setValue('');
                } catch (err: any) {
                    console.log(err);
                    dispatch(
                        setModal({
                            element: <div>{err?.response?.data?.message ?? 'Não foi possível criar a postagem, ocorreu um erro inesperado.'}</div>,
                        }),
                    );
                }
            }
        }

        static selectImages() {
            if (attachmentsInputRef.current) {
                attachmentsInputRef.current.click();
            }
        }

        static previewImage(url: string) {
            const PreviewImg = () => (
                <div style={{ textAlign: 'center' }}>
                    <img src={url} height="300px" />
                </div>
            );
            dispatch(setModal({ element: <PreviewImg /> }));
        }

        static async addImg(e: ChangeEvent<HTMLInputElement>) {
            const files = e.target.files;
            if (files) {
                for (let file of files) {
                    const url = await Media.toBase64(file);
                    setImageList((prevState) => {
                        const copyOfPrevState = [...prevState];
                        if (url) {
                            copyOfPrevState.unshift({ url: url.toString(), error: false });
                        }
                        return copyOfPrevState;
                    });
                }
            }
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

                <input
                    onChange={Handle.addImg}
                    ref={attachmentsInputRef}
                    type="file"
                    id="attachments"
                    name="attachments"
                    accept="image/*"
                    multiple
                    hidden
                />

                <div className="buttons">
                    {imageList.length > 0 ? (
                        <div css={Styles.imageList}>
                            {imageList.map((image, index) => (
                                <li key={index}>
                                    <div className="removeBtn" onClick={() => Handle.removeImg(index)}>
                                        <AiOutlineClose size={20} />
                                    </div>
                                    <img src={image.url} alt="imagem" />
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
    const posts = useSelector((state: RootState) => state).groupPosts;
    const { dispatch } = store;
    const { id: groupId } = useParams();

    useEffect(() => {
        if (groupId) {
            dispatch(Data.getPosts(groupId));
        }
    }, []);

    return (
        <>
            {posts.message && <p>{posts.message}</p>}
            {posts?.item?.data.map((post, index) => (
                <article key={index}>
                    <div className="body">
                        <p>{post.content}</p>
                        <hr />
                        to do: attachments <br />
                        {post.attachments.map((attachment) => {
                            const url = Attachments.url(attachment.fileName, Attachments.paths.groupPosts);

                            switch (attachment.fileType) {
                                case Attachments.fileType.image:
                                    return <img src={url} />;
                                default:
                                    return null;
                            }
                        })}
                    </div>
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

            .body {
                color: #b9b9b9;
                padding: 2rem 1rem;
                background: #363535;
            }

            p {
                margin: 0;
                font-weight: 600;
            }
        }
    `;
}

export default Posts;
