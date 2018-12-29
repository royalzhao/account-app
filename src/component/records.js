import React, { Component } from 'react';
import * as Api from "../utils/api"


class Records extends Component {
  constructor(){
    super()

    this.state={
      edit:false
    }
  }

  handleToggle(){
    this.setState({
      edit:!this.state.edit
    })
  }

  handleEdit(e){
    e.preventDefault()
    const record = {
      date:this.refs.date.value,
      title:this.refs.title.value,
      amount:Number.parseInt(this.refs.amount.value,0)
    }
    Api.update(this.props.record.id,record).then(
      res => {
        this.setState({
          edit:false
        })
        console.log(res.data)
        this.props.handleEditRecord(this.props.record,res.data)
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  handleDelete(e){
    e.preventDefault()
    Api.remove(this.props.record.id).then(
      res => {
        console.log(this.props.record)
        this.props.handleDeleteRecord(this.props.record)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  recordRow(){
    return (
      
      <tr>
          <td>{this.props.record.id}</td>
          <td>{this.props.record.date}</td>
          <td>{this.props.record.title}</td>
          <td>{this.props.record.amount}</td>
          <td>
            <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>Edit</button>
            <button className="btn btn-danger mr-1" onClick={this.handleDelete.bind(this)}>delete</button>
          </td>
      </tr>
         
  
    );
  }

  recordForm(){
    return (
      
      <tr>
          <td>{this.props.id}</td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.date}  ref="date" /></td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.title}   ref="title"/></td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.amount}  ref="amount" /></td>
          
          <td>
            <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>Update</button>
            <button className="btn btn-danger mr-1" onClick={this.handleToggle.bind(this)}>cancel</button>
          </td>
      </tr>
         
  
    );
  }

  render() {
      if(this.state.edit){
        return this.recordForm()
      }else{
        return this.recordRow()
      }
  }
}

export default Records;
