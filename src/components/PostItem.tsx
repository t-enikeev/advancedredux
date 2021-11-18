import React, {createRef, FC, useRef, useState} from 'react';
import {IPost} from "../models/IPost";

interface PostItemProps {
    post: IPost,
    remove: (post: IPost) => void,
    update: (post: IPost) => void,
}

export const PostItem: FC<PostItemProps> = ({post,remove, update}) => {
    const [isEdit, setEdit] = useState(false)
    const [title, setTitle] = useState(post.title)


    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        remove(post)
    }
    const handleUpdate = (e: React.MouseEvent) => {
        e.stopPropagation()
        if(isEdit) {
            // @ts-ignore
            update({...post, title: title})
            setEdit(!isEdit)
        } else {
            setEdit(true)
        }

    }

    return (
        <div onClick={handleUpdate} className={'post'} style={{margin: '5px',padding: '5px', border: '1px solid green'}}>
            <span style={{float:'left'}}>{post.id}.</span>
            {    // @ts-ignore
                !isEdit ? post.title : <input onChange={(e) => setTitle(e.target.value)} value={title}/>}
            <button onClick={handleRemove} style={{float: 'right'}}>x</button>
        </div>
    );
};

export default PostItem;
