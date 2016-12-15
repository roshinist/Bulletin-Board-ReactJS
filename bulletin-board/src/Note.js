import React from 'react';
import './App.css';
import Draggable from 'react-draggable'

var Note = React.createClass({
				//Create functions inside React variable
				//Curly braces {} mean JSX expressions
				getInitialState(){
					return {editing: false};
				},
				componentWillMount(){
					this.style = {
						right: this.randomBetween(0, window.innerWidth - 150, 'px'),
						top: this.randomBetween(0, window.innerWidth - 150, 'px')
					}
				},
				componentDidUpdate(){
					if(this.state.editing){
						this.refs.newText.focus();
						this.refs.newText.select();
					}
				},
				shouldComponentUpdate(nextProps, nextState){
					//Prevents unnecessary rendering, OPtimization, speeds
					return this.props.children !== nextProps.children || this.state !== nextState
				},
				randomBetween(x, y, s){
					return(x + Math.ceil(Math.random() * (y-x))) + s
				},
				edit(){
					this.setState({editing:true});
					//alert("Editing Note");
				},
				save(){
					// var val = this.refs.newText.value;
					// this.setState({editing:false});
					this.props.onChange(this.refs.newText.value, this.props.id)
					this.setState({editing:false})
				},
				remove(){
					// alert("Removing Note");
					this.props.onRemove(this.props.id)
				},
				renderForm(){
					return (
						<div className = "note" style = {this.style}>
							<textArea ref = "newText"
										defaultValue = {this.props.children}>
									  </textArea>
							<button onClick = {this.save}>Save</button>
						</div>
					)
				},
				renderDisplay(){
					return (
						<div className="note" style = {this.style}>
							<p>{this.props.children}</p>
							<span>
								<button onClick = {this.edit}>Edit</button>
								<button onClick = {this.remove}>X</button>
							</span>
						</div>
					)	
				},
				render() {
					return ( <Draggable>
						{(this.state.editing) ? this.renderForm() : 
													this.renderDisplay()}
							</Draggable> 
					);
				}
			})
export default Note;