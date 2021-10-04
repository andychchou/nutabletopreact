import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderGameItem({game}) {
    return (
        <Card>
            <Link to={`/games/${game.id}`}>
                <CardImg width="100%" src={baseUrl + game.image} alt={game.name} />
                <CardImgOverlay>
                    <CardTitle>{game.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

function Games(props) {

    const directoryGames = props.games.games.map(game => {
        return (
            <div key={game.id} className="col-md-5 m-1">
                <RenderGameItem game={game} />
            </div>
        );
    });

    if (props.games.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.games.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.games.errMess}</h4>
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
                        <BreadcrumbItem active>Games</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Games</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directoryGames}
            </div>
        </div>
    );
}

export default Games;