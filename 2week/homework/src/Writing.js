import React, {Component} from "react"

class Writing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "awesome",
      content: "react",
      isWritingTitleFocused: false,
      isContentFocused: false,
    }
  }

  handleSubmit = (e) => {
    this.props.save(this.state)
    this.setState({
      title: "",
      content: ""
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

  handleFocus = (e) => {
    if (!this.state.isWritingTitleFocused) {
      console.log('WritingTitle gets focus')
      this.setState({
        isWritingTitleFocused: true
      })
    }
  }

  handleFocus2 = (e) => {
    if (!this.state.isContentFocused) {
      console.log('WritingContent gets focus')
      this.setState({
        isContentFocused: true
      })
    }
  }

  handleBlur = (e) => {
    if (this.state.isWritingTitleFocused && this.state.title==="" && this.state.content==="" && !this.state.isContentFocused) {
      console.log('WritingTitle loses focus')
      this.setState({
        isWritingTitleFocused: false
      })

    }
    if (!this.state.isContentFocused) {
      console.log("Writing Content lose focus")
    }
  }

  submitBlur = (e) => {
    console.log('WritingTitle loses focus because of submit')
    this.setState({isWritingTitleFocused: false})
  }

  render() {
    const writingTitleProps = {
      title: this.state.title,
      handleChange: this.handleChange,
      handleFocus: this.handleFocus,
      handleBlur: this.handleBlur
    }

    const writingContentProps = {
      content: this.state.content,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur
    }

    const {isWritingTitleFocused} = this.state
    const {handleSubmit} = this

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <WritingTitle {...writingTitleProps} />
          {isWritingTitleFocused && <WritingContent {...writingContentProps} />}
          <input type='submit' value='Submit' onClick={this.submitBlur}/>
        </form>
      </div>
    )
  }
}

function WritingTitle(props) {
  return (
    <div className='input-field'>
      <input
        type='text'
        name='title'
        value={props.title}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
      />
    </div>
  )
}

function WritingContent(props) {
  return (
    <div className='input-field'>
      <input
        type='text'
        name='content'
        value={props.content}
        onChange={props.handleChange}
        onFocus={props.handleFocus2}
        onBlur={props.handleBlur}
      />
    </div>
  )
}

export default Writing
