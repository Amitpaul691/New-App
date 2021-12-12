import React, { Component } from 'react'
import { Link } from "react-router-dom";
import classnames from 'classnames';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      navData:[{
  name:"Home",
  url:"/"
},{
  name:"About",
  url:"/"
},{
  name:"Business",
  url:"/business"
},{
  name:"Entertainment",
  url:"/entertainment"
},{
  name:"General",
  url:"/general"
},{
  name:"Health",
  url:"/health"
},{
  name:"Science",
  url:"/science"
},{
  name:"Sport",
  url:"/sport"
},{
  name:"Technology",
  url:"/technology"
}]
    }
  }

  handleToggle = (value) => {
    this.setState({
      toggle:value
    });
  }

  renderNavBar = () => {
    let items = this.state.navData.map((data,index) => (
      <li key={index} className="nav-item" onClick={() => this.handleToggle(false)}><Link className="nav-link" to={data.url}>{data.name}</Link></li>
    ));

    return items;
  }
            render() {
                        return ( 
                          <div>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                    <div className="container-fluid">
                                      <Link className="navbar-brand" to="/">NewsAdda</Link>
                                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                  <span className="navbar-toggler-icon" onClick={()=>this.handleToggle(!this.state.toggle)}></span>
                                      </button>
                                <div className={classnames(this.state.toggle?"":"collapse","navbar-collapse")} id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                         {this.renderNavBar()}
                                        </ul>
                                      </div>
                                    </div>
                                  </nav>
                                                                      </div>
                        )
            }
}
