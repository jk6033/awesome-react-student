import React, {Component} from "react"
import Writing from "./Writing"
import Note from "./Note"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedNotes: [
        {id: 0, title: "title1", content: "default1", isClicked: false},
        {id: 1, title: "title2", content: "default2", isClicked: false},
        {id: 2, title: "title3", content: "default3", isClicked: false}
      ]
    }
  }

  save = (writingState) => {
    const {savedNotes} = this.state
    const lastNoteId = savedNotes[savedNotes.length - 1].id
    
    this.setState({
      savedNotes: [
        ...savedNotes,
        {
          id: lastNoteId + 1,
          title: writingState.title,
          content: writingState.content,
          isFocused: false
        }
      ]
    })
  }

  delete = (index) => {
    console.log(`${index} will be deleted`)
    const {savedNotes} = this.state
    savedNotes.splice(index, 1)
    this.setState({
      savedNotes: savedNotes
    })
  }

  update = (index, title_inp, content_inp) => {
    console.log(`${index} will be updated`)
    const {savedNotes} = this.state
    savedNotes.splice(index, 1, {id: index, title: title_inp, content: content_inp, isClicked: false})
  }

  render() {
    return (
      <div>
        <Writing save={this.save} />
        <div className='row'>
          {this.state.savedNotes.map((note, index) => (
            <Note
              delete={this.delete}
              title={note.title}
              content={note.content}
              index={index}
              key={note.id}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
