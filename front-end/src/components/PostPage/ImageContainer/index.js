// front-end/src/components/PostPage/ImageContainer/index.js

import './imagecontainer.css';

function ImageContainer({post}) {

    return (
        <div className='image-container'>
            <div className='primary-image'>
                <img src={post.Images[0].imageUrl} alt='primary'></img>
            </div>
            <div className='secondary-images'>
                {post.Images.map((image, index) => (
                    <img key={image.id} src={image.imageUrl} alt='secondary'></img>
                ))}
            </div>
        </div>

    )
}

export default ImageContainer;
