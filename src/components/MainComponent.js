import React, { Component } from 'react';
import Games from './GamesComponent';
import GameInfo from './GameInfoComponent';
import Play from './PlayComponent';
import Blog from './BlogComponent';
import PostInfo from './PostInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchGames, fetchPosts, fetchComments, fetchPromotions, fetchTechs, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        games: state.games,
        posts: state.posts,
        comments: state.comments,
        techs: state.techs,
        promotions: state.promotions
    };
};

//initialize as an object (preferred), or can also be set up as function
const mapDispatchToProps = {
    postComment: (postId, rating, author, text) => (postComment(postId, rating, author, text)),
    fetchGames: () => (fetchGames()),
    fetchPosts: () => (fetchPosts()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchTechs: () => (fetchTechs()),
    postFeedback: (feedback) => (postFeedback(feedback))
}

class Main extends Component {

    //react lifecycle method called when a component is created and inserted into the DOM
    componentDidMount() {
        this.props.fetchGames();
        this.props.fetchPosts();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchTechs();
    }

    render() {
        //arrow functions inherit the ---this--- of their parent scope
        const HomePage = () => {
            return (
                <Home 
                    game={this.props.games.games.filter(game => game.featured)[0]}
                    gamesLoading={this.props.games.isLoading}
                    gamesErrMess={this.props.games.errMess}
                    post={this.props.posts.posts.filter(post => post.featured)[0]}
                    postsLoading={this.props.posts.isLoading}
                    postsErrMess={this.props.posts.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    tech={this.props.techs.techs.filter(tech => tech.featured)[0]}
                    techLoading={this.props.techs.isLoading}
                    techErrMess={this.props.techs.errMess}
                />
            );
        }
        
        const GameWithId = ({match}) => {
            return (
                <GameInfo
                    game={this.props.games.games.filter(game => game.id === +match.params.gameId)[0]}
                    isLoading={this.props.games.isLoading}
                    errMess={this.props.games.errMess}
                />
            );
        };

        const GameWithIdPlay = ({match}) => {
            return (
                <Play
                    game={this.props.games.games.filter(game => game.id === +match.params.gameId)[0]}
                    isLoading={this.props.games.isLoading}
                    errMess={this.props.games.errMess}
                />
            );
        };

        const PostWithId = ({match}) => {
            return (
                <PostInfo 
                    post={this.props.posts.posts.filter(post => post.id === +match.params.postId)[0]}
                    isLoading={this.props.posts.isLoading}
                    errMess={this.props.posts.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.postId === +match.params.postId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };
        
        return (
          <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/games' render={() => <Games games={this.props.games} />} />
                            <Route exact path='/games/:gameId' component={GameWithId} />
                            <Route exact path='/games/:gameId/play' component={GameWithIdPlay} />
                            <Route exact path='/blog' render={() => <Blog posts={this.props.posts} />} />
                            <Route path='/blog/:postId' component={PostWithId} />
                            <Route exact path='/aboutus' render={() => <About techs={this.props.techs} />} />
                            <Route exact path='/contactus' render={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
          </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));