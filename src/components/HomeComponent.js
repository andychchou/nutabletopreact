import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardHeader } from 'reactstrap';
import { Loading } from './LoadingComponent';
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