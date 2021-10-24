import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function TechList(props) {
    const techs = props.techs.techs.map(tech => {
        return (
            <Fade in key={tech.id}>
                <Media tag="li">
                    <RenderTech tech={tech}/>
                </Media>
            </Fade>
        );
    });
    if (props.techs.isLoading) {
        return <Loading />;
    }
    if (props.techs.errMess) {
        console.log(props.techs.errMess);
        return (
            <div className="col">
                <h4>{props.techs.errMess}</h4>
            </div>
        );
    }
    return (
        <div className="col mt-4">
            <Media list>
                <Stagger in>{techs}</Stagger>
            </Media>
        </div>
    );
}

function RenderTech({tech}) {
    if (tech) {
        return (
            <React.Fragment>
                <Media object src={baseUrl + tech.image} alt={tech.name} width="150" />
                <Media body className="ml-5 mb-4">
                    <Media heading>{tech.description}</Media>
                </Media>
            </React.Fragment>
        );
    }
    
    return <div></div>
}

function About(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>The Golden Age of Table Top Games</h3>
                    <p>Table Top Town is a town-center for learning about classic table top games like Chess and Monopoly. We will also feature  newer, more modern games such as Catan (1995), 7 Wonders (2010), and Wingspan (2019). Table Top Town is here to help you navigate through the world of table top games in this current "Golden Age of Games". </p>
                    <p>Table top games, in particular board games, previously had a "Golden Age" in the 1880s–1920s. This was likely due to the time period's the improvement in industrial mass production, which made board games cheaper and more easily available. Now, many also consider table top games to currently be in another Golden Age. This came about largely due to the Internet, which created easy access for people learn about various games and connect with other people to play with. Also, the development of new games in our modern era are now able to utilize computer simulations of games, allowing game creators to fine-tune their games much easier than before. </p>
                    <p>There is a whole world of games out there, something for everyone. Looking for strategy? Tactics? Group games? Storytelling? There's very likely a game out there that's just what you're looking for.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Table Top Games Stats in 2017</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Board Game Market</dt>
                                <dd className="col-6">$3.2 billion annual</dd>
                                <dt className="col-6">Board Game Cafes in US</dt>
                                <dd className="col-6">Over 5000 cafes</dd>
                                <dt className="col-6">Owning between 1-25 games</dt>
                                <dd className="col-6">57% of households</dd>
                                <dt className="col-6">Kickstarter funding</dt>
                                <dd className="col-6">$165 million annual</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Technologies Used</h3>
                </div>
                <div className="col mt-4">
                    <TechList techs={props.techs}/>
                </div>
            </div>
        </div>
    );
}

export default About;