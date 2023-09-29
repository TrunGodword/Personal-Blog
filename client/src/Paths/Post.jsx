import { formatISO9075 } from 'date-fns'
import React from 'react'

const Post = ({title, summary, cover, content,createdAt}) => {
  return (
    <div className='Post'>
        <img src= {"http://localhost:5656/"+cover}></img>
        <div className='Postcard'>
            <h2>{title}</h2>
            <time>{formatISO9075(new Date(createdAt))}</time>
            <p>{summary}</p>
        </div>
    </div>
  )
}

export default Post