import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import Table from "./components/Table"
import DateFilter from "./components/DateFilter"
const CanvasJSReact = require('./canvasjs/canvasjs.react');
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  state = {
    dataAPI: [],
    limitDateTime: null,
  }
  componentDidMount(){
    axios.get("http://localhost:8080/reading")
        .then(response => {
          this.setState({dataAPI: response.data});
          this.showResults();
        });
      this.today = new Date();
      this.setState({
         limitDateTime: new Date(this.today.getTime() - (1000*60*60*6))
      }) 
  }
  componentDidUpdate(){
      this.showResults();
  }
  showResults(){
      this.state.dataAPI.map((x,i)=>{
         let value1 = parseFloat(x.value1.toFixed(2));
         let value2 = parseFloat(x.value2.toFixed(2));
         let currentHour = new Date(x.timestamp);
         if (currentHour > this.state.limitDateTime && !(i % 10)){
            this.options.data[0].dataPoints.push({
               y: value1, 
               label: this.handleChartTime(x.timestamp)
            });
            this.options.data[1].dataPoints.push({
               y: value2,
               label: this.handleChartTime(x.timestamp)
            });
         }
      })
      this.chart.render();
  }
  handleTime(time){
    let newTime = time.substring(0,time.length-3);
    newTime = newTime.replace("T", ".   ");
    newTime = newTime.replace("-", "/");
    newTime = newTime.replace("-", "/");
    return newTime
  }
  handleChartTime(time){
    let newTime = time.substring(11,time.length);
    return newTime
  }
  handleSelect(e){
   const $this = this;
    let val = e.currentTarget.value;

    if (val === "6hours") {
        $this.setState({ limitDateTime: new Date(this.today.getTime() - (1000*60*60*6)) })
    }
    if (val === "24hours") {
        $this.setState({ limitDateTime: new Date(this.today.getTime() - (1000*60*60*24)) })
    }
    if (val === "7days") {
        $this.setState({ limitDateTime: new Date(this.today.getTime() - (1000*60*60*24*7)) })
    }
    if (val === "month") {
        $this.setState({ limitDateTime: new Date(this.today.getTime() - (1000*60*60*24*30)) })
    }
    if (val === "3months") {
        $this.setState({ limitDateTime: new Date(this.today.getTime() - (1000*60*60*24*30*3)) })
    }
  }
  handleValue(i,n,e){
      let val = parseFloat(e.currentTarget.value);
      let newArr = [...this.state.dataAPI]
      if (n===1){
         newArr[i].value1 = val
      }
      else {
         newArr[i].value2 = val

      }
      let objToSend = newArr[i];
      axios.put(
        "http://localhost:8080/reading",
        JSON.stringify(objToSend),
        { headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }})
      .then(res => res.json())
      .catch(err => console.log(err));

      this.setState({
         dataAPI: newArr
      })
      this.chart.render();
  }

  render() {
      this.options = {
            animationEnabled: true, 
            axisY : {
               includeZero: false
            },
            toolTip: {
               shared: true
            },
            data: [{
               type: "spline",
               name: "Value 1",
               showInLegend: true,
               dataPoints: [
               ]
            },
            {
               type: "spline",
               name: "Value 2",
               showInLegend: true,
               dataPoints: [
               ]
            }]
      }

    return (
      <div className="App">
         <h2>Values/Time</h2>
         <DateFilter limitDate={this.state.limitDate} handleSelect={this.handleSelect.bind(this)}/>
         <div className="graph">
            <CanvasJSChart options = {this.options} onRef={ref => this.chart = ref} />
         </div>
         <h2>Table</h2>
         <div className="tableWrapper">
         <Table dataAPI={this.state.dataAPI} 
                limitDateTime={this.state.limitDateTime}
                handleTime={this.handleTime.bind(this)}
                handleValue={this.handleValue.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
