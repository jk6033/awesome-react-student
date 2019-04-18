import React, { Component } from 'react'
import axios from 'axios'
import ConetntList from "../component/contentList/ContentList.js";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            contents: []
        };
    }

    handleInputChage = (e) => {
        this.setState( { keyword: e.target.value })
    }

    handleSumbmit = (e) => {
        this.fetchSearch(this.state.keyword)
        e.preventDefault()
    }

    // 서버로 부터 받은 데이터를 내가 원하는 형태로 변경 하는 함수
    // {id: , name: } 형식으로 모든 데이터들을 변환
    setContents = (data) => { 
        let list = []
        data.items.forEach((item, index) => {
            list.push(
                {
                    id:item.id.videoId,
                    name:item.snippet.title
                })
        })
        return list
    }

    fetchSearch = (keyword) => {
        let maxResults = 10
        let token = "AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY"

        axios.get(
            'https://www.googleapis.com/youtube/v3/search?q='+
            keyword+
            '&part=snippet&key='+
            token+
            '&maxResults='+
            maxResults
            ).then(({ data }) => {
                const list = this.setContents(data);
                this.setState({contents: list});
            });
            
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSumbmit}>
                <label> 검색: </label>
                <input type="text" value={this.state.keyworkd} />
            </form>
            <ConetntList contents={this.state.contents} />
        </div>
        )
    }
}
