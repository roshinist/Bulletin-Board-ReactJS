import React from 'react';
import './App.css';
import Note from './Note'

var Board = React.createClass({
              propTypes: {
                  count: function(props, propName) {
                      if(typeof props[propName] !== "number") {
                          return new Error("the count must be a number")
                      } 

                      if(props[propName] > 100) {
                          return new Error('Creating ' + props[propName] + ' notes is ridiculous')
                      }
                  }
              },
        getInitialState(){
          return{
            notes: [
              //{id:0, note: "Call Bob"}
            ]
          }
        },
        componentWillMount(){
          if(this.props.count){
            var url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
            fetch(url)
              .then(results => results.json())
              .then(array =>array[0])
              .then(text => text.split('. '))
              .then(array =>array.forEach(
                sentence => this.add(sentence)))
              .catch(function(err){
                console.log("Didn't connect to API", err)
              })
          }
        },
        nextId(){
          this.uniqueId = this.uniqueId || 0;
          return this.uniqueId++;
        },
        add(text){
          var notes = [
            ...this.state.notes,
            {
              id: this.nextId(),
              note: text
            }
          ]
          this.setState({notes})
        },
        update(newText, id){
          //Handle editing of notes
          // var notes = this.state.notes.map(
          //    //Map function takes in a note and checks id
          //    //If not the same, return note
          //    //If same, return new object
          //    note => (note.id !== id) ? note : 
          //        {
          //          //Return a new object
          //          //SPREAD OPERATOR '...'
          //          //Used to push whatever keys into that note
          //          //Set the newText to note
          //          ...note,
          //          note: newText
          //        }
          //  )
          // this.setState({notes})

          var notes = this.state.notes.map(
                    note => (note.id !== id) ?
                       note : 
                        {
                            ...note, 
                            note: newText
                        }
                    )
                  this.setState({notes})
        },
        remove(id){
          //Call Javascript array function 'filter()'
          var notes = this.state.notes.filter(note => note.id !== id)
                  this.setState({notes})
        },
        eachNote(note){
          return (<Note key = {note.id}
                     id = {note.id}
                     onChange= {this.update}
                     onRemove = {this.remove}>
                    {note.note}
                  </Note>);
        },
        render(){
          return(
            <div className = "board">
              {this.state.notes.map(this.eachNote)}
              <button onClick={() => this.add("New Note")}>+</button>
            </div>
          )
        }
      })
      //Render UI Elements
      // ReactDOM.render(
      //  <Note>Hello World</Note>,
      //  document.getElementById('react-container')
      // );

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default Board;
