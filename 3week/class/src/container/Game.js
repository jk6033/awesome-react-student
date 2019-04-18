import React, { Component } from 'react'
import axios from 'axios'
import ConetntList from "../component/contentList/ContentList.js";

export default class Game extends Component {
	constructor(props) {
        super(props);
        this.state = {
            contents : [] // 하단의 리스트에 들어갈 콘텐츠를 가지는 state
        };
  
      }
  
  // 서버로 부터 받은 데이터를 내가 원하는 형태로 변경 하는 함수
  // {id: , name: } 형식으로 모든 데이터들을 변환
    setContents = (data) => { 
     let list = []
      data.items.forEach((item, index) => {
          list.push({id:item.id,name:item.snippet.title})
        // list.push({{id:item.kind, id:item.snippet.channelId}})
      })
      return list
    }
  
  //컴포넌트 렌더링이 완료된 후 유튜브에서 데이터 불러옴
    componentDidMount() {
        this.fetchYoutube()
    }
  
  //메인화면에서 영상을 실행하는 플레이어를 제어하는 함수
  //이 함수를 이용해서 영상을 변경 한다.
    // handleFullContentChange = (content) => {
    //   this.setState({
    //     fullContent:content
    //   })
    // }
  
  //유튜브에 ajax 통신을 해서 데이터를 불러 오는 함수
    fetchYoutube = () => {
        //axios를 이용해서 유튜브에 영상 목록을 달라고 요청
      axios.get(
        //   'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY&maxResults=21'
        //   "https://www.googleapis.com/youtube/v3/search?part=snippet&q=&type=video&videoCategoryId=20&key=AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY&maxResults=10"
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=AIzaSyC-v1sIG2Wn3YnoD_7_bBS4zPDceDLKmLY&maxResults=21&videoCategoryId=20'
        )
      .then(({data}) => {//유튜브로 부터 요청한 데이터를 전달 받으면 then으로 데이터를 받음
                          //디스트럭쳐링을 통해서 유튜브로부터 받은 데이터중에서 data만 가져옴 
  
          const list = this.setContents(data)//받아온 데이터를 내가 원하는 형태로 가공
  
          this.setState({// 가공한 데이터로 지금 바로 실행할 데이터와, 목록에 보여줄 데이터를 state에 저장
              contents: list 
          })
      })
    }
  
    render() {
      return (
        <div className="mainView">
            {/*
              실행할 영상 리스트를 출력하는 컴포넌트
            */}
             <ConetntList contents={this.state.contents} 
            //  onClick={this.handleFullContentChange} 
             />
        </div>
      );
    }
  }
  
  