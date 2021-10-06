import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function PartnerList(props) {
    const partners = props.partners.partners.map(partner => {
        return (
            <Fade in key={partner.id}>
                <Media tag="li">
                    <RenderPartner partner={partner}/>
                </Media>
            </Fade>
        );
    });
    if (props.partners.isLoading) {
        return <Loading />;
    }
    if (props.partners.errMess) {
        console.log(props.partners.errMess);
        return (
            <div className="col">
                <h4>{props.partners.errMess}</h4>
            </div>
        );
    }
    return (
        <div className="col mt-4">
            <Media list>
                <Stagger in>{partners}</Stagger>
            </Media>
        </div>
    );
}

function RenderPartner({partner}) {
    if (partner) {
        return (
            <React.Fragment>
                <Media object src={baseUrl + partner.image} alt={partner.name} width="150" />
                <Media body className="ml-5 mb-4">
                    <Media heading>{partner.description}</Media>
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
                    <PartnerList partners={props.partners}/>
                </div>
            </div>
        </div>
    );
}

export default About;