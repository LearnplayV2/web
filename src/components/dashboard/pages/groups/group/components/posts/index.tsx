import RichTextEditor, { RichTextEditorContext } from "@/components/ui/RichTextEditor";
import GroupPosts from "@/service/groups/groupPosts";
import { css } from "@emotion/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Posts {

}

const Posts = () => {
  const {value: richTextValue} = useContext(RichTextEditorContext);
  const {id: groupId} = useParams();

  
  class Handle {
    static async submit(e: FormEvent) {
      e.preventDefault();
      console.log('richTextValue', richTextValue)
    }
  }

  return(
    <>
      <section css={Styles.section}>
        <div css={Styles.postWrapper}>
          <form onSubmit={Handle.submit}>
            <RichTextEditor />
            <br />
            <button type="submit" className="bg warning">Enviar</button>
            <div style={{clear: 'both'}}></div>
          </form>
        </div>
        <PostsContent />
      </section>
    </>
  );
}

const PostsContent = () => {
  const {id: groupId} = useParams();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    Handle.get();
  }, []);

  class Handle {
    static async get() {
      if(typeof groupId != 'undefined') {
        try {
          const res = await GroupPosts.index(groupId);
          setPosts(res.data);
  
        } catch(err: any) {
          console.log(err)
          setMessage(err?.response?.data?.message ?? 'Erro ao carregar posts.');
        }
      }
    }
  }

  return (
    <>
      {message && <p>{message}</p>}
        {posts.map((post, index) => (
          <article key={index}>
            <p>
              {index}
            </p>
          </article>
        ))}
    </>
  );
};

class Styles {
  static postWrapper = css`
    background:#787878;
    padding:1rem;

    button {
      float: right;
    }
  `;

  static section = css`
    font-size: 15px;
    line-height: 1.6em;
    word-spacing: 3px;
    text-align: justify;

    article  {
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