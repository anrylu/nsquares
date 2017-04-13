import React from 'react';
import { calculatePoints, rotateVector,
        comparePoint, indexOfPointInList } from './util.js'
import { default_n, point_radius, stroke_width } from "./util.js"

var sixBySixSquares = [[{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":1}],[{"x":0,"y":0},{"x":2,"y":0},{"x":2,"y":2},{"x":0,"y":2}],[{"x":0,"y":0},{"x":3,"y":0},{"x":3,"y":3},{"x":0,"y":3}],[{"x":0,"y":0},{"x":4,"y":0},{"x":4,"y":4},{"x":0,"y":4}],[{"x":0,"y":0},{"x":5,"y":0},{"x":5,"y":5},{"x":0,"y":5}],[{"x":0,"y":1},{"x":1,"y":0},{"x":2,"y":1},{"x":1,"y":2}],[{"x":0,"y":1},{"x":1,"y":1},{"x":1,"y":2},{"x":0,"y":2}],[{"x":0,"y":1},{"x":2,"y":0},{"x":3,"y":2},{"x":1,"y":3}],[{"x":0,"y":1},{"x":2,"y":1},{"x":2,"y":3},{"x":0,"y":3}],[{"x":0,"y":1},{"x":3,"y":0},{"x":4,"y":3},{"x":1,"y":4}],[{"x":0,"y":1},{"x":3,"y":1},{"x":3,"y":4},{"x":0,"y":4}],[{"x":0,"y":1},{"x":4,"y":0},{"x":5,"y":4},{"x":1,"y":5}],[{"x":0,"y":1},{"x":4,"y":1},{"x":4,"y":5},{"x":0,"y":5}],[{"x":0,"y":2},{"x":1,"y":0},{"x":3,"y":1},{"x":2,"y":3}],[{"x":0,"y":2},{"x":1,"y":1},{"x":2,"y":2},{"x":1,"y":3}],[{"x":0,"y":2},{"x":1,"y":2},{"x":1,"y":3},{"x":0,"y":3}],[{"x":0,"y":2},{"x":2,"y":0},{"x":4,"y":2},{"x":2,"y":4}],[{"x":0,"y":2},{"x":2,"y":1},{"x":3,"y":3},{"x":1,"y":4}],[{"x":0,"y":2},{"x":2,"y":2},{"x":2,"y":4},{"x":0,"y":4}],[{"x":0,"y":2},{"x":3,"y":0},{"x":5,"y":3},{"x":2,"y":5}],[{"x":0,"y":2},{"x":3,"y":1},{"x":4,"y":4},{"x":1,"y":5}],[{"x":0,"y":2},{"x":3,"y":2},{"x":3,"y":5},{"x":0,"y":5}],[{"x":0,"y":3},{"x":1,"y":0},{"x":4,"y":1},{"x":3,"y":4}],[{"x":0,"y":3},{"x":1,"y":1},{"x":3,"y":2},{"x":2,"y":4}],[{"x":0,"y":3},{"x":1,"y":2},{"x":2,"y":3},{"x":1,"y":4}],[{"x":0,"y":3},{"x":1,"y":3},{"x":1,"y":4},{"x":0,"y":4}],[{"x":0,"y":3},{"x":2,"y":0},{"x":5,"y":2},{"x":3,"y":5}],[{"x":0,"y":3},{"x":2,"y":1},{"x":4,"y":3},{"x":2,"y":5}],[{"x":0,"y":3},{"x":2,"y":2},{"x":3,"y":4},{"x":1,"y":5}],[{"x":0,"y":3},{"x":2,"y":3},{"x":2,"y":5},{"x":0,"y":5}],[{"x":0,"y":4},{"x":1,"y":0},{"x":5,"y":1},{"x":4,"y":5}],[{"x":0,"y":4},{"x":1,"y":1},{"x":4,"y":2},{"x":3,"y":5}],[{"x":0,"y":4},{"x":1,"y":2},{"x":3,"y":3},{"x":2,"y":5}],[{"x":0,"y":4},{"x":1,"y":3},{"x":2,"y":4},{"x":1,"y":5}],[{"x":0,"y":4},{"x":1,"y":4},{"x":1,"y":5},{"x":0,"y":5}],[{"x":1,"y":0},{"x":2,"y":0},{"x":2,"y":1},{"x":1,"y":1}],[{"x":1,"y":0},{"x":3,"y":0},{"x":3,"y":2},{"x":1,"y":2}],[{"x":1,"y":0},{"x":4,"y":0},{"x":4,"y":3},{"x":1,"y":3}],[{"x":1,"y":0},{"x":5,"y":0},{"x":5,"y":4},{"x":1,"y":4}],[{"x":1,"y":1},{"x":2,"y":0},{"x":3,"y":1},{"x":2,"y":2}],[{"x":1,"y":1},{"x":2,"y":1},{"x":2,"y":2},{"x":1,"y":2}],[{"x":1,"y":1},{"x":3,"y":0},{"x":4,"y":2},{"x":2,"y":3}],[{"x":1,"y":1},{"x":3,"y":1},{"x":3,"y":3},{"x":1,"y":3}],[{"x":1,"y":1},{"x":4,"y":0},{"x":5,"y":3},{"x":2,"y":4}],[{"x":1,"y":1},{"x":4,"y":1},{"x":4,"y":4},{"x":1,"y":4}],[{"x":1,"y":1},{"x":5,"y":1},{"x":5,"y":5},{"x":1,"y":5}],[{"x":1,"y":2},{"x":2,"y":0},{"x":4,"y":1},{"x":3,"y":3}],[{"x":1,"y":2},{"x":2,"y":1},{"x":3,"y":2},{"x":2,"y":3}],[{"x":1,"y":2},{"x":2,"y":2},{"x":2,"y":3},{"x":1,"y":3}],[{"x":1,"y":2},{"x":3,"y":0},{"x":5,"y":2},{"x":3,"y":4}],[{"x":1,"y":2},{"x":3,"y":1},{"x":4,"y":3},{"x":2,"y":4}],[{"x":1,"y":2},{"x":3,"y":2},{"x":3,"y":4},{"x":1,"y":4}],[{"x":1,"y":2},{"x":4,"y":1},{"x":5,"y":4},{"x":2,"y":5}],[{"x":1,"y":2},{"x":4,"y":2},{"x":4,"y":5},{"x":1,"y":5}],[{"x":1,"y":3},{"x":2,"y":0},{"x":5,"y":1},{"x":4,"y":4}],[{"x":1,"y":3},{"x":2,"y":1},{"x":4,"y":2},{"x":3,"y":4}],[{"x":1,"y":3},{"x":2,"y":2},{"x":3,"y":3},{"x":2,"y":4}],[{"x":1,"y":3},{"x":2,"y":3},{"x":2,"y":4},{"x":1,"y":4}],[{"x":1,"y":3},{"x":3,"y":1},{"x":5,"y":3},{"x":3,"y":5}],[{"x":1,"y":3},{"x":3,"y":2},{"x":4,"y":4},{"x":2,"y":5}],[{"x":1,"y":3},{"x":3,"y":3},{"x":3,"y":5},{"x":1,"y":5}],[{"x":1,"y":4},{"x":2,"y":1},{"x":5,"y":2},{"x":4,"y":5}],[{"x":1,"y":4},{"x":2,"y":2},{"x":4,"y":3},{"x":3,"y":5}],[{"x":1,"y":4},{"x":2,"y":3},{"x":3,"y":4},{"x":2,"y":5}],[{"x":1,"y":4},{"x":2,"y":4},{"x":2,"y":5},{"x":1,"y":5}],[{"x":2,"y":0},{"x":3,"y":0},{"x":3,"y":1},{"x":2,"y":1}],[{"x":2,"y":0},{"x":4,"y":0},{"x":4,"y":2},{"x":2,"y":2}],[{"x":2,"y":0},{"x":5,"y":0},{"x":5,"y":3},{"x":2,"y":3}],[{"x":2,"y":1},{"x":3,"y":0},{"x":4,"y":1},{"x":3,"y":2}],[{"x":2,"y":1},{"x":3,"y":1},{"x":3,"y":2},{"x":2,"y":2}],[{"x":2,"y":1},{"x":4,"y":0},{"x":5,"y":2},{"x":3,"y":3}],[{"x":2,"y":1},{"x":4,"y":1},{"x":4,"y":3},{"x":2,"y":3}],[{"x":2,"y":1},{"x":5,"y":1},{"x":5,"y":4},{"x":2,"y":4}],[{"x":2,"y":2},{"x":3,"y":0},{"x":5,"y":1},{"x":4,"y":3}],[{"x":2,"y":2},{"x":3,"y":1},{"x":4,"y":2},{"x":3,"y":3}],[{"x":2,"y":2},{"x":3,"y":2},{"x":3,"y":3},{"x":2,"y":3}],[{"x":2,"y":2},{"x":4,"y":1},{"x":5,"y":3},{"x":3,"y":4}],[{"x":2,"y":2},{"x":4,"y":2},{"x":4,"y":4},{"x":2,"y":4}],[{"x":2,"y":2},{"x":5,"y":2},{"x":5,"y":5},{"x":2,"y":5}],[{"x":2,"y":3},{"x":3,"y":1},{"x":5,"y":2},{"x":4,"y":4}],[{"x":2,"y":3},{"x":3,"y":2},{"x":4,"y":3},{"x":3,"y":4}],[{"x":2,"y":3},{"x":3,"y":3},{"x":3,"y":4},{"x":2,"y":4}],[{"x":2,"y":3},{"x":4,"y":2},{"x":5,"y":4},{"x":3,"y":5}],[{"x":2,"y":3},{"x":4,"y":3},{"x":4,"y":5},{"x":2,"y":5}],[{"x":2,"y":4},{"x":3,"y":2},{"x":5,"y":3},{"x":4,"y":5}],[{"x":2,"y":4},{"x":3,"y":3},{"x":4,"y":4},{"x":3,"y":5}],[{"x":2,"y":4},{"x":3,"y":4},{"x":3,"y":5},{"x":2,"y":5}],[{"x":3,"y":0},{"x":4,"y":0},{"x":4,"y":1},{"x":3,"y":1}],[{"x":3,"y":0},{"x":5,"y":0},{"x":5,"y":2},{"x":3,"y":2}],[{"x":3,"y":1},{"x":4,"y":0},{"x":5,"y":1},{"x":4,"y":2}],[{"x":3,"y":1},{"x":4,"y":1},{"x":4,"y":2},{"x":3,"y":2}],[{"x":3,"y":1},{"x":5,"y":1},{"x":5,"y":3},{"x":3,"y":3}],[{"x":3,"y":2},{"x":4,"y":1},{"x":5,"y":2},{"x":4,"y":3}],[{"x":3,"y":2},{"x":4,"y":2},{"x":4,"y":3},{"x":3,"y":3}],[{"x":3,"y":2},{"x":5,"y":2},{"x":5,"y":4},{"x":3,"y":4}],[{"x":3,"y":3},{"x":4,"y":2},{"x":5,"y":3},{"x":4,"y":4}],[{"x":3,"y":3},{"x":4,"y":3},{"x":4,"y":4},{"x":3,"y":4}],[{"x":3,"y":3},{"x":5,"y":3},{"x":5,"y":5},{"x":3,"y":5}],[{"x":3,"y":4},{"x":4,"y":3},{"x":5,"y":4},{"x":4,"y":5}],[{"x":3,"y":4},{"x":4,"y":4},{"x":4,"y":5},{"x":3,"y":5}],[{"x":4,"y":0},{"x":5,"y":0},{"x":5,"y":1},{"x":4,"y":1}],[{"x":4,"y":1},{"x":5,"y":1},{"x":5,"y":2},{"x":4,"y":2}],[{"x":4,"y":2},{"x":5,"y":2},{"x":5,"y":3},{"x":4,"y":3}],[{"x":4,"y":3},{"x":5,"y":3},{"x":5,"y":4},{"x":4,"y":4}],[{"x":4,"y":4},{"x":5,"y":4},{"x":5,"y":5},{"x":4,"y":5}]];

function calculateAllSquares(inputInput, sqaure_groups, square_area_groups, inputTmp, inputTmpForArea, level)
{
    var i = 0, j = 0, k = 0, l = 0;

    // check input
    if( inputTmp.length >= 7 ) {
        sqaure_groups.push(inputTmp);
        square_area_groups.push(inputTmpForArea);
        console.log("out length: ", sqaure_groups.length);
        return;
    }
    if( inputInput.length == 0 ) {
        return;
    }
    //if( sqaure_groups.length >= 1000 ) {
    //    return;
    //}

    // loop input
    for( i=0; i<inputInput.length - (6-level); i++ ) {
        // for debug
        if( level <= 1 ) console.log("level: ", level, "i: ", i);
        
        // push a item
        var tmp = inputTmp.slice();
        tmp.push(inputInput[i]);

        // update area
        var tmpForArea = JSON.parse(JSON.stringify(inputTmpForArea));
        var area = (inputInput[i][0].x - inputInput[i][1].x)**2 + (inputInput[i][0].y - inputInput[i][1].y)**2;
        if( tmpForArea[area] === undefined ) tmpForArea[area] = [];
        tmpForArea[area].push(inputInput[i]);

        // prepare input
        var input = [];
        for( j=i+1; j<inputInput.length; j++ ) {
            if( inputInput[j][0].x == inputInput[i][0].x && inputInput[j][0].y == inputInput[i][0].y ) continue;
            if( inputInput[j][0].x == inputInput[i][1].x && inputInput[j][0].y == inputInput[i][1].y ) continue;
            if( inputInput[j][0].x == inputInput[i][2].x && inputInput[j][0].y == inputInput[i][2].y ) continue;
            if( inputInput[j][0].x == inputInput[i][3].x && inputInput[j][0].y == inputInput[i][3].y ) continue;
            if( inputInput[j][1].x == inputInput[i][0].x && inputInput[j][1].y == inputInput[i][0].y ) continue;
            if( inputInput[j][1].x == inputInput[i][1].x && inputInput[j][1].y == inputInput[i][1].y ) continue;
            if( inputInput[j][1].x == inputInput[i][2].x && inputInput[j][1].y == inputInput[i][2].y ) continue;
            if( inputInput[j][1].x == inputInput[i][3].x && inputInput[j][1].y == inputInput[i][3].y ) continue;
            if( inputInput[j][2].x == inputInput[i][0].x && inputInput[j][2].y == inputInput[i][0].y ) continue;
            if( inputInput[j][2].x == inputInput[i][1].x && inputInput[j][2].y == inputInput[i][1].y ) continue;
            if( inputInput[j][2].x == inputInput[i][2].x && inputInput[j][2].y == inputInput[i][2].y ) continue;
            if( inputInput[j][2].x == inputInput[i][3].x && inputInput[j][2].y == inputInput[i][3].y ) continue;
            if( inputInput[j][3].x == inputInput[i][0].x && inputInput[j][3].y == inputInput[i][0].y ) continue;
            if( inputInput[j][3].x == inputInput[i][1].x && inputInput[j][3].y == inputInput[i][1].y ) continue;
            if( inputInput[j][3].x == inputInput[i][2].x && inputInput[j][3].y == inputInput[i][2].y ) continue;
            if( inputInput[j][3].x == inputInput[i][3].x && inputInput[j][3].y == inputInput[i][3].y ) continue;
            input.push(inputInput[j]);
        }

        // recursive
        calculateAllSquares(input, sqaure_groups, square_area_groups, tmp, tmpForArea, level+1);
    }
}

export default class SevenSquaresPage extends React.Component {
    constructor(props) {
        super(props);

        var sqaure_groups = [];
        var square_area_groups = [];
        var tmp = [];
        var tmp_for_area = {};
        calculateAllSquares(sixBySixSquares, sqaure_groups, square_area_groups, tmp, tmp_for_area, 0);

        // states
        var default_width = 200;
        var points = calculatePoints(default_width, 6);
        this.state = {
            width: default_width,
            width_inc: (default_width - point_radius*2)/(6-1),
            n: 6,
            points: points,
            square_groups: sqaure_groups,
            square_area_groups: square_area_groups
        };

        // event handler
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleSubmit(event) {
        var points = calculatePoints(this.state.width, this.state.n);
        this.setState({width_inc: (this.state.width - point_radius*2) / (this.state.n - 1)});
        this.setState({points: points});
        event.preventDefault();
    }
    render() {
        var pageStyle = {
            padding: "20px 30px 50px 30px"
        };
        return (
            <div style={pageStyle}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Width:
                        <input type="text" name="width" value={this.state.width} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <label>Count: {this.state.square_groups.length}</label>
                {this.state.square_groups.map((square_group, square_group_index) => {
                    return (<div>
                        <label>{square_group_index + 1}</label><br />
                        Area Statistics (Area -> Count):
                        <ul>
                            {Object.keys(this.state.square_area_groups[square_group_index]).map((key) => {
                                return (<li key={"square_area_groups_" + key}>{key} -> {this.state.square_area_groups[square_group_index][key].length}</li>);
                            })}
                        </ul>
                        <svg width={this.state.width} height={this.state.width}>
                            {square_group.map((value, index) => {
                                var x1 = value[0].x*this.state.width_inc + point_radius;
                                var y1 = value[0].y*this.state.width_inc + point_radius;
                                var x2 = value[1].x*this.state.width_inc + point_radius;
                                var y2 = value[1].y*this.state.width_inc + point_radius;
                                return (
                                    <line key={"line_" + x1 + "_" + y1 + "_" + x2 + "_" + y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                                )
                            })}
                            {square_group.map((value, index) => {
                                var x1 = value[1].x*this.state.width_inc + point_radius;
                                var y1 = value[1].y*this.state.width_inc + point_radius;
                                var x2 = value[2].x*this.state.width_inc + point_radius;
                                var y2 = value[2].y*this.state.width_inc + point_radius;
                                return (
                                    <line key={"line_" + x1 + "_" + y1 + "_" + x2 + "_" + y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                                )
                            })}
                            {square_group.map((value, index) => {
                                var x1 = value[2].x*this.state.width_inc + point_radius;
                                var y1 = value[2].y*this.state.width_inc + point_radius;
                                var x2 = value[3].x*this.state.width_inc + point_radius;
                                var y2 = value[3].y*this.state.width_inc + point_radius;
                                return (
                                    <line key={"line_" + x1 + "_" + y1 + "_" + x2 + "_" + y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                                )
                            })}
                            {square_group.map((value, index) => {
                                var x1 = value[3].x*this.state.width_inc + point_radius;
                                var y1 = value[3].y*this.state.width_inc + point_radius;
                                var x2 = value[0].x*this.state.width_inc + point_radius;
                                var y2 = value[0].y*this.state.width_inc + point_radius;
                                return (
                                    <line key={"line_" + x1 + "_" + y1 + "_" + x2 + "_" + y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                                )
                            })}
                            {this.state.points.map((value, index) => {
                                var cx = value.x*this.state.width_inc + point_radius;
                                var cy = value.y*this.state.width_inc + point_radius;
                                var color = "red";
                                return (
                                    <circle key={"nxn_point_" + value.x + "_" + value.y} cx={cx} cy={cy} r={point_radius} fill={color} />
                                )
                            })}
                        </svg>
                    </div>)
                })}
            </div>
        )
    }
}