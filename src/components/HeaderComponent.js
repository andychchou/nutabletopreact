import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, 
    Modal, ModalHeader, ModalBody, 
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

//using class component to display header
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
        console.log(this.props.auth.user.username);
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1>Table Top Town</h1>
                                <h2>a town center for games</h2>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src={baseUrl + "images/logo-w.png"} height="30" width="30" alt="Logo" /></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <i className="fa fa-home fa-lg" /> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/games">
                                        <i className="fa fa-gamepad fa-lg" /> Games
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/blog">
                                        <i className="fa fa-rss fa-lg" /> Blog
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <i className="fa fa-info fa-lg" /> About
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <i className="fa fa-address-card fa-lg" /> Contact
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated 
                                        ?
                                        <Button outline onClick={this.toggleModal}>
                                            <i className="fa fa-sign-in fa-lg" /> Login
                                            {this.props.auth.isFetching 
                                                ? <span className="fa fa-spinner fa-pulse fa-fw" />
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching 
                                                    ? <span className="fa fa-spinner fa-pulse fa-fw"/>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                            <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password" innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={input => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                            <div className="mt-2 border-top">
                                <p >Login using a shared guest account with following: </p>
                                <p>Username: guest</p>
                                <p>Password: login</p>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;