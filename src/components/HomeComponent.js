import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardHeader, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess, category}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }
    const getCardTitle = category => {
        switch (category) {
            case "game": 
                return "Featured Game";
            case "blog": 
                return "Blog Post";
            case "tech": 
                return "Technologies Used";
            case "promo": 
                return "GitHub Repository";
            default:
                return "Card Title";
        }
    }
    let cardTitle = getCardTitle(category);
    
    const getCardLink = (category) => {
        switch (category) {
            case "game": 
                return <Link to={`/games/${item.id}`} className="btn btn-primary ">Go to {cardTitle}</Link>;
            case "blog": 
                return <Link to={`/blog/${item.id}`} className="btn btn-primary ">Go to {cardTitle}</Link>;
            case "tech": 
                return <Link to={"/aboutus"} className="btn btn-primary ">Go to About Page</Link>;
            case "promo": 
                return <Button href="https://github.com/andychchou/nutabletopreact" color="primary">Go to GitHub</Button>;
            default:
                return "/home";
        }
    }
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
            <Card>
                <CardHeader><h5>{cardTitle}</h5></CardHeader>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                    {getCardLink(category)}
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.game}
                        isLoading={props.gamesLoading}
                        errMess={props.gamesErrMess}
                        category="game"
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.post}
                        isLoading={props.postsLoading}
                        errMess={props.postsErrMess}
                        category="blog"
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard
                        item={props.tech}
                        isLoading={props.techLoading}
                        errMess={props.techErrMess}
                        category="tech"
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                        category="promo"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;