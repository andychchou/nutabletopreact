import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Label,} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderGame({game}) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
                <Card>
                    <CardImg top src={baseUrl + game.image} alt={game.name} />
                    <CardBody>
                        <CardText>{game.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

function RenderComments({comments, postComment, gameId}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Text Here</h4>
            </div>
        )
    }

    return (
        <div></div>
    )
}

function GameInfo(props) {
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
    if(props.game) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/games">Games</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.game.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.game.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderGame game={props.game} />
                    <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        gameId={props.game.id}
                    />
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );
}

export default GameInfo;