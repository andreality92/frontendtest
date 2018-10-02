import React from "react"

const DateFilter = props => {
	return <select onChange={props.handleSelect.bind(this)} value={props.limitDate}>
	            <option value={"6hours"}>Last 6 hours</option>
	            <option value={"24hours"}>Last 24 hours</option>
	            <option value={"7days"}>Last 7 days</option>
	            <option value={"month"}>Last month</option>
	            <option value={"3months"}>Last 3 months</option>
	         </select>
}

export default DateFilter