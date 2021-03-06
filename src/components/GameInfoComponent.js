import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

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

function RenderDescription({game}) {
    let playButton = <Link to={`/games/${game.id}/play`}><Button color="primary">Play Now</Button></Link>
    if (game.id > 1) {
        playButton = <h4>This Game App is currently under construction.</h4>
    }
    return (
        <div className="col-md-5 m-1">
            {playButton}
            <h4 className="mt-2">How to Play:</h4>
            <ul>
                {game.instruction.map(rule => {
                    return <li key={game.instruction.indexOf(rule)}>{rule}</li>
                })}
                <li key={game.instruction.length}>See link below for additional details and instructions: </li>
                <li key={game.instruction.length + 1}><a href={game.link} target="_blank">More details.</a></li>
            </ul>
        </div>
        
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
                    <RenderDescription game={props.game} />
                </div>
            </div>
        );
    }
    return (
        <div></div>
    );
}

export default GameInfo;