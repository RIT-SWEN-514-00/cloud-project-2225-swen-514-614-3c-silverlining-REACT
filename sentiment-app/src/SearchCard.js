import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import './SearchCard.css'

const testData = [{name: 'Test Point 1', uv: 400, pv: 2400, amt: 2400}, {name: 'Test Point 2', uv: 250, pv: 2400, amt: 2400}, {name: 'Test Point 3', uv: 300, pv: 2400, amt: 2400}];

class SearchCard extends Component{
    render(){
        return(
            <div className='CardContainer'>
                <p>{this.props.searchName}</p>
                <p>{this.props.searchType}</p>
                <div className='ChartContainer'>
                    <LineChart width={600} height={300} data={testData}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
            </div>
        )
    }
}

export default SearchCard;