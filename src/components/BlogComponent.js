import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { postComment } from '../redux/ActionCreators';

function RenderBlogItem({post}) {
    return (
        <Card>
            <Link to={`/blog/${post.id}`}>
                <CardImg width="100%" src={baseUrl + post.image} alt={post.name} />
                <CardImgOverlay>
                    <CardTitle>{post.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

function Blog(props) {
    // creates blog posts in reverse order
    const blog = props.posts.posts.slice(0).reverse().map(post => {
        return (
            <div key={post.id} className="col-md-5 m-1">
                <RenderBlogItem post={post} />
            </div>
        );
    });

    if (props.posts.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.posts.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.posts.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    } 
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Blog</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Blog</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {blog}
            </div>
        </div>
    );
}

export default Blog;