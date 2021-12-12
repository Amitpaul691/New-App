import React, { Component } from 'react'

export default class Newsiteam extends Component {
            render() {
                       let { title, description, imageUrl, newsUrl, author, date, source }=this.props;
                        return (
                        <div className="my-3">
                            <div className="card">
                              <div style={{display: 'flex',justifycontent: 'flex-end',position: 'absolute',right: '0'}}>
                              <span className=" badge rounded-pill bg-danger" >{source}</span>
                              </div>
                        <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="blank" className="btn btn-dark">Go somewhere</a>
                        </div>
                        </div> 
                          </div>
                        )
            }
} 
