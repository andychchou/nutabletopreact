import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Label,} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
        this.props.postComment(this.props.postId, values.author, values.text);
    }

    render() {
        return(
            <React.Fragment>
                <span className="navbar-text ml-auto">
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil fa-lg" /> Submit Comment
                    </Button>
                </span>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="author" >Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text" >Comment</Label>
                                <Control.textarea model=".text" id="text" name="text"
                                    rows="6"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".text"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                    }}
                                />
                            </div>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderPost({post}) {
    return (
        <div className="col m-1">
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
                <Card>
                    <CardImg top src={baseUrl + post.image} alt={post.name} />
                    <CardBody>
                        <CardText>{post.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

function RenderComments({comments, postComment, postId}) {
    if(comments) {
        return (
            <div className="col-md-10 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}<br/>
                                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
                <CommentForm postId={postId} postComment={postComment} />
            </div>
        )
    }

    return (
        <div></div>
    )
}

function PostInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if(props.post) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/blog">Blog</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.post.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.post.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 order-md-2">
                        <p><em>-- Posted by {props.post.author} on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(props.post.date)))} </em></p>
                        {props.post.text.map(e => {
                            if (e.includes("images/")) {
                                return <img src={baseUrl + e} width="360" />
                            } else {
                                return <p>{e}</p>
                            }
                        })}
                    </div>
                    <div className="col">
                        <div className="row">
                            <RenderPost post={props.post} />
                        </div>
                        <div className="row">
                            <RenderComments 
                                comments={props.comments} 
                                postComment={props.postComment}
                                postId={props.post.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );
}

export default PostInfo;