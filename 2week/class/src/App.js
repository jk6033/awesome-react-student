import React, {Component} from "react"
import Writing from './Writing.js'
import Note from './Note.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //state의 초기값을 설정합니다.
      savedNotes: [
        {id: 0, title: "title1", content: "default1"}, 
        {id: 1, title: "title2", content: "default2"}
    ]

    }
  }

  save = (state) => {
    //설계한 함수의 상태를 확인하기 위해 save를 표시하도록 해봅시다.
    console.log(state.title + "is saved")
    const {savedNotes} = this.state
    const lastNoteId = savedNotes[savedNotes.length-1].id
    this.setState({savedNotes: [...savedNotes, {id: lastNoteId+1, title : state.title, content : state.content}]})
  }
  
  delete = (index) => {
    //template literal을 한번 더 활용해 봅시다.
    console.log(`${index} note + will be deleted`)
    const {savedNotes} = this.state
    const filteredNotes = savedNotes.filter((note)=>note.id !== index)
    this.setState({
      savedNotes: filteredNotes
    })
  }

  render() {
    const {savedNotes} = this.state
    return (
      <div className='App'>
        
        <Writing save={this.save} />
        <div className='row'>
          {this.state.savedNotes.map((note) => (
            <Note
              title={note.title}
              content={note.content}
              index={note.id}
              key={note.id}
              del={this.delete}
            />
          ))}
        </div>
      </div>
    ) 
  }
  
}

export default App
