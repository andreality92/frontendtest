import React from "react"

const Table = props => {
	return <table>
	            <thead>
	            <tr className="tableHeader">
	              <th>Date/Time</th>
	              <th>Value 1</th>
	              <th>Value 2</th>
	            </tr>
	            </thead>
	            <tbody>
	          {props.dataAPI.map((x,i)=>{
	            if (props.limitDateTime < new Date(x.timestamp) && !(i % 10)) {
	              return  <tr key={"item-"+i}>
	                        <td>{props.handleTime(x.timestamp)}</td>
	                        <td>
	                        	<input type="number" 	
	                        		   onChange={props.handleValue.bind(this,i,1)} 
	                        		   defaultValue={x.value1.toFixed(2)}/>
							</td>
	                        <td>
	                        	<input type="number" 
	                        		   onChange={props.handleValue.bind(this,i,2)} 
	                        		   defaultValue={x.value2.toFixed(2)}/>
	                       	</td>
	                      </tr>
	            }
	          })}
	            </tbody>
          </table>
}

export default Table