import React, {Component} from "react"
import "./note.css"
// import PropTypes from "prop-types"

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      content: this.props.content,
      isClicked: this.props.isClicked,
    }
  }

  handleClickDelete = () => {
    this.props.delete(this.props.index)
  }

  handleSubmit = (e) => {
    console.log('update is submitted')
    this.props.update(this.props.id, this.state.title, this.state.content)
    this.setState({
      title: this.state.title,
      content: this.state.content
    })
    e.preventDefault()
  }

  handleChange = (event) => {
    //key 내부에 []를 쓰면, 내부 자바스크립트를 따라 실행됩니다.
    //곧 이 경우 event.target.name에 접근하게 됩니다.
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClickNote = (e) => {

    if (!this.state.isClicked) {
      console.log('notes will be updated: false -> true')
      this.setState({isClicked: true})
    } else {
      console.log('notes will be updated: true -> false')
      this.setState({isClicked: false})
    }
  }

  setBoundary = (dom) => {
    this.noteBoundary = dom
  }
// "", null
  handleClickOutside = ({target}) => {
//input이 변함이 없을때만 변경하도록 한다. 
    if (this.noteBoundary && !this.noteBoundary.contains(target)){
      this.setState({
        isClicked: false
      })
    }

  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handdleClickOutside)
  }

  componentWillMount(){
    document.removeEventListener('mousedown', this.handleClickOutside)
  } 


  render() {
    const noteProps = {
      title: this.state.title,
      content: this.state.content,
      handleChange: this.handleChange,
      handleClickNote: this.handleClickNote
    }

    const {isClicked} = this.state
    
    return (
      //아래 내용들은 materialize에 있는 라이브러리와 클래스를 활용한 것 입니다.
      //materialize 의 grid부분을 참고해 주세요.
      <div ref={this.setBoundary}className='Note col s12 m4 l3'>
        <div className='DeleteBtn'>
          <div className='DeleteBtn btn-floating btn-large'>
            <i onClick={this.handleClickDelete} id='Icon' className='material-icons'> delete </i>
          </div>
        </div>

        {isClicked? ( 
            <NotepadUpdate {...noteProps}/>
          ) : (
            <Notepad {...noteProps}/>
          )
        }
        </div>
    )
  }
}

function Notepad(props) {
  return (
    <form>
      <div className='card yellow lighten-4' onClick={props.handleClickNote}>  
        <div className='card-content black-text'>
          <span className='card-title'> {props.title} </span>
          <p> {props.content} </p>
        </div> 
      </div>
    </form>
  )
}

function NotepadUpdate(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className='card yellow lighten-4'>
        <div className='card-content black-text'>
          <div className='input-field'>
            <input
              type='text'
              name='title'
              value={props.title}
              onChange={props.handleChange}
            />
          </div>

          <div className='input-field'>
            <input
              type='text'
              name='content'
              value={props.content}
              onChange={props.handleChange}
            />
          </div>
          <input type='submit' value='Submit' onClick={props.handleClickNote} />
        </div>
      </div>
    </form>
  )
}


function inputIsRequired(props, propName, componentName) {
  if (!props[propName]) {
    return new Error(`${propName} is required`)
  }
  return null
}

Note.propTypes = {
  title: inputIsRequired,
  content: inputIsRequired
}

export default Note
