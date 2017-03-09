import React from 'react';
import axios from 'axios';
import { browserHistory, Link } from 'react-router';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signedIn: false,
    }
  }

  componentWillMount () {
    var context = this;
    axios.get('/api/session').then(function(res) {
      if (typeof res.data === 'object') {
        context.setState({
          user: res.data,
          signedIn: true
        })
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    var context = this;
    axios.get('/api/session').then(function(res) {
      if (typeof res.data === 'object') {
        context.setState({
          user: res.data,
          signedIn: true
        })
      } else {
        context.setState({
          user: {},
          signedIn: false
        })
      }
    })
  }

  sidebarAddClass() {
    var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
    return sidebarClass;
  }

  handleSignout() {
    var context = this;
    axios.post('/signout', context.state.user).then(function(res) {
      if (res.request.responseURL === 'http://localhost:3000/signin' || res.request.responseURL === 'http://127.0.0.1:3000/signin') {
        browserHistory.push('/signin');
      }
    });
  }

  handleSignin() {
    browserHistory.push('/signin');
  }

  render() {
    var context = this;
    if (this.state.signedIn) {
      var signOutOrSignIn = function () {
        return (
          <div className="sidebar-content">
            <Link className="signoutlink" onClick={() =>{context.props.toggleSidebar(); context.handleSignout()}}>Sign Out</Link>
          </div>
        )
      }
    } else {
      var signOutOrSignIn = function () {
        return (
          <div className="sidebar-content">
            <Link className="signinlink" onClick={() =>{context.props.toggleSidebar(); context.handleSignin()}}>Sign In</Link>
          </div>
        )
      }
    }
    return (
      <div className="sidebarContainer">
        <img src='http://www.freeiconspng.com/uploads/menu-icon-13.png' 
          className="burger-button" onClick={this.props.toggleSidebar} />
        <div className={this.sidebarAddClass()}>
          <div className="sidebar-links">
            <div className="sidebar-content">
              <Link to="/mapview" className="maplink" onClick={this.props.toggleSidebar}>Mapview</Link>
            </div>
            <div className="sidebar-content">
              <Link to="/trending" className="userfeedlink" onClick={this.props.toggleSidebar}>Trending</Link>
            </div>
            <div className="sidebar-content">
              <Link to="/profile" className="profilelink" onClick={this.props.toggleSidebar}>Profile</Link>
            </div>
            {signOutOrSignIn()}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
