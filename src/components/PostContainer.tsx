import React, {SyntheticEvent, useEffect, useState} from 'react';
import {postAPI} from "../services/PostService";
import { PostItem } from './PostItem';
import {IPost} from "../models/IPost";



const PostContainer = () => {
    const [limit, setLimit] = useState(110)
    const [postData, setPostData] = useState('')
    const {data: posts, isLoading, error, refetch } = postAPI.useFetchAllPostsQuery(limit)

    const [createPost, {}] = postAPI.useCreatePostMutation()

    const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await createPost({title: postData, body: postData} as IPost)
        console.log('Отправлено')
    }



    // useEffect(() => {
    //     setTimeout(() => {
    //         setLimit(3)
    //     }, 2000)
    // }, [])

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }
    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div className='post__list'>
            <form>
                <input name='body' onChange={(e) => setPostData(e.target.value)} type="text"/>
                <button type='submit' onClick={handleSubmit}>Добавить</button>
            </form>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Произошел конфуз: {error}</h1>}
            {posts && posts.map( post =>
                <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post}/>
            )}
        </div>
    );
};

export default PostContainer;
