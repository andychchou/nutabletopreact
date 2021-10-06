import React from 'react';
import Chess from './chess/ChessComponent'
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label,} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderGame({game}) {
    if (game.name === "Chess") {
        return(
            <Chess />
        );
    }    
    return(
        <div></div>
    );
}

function Play(props) {
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
                            <BreadcrumbItem><Link to={`/games/${props.game.id}`}>{props.game.name}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Play</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.game.name}</h2>
                        <hr />
                    </div>
                </div>
                <RenderGame game={props.game} />
            </div>
        );
    }
    return (
        <div></div>
    );
}

export default Play;