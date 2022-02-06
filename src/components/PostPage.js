import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from '../api/posts';
import { useNavigate } from "react-router-dom";

const PostPage = () => {

    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() ===  id);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
		try {
			await api.delete(`/posts/${id}`);
			const postlist = posts.filter(post => post.id !== id);
			setPosts(postlist);
			navigate('/');
		} catch (err) {
			console.log(`Error: ${err.message}`);
		};
	};

    return(
        <main className="PostPage">
            <article className="post">
                { post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${id}`}>
                            <button className="editButton">Edit</button>
                        </Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                { !post &&
                    <>
                        <h2>Post not found!</h2>
                        <p>Well, that's disappointing...</p>
                        <p>
                            <Link to="/">Visit our homepage!</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
};

export default PostPage;