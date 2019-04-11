import React, {Component} from "react"

class Writing extends Component {
    
    constructor(props) {
      super(props)
      this.state = {
        isFocused: false,
        title: "",
        content: ""
      }
    }
  
    //cf const {target} = e
    handleChange = ({target}) => {
      this.setState({[target.name]: target.value})
    }
  
    handleSubmit = (e) => {
      console.log('saved')
      this.props.save(this.state)
      e.preventDefault()
    }
    
    handleFocus = () => {
        this.setState({isFocused:true})
    }
  
    render() {
    const {isFocused} = this.state
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />

          {isFocused ? 
          (<input
            type='text'
            name = 'content'
            value={this.state.content}
            onChange={this.handleChange}
          /> ) : ''
        }

          <input type='submit' />

        </form>
      )
    }
  }
  

export default Writing