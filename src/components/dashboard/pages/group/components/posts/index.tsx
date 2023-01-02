import Attachments from '@/class/attachments';
import { FetchStatus } from '@/class/fetchStatus';
import member_type from '@/class/participation';
import Resume from '@/components/ui/resume';
import RichTextEditor, { RichTextEditorContext, RichTextWrapper } from '@/components/ui/RichTextEditor';
import GroupAttachments from '@/service/groups/groupAttachments';
import GroupPosts from '@/service/groups/groupPosts';
import { UserService } from '@/service/user';
import { setModal } from '@/store/alert';
import store, { RootState } from '@/store/storeConfig';
import Time from '@/utils/timeHandle';
import { css } from '@emotion/react';
import moment from 'moment';
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiImageAddLine, RiMedal2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Data from '../../data';
import Gallery from './gallery';
import groupPostsStore from './store';
import GroupStyles from './styles.css';
import { Pagination as Paginate } from '@/components/ui/pagination';

const Posts = () => {
    return (
        <>
            <section css={Styles.section}>
                <RichTextWrapper>
                    <PostForm />
                </RichTextWrapper>
                <PostsContent />
                <Pagination />
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
    const valueWithoutHtmlTag = value.replace(/(<([^>]+)>)/gi, '');

    const { groupPosts } = useSelector((state: RootState) => state);

    const [imageList, setImageList] = useState<IimageUpload[]>([]);
    const [ableToPost, setAbleToPost] = useState<boolean>(false);

    useEffect(() => {
        if (groupPosts.status == FetchStatus.LOADING || valueWithoutHtmlTag.length == 0) {
            setAbleToPost(false);
        } else {
            setAbleToPost(true);
        }
    }, [groupPosts.status, value]);

    useEffect(() => {
        // define img list
        if (attachmentsInputRef.current && attachmentsInputRef.current.files) {
            if (attachmentsInputRef.current.files.length > 0) {
                const fileListArr = Array.from(attachmentsInputRef.current.files);
                let fileUrls: IimageUpload[] = [];
                fileListArr.forEach((file) => {
                    const url = URL.createObjectURL(file);
                    fileUrls.unshift({ url, error: false });
                });
                setImageList(fileUrls);
            }
        }
    }, [attachmentsInputRef.current?.files]);

    class Handle {
        static async submit(e: FormEvent) {
            e.preventDefault();

            const imagesData = new FormData(e.target as HTMLFormElement);
            const fileInput = (e.target as HTMLFormElement).querySelector('input[name=attachments]') as HTMLInputElement;
            const hasAttachments = fileInput.files && fileInput.files.length > 0;

            if (groupId && valueWithoutHtmlTag.length != 0) {
                try {
                    dispatch(groupPostsStore.actions.setStatus(FetchStatus.LOADING));
                    // create post and send files
                    const post = await GroupPosts.create(groupId, { content: value });
                    if (hasAttachments) {
                        imagesData.append('postId', post.data.id);
                        // insert images only
                        imagesData.append('filesType', Attachments.fileType.image);
                        await GroupAttachments.create(groupId, imagesData);
                    }
                    const posts = await GroupPosts.index(groupId);
                    dispatch(groupPostsStore.actions.setPosts(posts.data));
                    dispatch(groupPostsStore.actions.setStatus(FetchStatus.SUCCESS));

                    // clear inputs
                    Handle.resetForm(e.target as HTMLFormElement);
                } catch (err: any) {
                    dispatch(groupPostsStore.actions.setStatus(FetchStatus.ERROR));
                    dispatch(
                        setModal({
                            element: <div>{err?.response?.data?.message ?? 'Não foi possível criar a postagem, ocorreu um erro inesperado.'}</div>,
                        }),
                    );
                }
            }
        }

        static resetForm(target: HTMLFormElement) {
            target.reset();
            Handle.removeAllImgs();
            setValue('');
        }

        static selectImages() {
            if (attachmentsInputRef.current) {
                attachmentsInputRef.current.click();
            }
        }

        static addImg(e: ChangeEvent<HTMLInputElement>) {
            let files = e.target.files;
            if (files) {
                const fileListArr = Array.from(files);
                for (let file of files) {
                    const index = fileListArr.indexOf(file);
                    // file limit
                    if (index <= 5) {
                        const url = URL.createObjectURL(file);
                        setImageList((prevState) => {
                            const copyOfPrevState = [...prevState];
                            if (url) {
                                copyOfPrevState.unshift({ url: url.toString(), error: false });
                            }
                            return copyOfPrevState;
                        });
                    } else {
                        Handle.removeImg(index);
                        dispatch(setModal({ element: <>O limite de anexos são 6 itens, o restante foi removido.</> }));
                    }
                }
            }
        }

        static removeImg(index: number) {
            console.log('remove file');
            if (attachmentsInputRef.current) {
                const fileInput = attachmentsInputRef.current;
                if (fileInput.files) {
                    // remove from file input
                    let fileListArr = Array.from(fileInput.files);
                    const imgIndex = fileListArr.length - 1 - index;
                    const dt = new DataTransfer();
                    // remove from limit
                    if (typeof fileListArr[imgIndex] != 'undefined') {
                        fileListArr.splice(imgIndex, 1);
                    }
                    fileListArr.filter((arr, i) => {
                        if (i <= 5) {
                            dt.items.add(arr);
                        }
                    });
                    fileInput.files = dt.files;
                    setImageList((prevState) => {
                        const copyOfPrevState = [...prevState.filter((_, i) => i !== index)];
                        return copyOfPrevState;
                    });
                }
            }
        }

        static removeAllImgs() {
            setImageList([]);
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
                                <li key={index} id={index.toString()}>
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

                        <button
                            title={!ableToPost ? 'Você precisa primeiro digitar um texto para criar uma publicação' : ''}
                            type="submit"
                            className="bg info"
                            disabled={!ableToPost}>
                            Criar publicação
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

    class Handle {
        static previewImage(url: string) {
            const PreviewImg = () => (
                <div style={{ textAlign: 'center' }}>
                    <img src={url} height="300px" />
                </div>
            );
            dispatch(setModal({ element: <PreviewImg /> }));
        }
    }

    console.log(posts);

    return (
        <>
            {posts.message && <p>{posts.message}</p>}
            {posts?.item && posts?.item?.data.map((post, index) => (
                <article key={index} className={`${index == posts.item!.data.length - 1 ? 'last' : ''}`}>
                    <div className="body">
                        <div className="group__post-content" css={GroupStyles.content}>
                            <div className="group__post-details">
                                <div className="author">
                                    <div className="picture">
                                        <img src={UserService.showProfile(post.member.user.uuid)} />
                                    </div>
                                    <div className="name">
                                        <a
                                            href="#"
                                            css={css`
                                                ${post.member.type == member_type.STAFF &&
                                                `
                                                color: #ffd400!important;
                                            `}
                                            `}>
                                            {post.member.user.name}
                                            {post.member.type == member_type.STAFF && (
                                                <>
                                                    &nbsp;
                                                    <span
                                                        title={'Este usuário é administrador do grupo'}
                                                        style={{ position: 'relative', top: '3px' }}>
                                                        <RiMedal2Fill />
                                                    </span>
                                                </>
                                            )}
                                        </a>
                                        <span title={moment(post.updatedAt).format('DD/MM/YYYY, h:mm:ss a')}>
                                            {Time.timeAgo(post.updatedAt).concat(' atrás')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ clear: 'both' }}></div>
                            <Resume text={post.content} />
                        </div>
                        {post.attachments.length > 0 && (
                            <>
                                <hr style={{ border: 'none', height: '1px', background: '#5c5c5c' }} />
                                <Gallery>
                                    {post.attachments.map((attachment, aindex) => {
                                        const url = Attachments.url(attachment.fileName, Attachments.paths.groupPosts);
                                        return (
                                            <img
                                                title="Clique para expandir"
                                                id={`img_${aindex}`}
                                                key={aindex}
                                                src={url}
                                                onClick={() => Handle.previewImage(url)}
                                            />
                                        );
                                    })}
                                </Gallery>
                            </>
                        )}
                    </div>
                </article>
            ))}
        </>
    );
};

const Pagination = () => {
    const navigate = useNavigate();
    const { item: posts } = useSelector((state: RootState) => state).groupPosts;
    const { dispatch } = store;

    return (
        <>
            <div css={GroupStyles.pagination}>
                {posts && posts.totalPages > 1 && (
                    <>
                        {Array(posts.totalPages).fill(0).map((_, page) => <li key={page}>{page + 1}</li>)}
                    </>
                )}
            </div>
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

            &:not(&.last) {
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