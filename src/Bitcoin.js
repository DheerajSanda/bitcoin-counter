
import React, { Component } from 'react';
import './App.css'

import logo from './bitlogo.png';
import {BarChart} from 'react-easy-chart';


import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from './Config/Firebase/db_config';

class Bitcoin extends Component {
  constructor(props){
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');

    this.state = {
      value: '1',
      cv: '',
      ROI:'',
      month:'January',
      stocks: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.monthHandleChange = this.monthHandleChange.bind(this);
  }

  componentWillMount(){
      const dataStocks = this.state.stocks;

      this.database.on('child_added', snap => {
        dataStocks.push(snap.val())
        console.log("dataStocks", dataStocks);
        this.setState({
          stocks: dataStocks
        })

      })


    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  monthHandleChange(event) {
    this.setState({month: event.target.value});
  }

  handleInputChange(event) {
    if(event.target.value < 0){
      alert("Input value should be a positive number!!");
      event.preventDefault();
    }else{
      this.setState({cv: event.target.value});
    }
  }

  handleSubmit(event) {
    console.log('bv' , this.state.value);
    console.log('cv', this.state.cv );
    const bv = this.state.value;
    const cv = this.state.cv;


    //this.setState({ROI : ROI});
    console.log('month: ',this.state.month);

    const month = this.state.month;
    console.log("stock month:", month)
    console.log("stocks: ", this.state.stocks);
    console.log("data:",this.state.stocks[bv][month]);
    const data = this.state.stocks[bv][month];
    this.roi(data,cv);



    event.preventDefault();
  }

  roi(data,cv){
    const roi = (((13800)/Number(data))*Number(cv)).toFixed(2) ;
    console.log("ROI", roi);
    this.setState({ROI : roi});
  }


  render(){
    return(
      <div>
        <img src={logo} alt="logo" style={{padding: '6px', height: '200px' }} />
          <i className="fa fa-btc" ></i>
        <div className = "container" style={{marginTop: '10px'}}>
          <div className="row text-center">
            <div className="jumbotron">
              <h1><strong>Bitcoin Counter</strong></h1>
              <p>A ReactJS app that calculates the return on investment of Bitcoins</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="">
          <div className="fields">
            <div className="field-block">
              <div className="left-field">
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <br />
                      <div>
                        Invested Month:
                        <select className="selectpicker" value={this.state.month} onChange={this.monthHandleChange} style={{marginLeft: '10px'}}>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <br />

                      <div >
                        Invested year:
                        <select className="selectpicker" value={this.state.value} onChange={this.handleChange} style={{marginLeft: '10px', borderRadius: '6px'}}>
                          <option value="0">2011</option>
                          <option value="1">2012</option>
                          <option value="2">2013</option>
                          <option value="3">2014</option>
                          <option value="4">2015</option>
                          <option value="5">2016</option>
                          <option value="6">2017</option>
                        </select>
                    </div>
                  </label>
                  <br />
                  <br />
                  <label>
                  <div style={{marginHeight: '15px'}}>Invested Amount:</div>
                    <div class="input-group">
                      <div class="input-group-addon">$</div>
                      <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount"
                      type="number"
                      value={this.state.cv}
                      onChange={this.handleInputChange}
                      />
                      <div class="input-group-addon">.00</div>
                    </div>
                </label>
                  <input className="btn1 btn-success" type="submit" value="Submit" />
                  <br />
                  <br />
                  <h3><strong>ROI: ${this.state.ROI}</strong></h3>
                </form>
              </div>
              <div className="right-field">
                <BarChart
                  colorBars
                  axes
                  height={250}
                  width={300}
                  barWidth={500}
                  yDomainRange={[5, this.state.ROI+100]}
                  data={[
                    {
                      x: 'Invested Amount',
                      y: this.state.cv
                    },
                    {
                      x: 'ROI',
                      y: this.state.ROI
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    );
  }
}

export default Bitcoin;
