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
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Header</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Card Header</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">Date here</dd>
                                <dt className="col-6">Row 2</dt>
                                <dd className="col-6">Row 2 Data</dd>
                                <dt className="col-6">Row 3</dt>
                                <dd className="col-6">Row 3 Data</dd>
                                <dt className="col-6">Row 4</dt>
                                <dd className="col-6">Row 4 Data</dd>
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