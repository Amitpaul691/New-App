import React, { Component } from 'react'
import Newsiteam from './Newsiteam'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
            static defaultpropsType = {
                        country: "in",
                        pagesize:6      
            }
            static propType = {
                        country: PropTypes.string,
                        pagesize:PropTypes.number
            }
            capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
            constructor(props) {
                        super(props);
                        this.state = {
                                    articles: [],
                                    loading: false,
                                    page: 1, totalResults: 0
                        }
                        document.title= `${this.capitalizeFirstLetter(this.props.category)}- NewsAdda`
            }
  async updateNews(pageNo) {
    this.props.setProgress(0);
                        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
                        this.setState({loading:true})
                        let data = await fetch(url);
                        this.props.setProgress(30);
                        let parsedData = await data.json()
                        this.props.setProgress(60);
                        // console.log(parsedData);
                        this.setState({
                                    articles: parsedData.articles,
                                    totalResults: parsedData.totalResults,
                                    loading: false,
                        
                        })
                         this.props.setProgress(100);
            }
            async componentDidMount() {
                        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pagesize}`;
                        // let data = await fetch(url);
                        // let parsedData = await data.json()
                        // // console.log(parsedData);
                        // this.setState({
                        //             articles: parsedData.articles,
                        //             totalResults: parsedData.totalResults,
                        //             loading:true
                        // })
                        this.updateNews(); 
            }
            handlenextclick = async () => {
                        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pagesize))) {
                        //             let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
                        //             this.setState({ loading: true });
                        //             let data = await fetch(url);
                        //             let parsedData = await data.json()
                        //             this.setState({
                        //                         articles: parsedData.articles,
                        //                         page: this.state.page + 1,
                        //                         loading:false
                        //             })
                        // }                   
                        this.setState({ page: this.state.page + 1 });
                        this.updateNews();
            }
            handlepreviousclick = async () => {
                        console.log("previous")
                        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
                        // this.setState({ loading: true });
                        // let data = await fetch(url);
                        // let parsedData = await data.json()
                        // this.setState({
                        //             articles: parsedData.articles,
                        //             page: this.state.page - 1,
                        //             loading:false
                        // })
                        this.setState({ page: this.state.page - 1 });
                        this.updateNews();
            }
            fetchMoreData = async() => {
                        this.setState({ page: this.state.page + 1 })
                        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
                        let data = await fetch(url);
                        let parsedData = await data.json()
                        // console.log(parsedData);
                        this.setState({
                                    articles: this.state.articles.concat(parsedData.articles),
                                    totalResults: parsedData.totalResults,
                                    
                        
                        })
                        };

            render() {
                        return (
                                    <>
                                                <h1 className="text-center" style={{ margin: '30px 0px' }}>NewsAdda-Top headline on {this.capitalizeFirstLetter(this.props.category)}</h1>
                                                {this.state.loading&&<Spinner/>}
                                                <InfiniteScroll
                                                dataLength={this.state.articles.length}
                                                next={this.fetchMoreData}
                                                hasMore={this.state.articles.length!==this.state.totalResults}
                                                loader={<Spinner/>}
                                                >
                                                <div className="container">            
                                                <div className="row">
                                                            {/* {!this.state.loading&&this.state.articles.map((element)=>{ */ }
                                                            {!this.state.loading&&this.state.articles.map((element)=>{
                                                return <div className="col-md-4" key={element.url}>
                                                            <Newsiteam title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                                </div>
                                                })}
                                                </div>
                                                </div>
                                                </InfiniteScroll>
                                                {/* <div className="container d-flex justify-content-between">
                                                            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlepreviousclick}>&larr;previous</button>
                                                            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>next &rarr;</button>
                                                </div> */}
                                    </>
                        )
            }
}
