import React, {Component} from "react"
import './note.css'

class Note extends Component {
    handleClickDelete = () => {
      this.props.del(this.props.index)
    }
  
    render() {
      const {title, content} = this.props
      return (
        //아래 내용들은 materialize에 있는 라이브러리와 클래스를 활용한 것 입니다.
        //materialize 의 grid부분을 참고해 주세요.
        <div className='Note col s12 m4 l3'>
          <div className='DeleteBtn'>
            <div className='DeleteBtn btn-floating btn-large'>
              <i onClick={this.handleClickDelete} id='Icon' className='material-icons'>
                delete
              </i>
            </div>
          </div>
          <div className='card yellow lighten-4'>
            <div className='card-content black-text'>
              <span className='card-title'>{title}</span>
              <p>{content}</p>
            </div>
          </div>
        </div>
      )
    }
  }

export default Note