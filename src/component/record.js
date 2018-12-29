import React, { Component } from 'react';
import Records from './records'
import RecordForm from './recordForm'
import AmountBox from './amountBox'
// import { getJSON } from 'jquery'
import PropTypes from "prop-types"
import * as Api from "../utils/api"


class Record extends Component {
  constructor(){
    super()
    this.state = {
      records:[],
      error:null,
      isLoaded:false
    }
  }

  componentDidMount(){
    Api.getAll().then(
      response => this.setState({
        records:response.data,
        isLoaded:true
      })
    ).catch(
      error => this.setState({
        isLoaded:true,
        error
      })
    )
    // getJSON("https://5a54227777e1d20012fa0723.mockapi.io/api/v1/records").then(
    //   response => this.setState({
    //     records:response,
    //     isLoaded:true
    //   }),
    //   error => this.setState({
    //     isLoaded:true,
    //     error
    //   })
      
    // )
  }

  addRecord(record){
    this.setState({
      error:null,
      isLoaded:true,
      records:[
        ...this.state.records,
        record
      ]
    })
  }

  updateRecord(record,data){
    const recordIndex = this.state.records.indexOf(record)
    console.log(recordIndex)
    const newRecords = this.state.records.map((item,index)=>{
      if(index !== recordIndex){
        return item
      }

      return {
        ...item,
        ...data
      }
    })

    this.setState({
      records:newRecords
    })
  }

  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record)
    console.log(recordIndex)
    const newRecords = this.state.records.filter((item,index) => index !== recordIndex)
    this.setState({
      records:newRecords
    })
  }

  credits(){
    let credits = this.state.records.filter((record)=> {
      return record.amount >= 0;
    })

    return credits.reduce((prev,curr)=>{
      return prev +Number.parseInt(curr.amount,0)
    },0)
  }
  debits(){
    let credits = this.state.records.filter((record)=> {
      return record.amount < 0;
    })

    return credits.reduce((prev,curr)=>{
      return prev +Number.parseInt(curr.amount,0)
    },0)
  }
  balance(){
    
    return this.credits() +this.debits()
  }

  render() {
    const {error,isLoaded,records} = this.state;

    let recordsComponent;

    if(error){
      recordsComponent = <div>Error:{error.message}</div>;
    }else if(!isLoaded){
      recordsComponent = <div>Loadind...</div>;
    }else{
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map((record,i) => (
              <Records 
                key={record.id} 
                record={record} 
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              ></Records>
            ))}
            
          </tbody>
        </table>
        
      );
    }

    return (
      <div>
          <h2>Records</h2>
          <div className="row mb-3">
              <AmountBox text="收入" type="success" amount={this.credits()}></AmountBox>
              <AmountBox text="支出" type="danger" amount={this.debits()}></AmountBox>
              <AmountBox text="总计" type="info" amount={this.balance()}></AmountBox>
          </div>
          <RecordForm handleNewRecord={this.addRecord.bind(this)}></RecordForm>
          {recordsComponent }
      </div>
    )

    
  }
}

export default Record;


Record.propTypes = {
  id:PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
}