import React from 'react';
import { calculate_points, rotate_vector, compare_point } from './util.js'
import { default_width, default_n, point_radius, stroke_width } from "./util.js"

export default class PinBoardPage extends React.Component {
    constructor(props) {
        super(props);

        // states
        var points = calculate_points(default_width, default_n);
        this.state = {
            width: default_width,
            width_inc: (default_width - point_radius*2)/(default_n-1),
            n: default_n,
            points: points,
            first_click_point: null,
            lines: [],
            mouse_over_x: null,
            mouse_over_y: null
        };

        // event handler
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleSubmit(event) {
        var points = calculate_points(this.state.width, this.state.n);
        this.setState({width_inc: (this.state.width - point_radius*2) / (this.state.n - 1)});
        this.setState({points: points});
        event.preventDefault();
    }
    handleClick(x, y, event) {
        var point = {x: x, y: y};

        // check if don't have first click point, just store it
        if( this.state.first_click_point == null ) {
            this.setState({first_click_point: point});
            return;
        }

        // already have first point, generate the line
        var p1 = this.state.first_click_point, p2 = {x: x, y: y};
        var line = [p1, p2];
        if( (p1.x > p2.x) || (p1.x == p2.x && p1.y > p2.y) ) {
            line = [p2, p1];
        }

        // check if already have this line
        var i = 0;
        var lines = this.state.lines;
        for( i=0; i<lines.length; i++ ) {
            if( lines[i][0].x == line[0].x && lines[i][0].y == line[0].y &&
                lines[i][1].x == line[1].x && lines[i][1].y == line[1].y )
                return;
        }

        // add this line
        lines.push(line);
        this.setState({lines: lines});

        // reset temp line
        this.setState({first_click_point: null});
        this.setState({mouse_over_x: null});
        this.setState({mouse_over_y: null});
    }
    handleMouseMove(event) {
        // only need to track when have clicked
        if( this.state.first_click_point == null )  return;

        // update state
        var parentRect = document.getElementById('pinboard_svg').getBoundingClientRect();
        this.setState({mouse_over_x: event.pageX - parentRect.left});
        this.setState({mouse_over_y: event.pageY - parentRect.top});
    }
    render() {
        var pageStyle = {
            padding: "20px 30px 50px 30px"
        };
    
        let temp_line = null;
        if( this.state.first_click_point != null && this.state.mouse_over_x != null && this.state.mouse_over_y != null ) {
            var x1 = this.state.first_click_point.x*this.state.width_inc + point_radius;
            var y1 = this.state.first_click_point.y*this.state.width_inc + point_radius;
            var x2 = this.state.mouse_over_x;
            var y2 = this.state.mouse_over_y;
            temp_line = <line key="line_temp" x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />;
        } else {
            temp_line = null;
        }

        return (
            <div style={pageStyle}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Width:
                        <input type="text" name="width" value={this.state.width} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        N:
                        <input type="text" name="n" value={this.state.n} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <svg id="pinboard_svg" width={this.state.width} height={this.state.width} onMouseMove={this.handleMouseMove}>
                    {temp_line}
                    {this.state.lines.map((value, index) => {
                        var x1 = value[0].x*this.state.width_inc + point_radius;
                        var y1 = value[0].y*this.state.width_inc + point_radius;
                        var x2 = value[1].x*this.state.width_inc + point_radius;
                        var y2 = value[1].y*this.state.width_inc + point_radius;
                        return (
                            <line key={"line_" + x1 + "_" + y1 + "_" + x2 + "_" + y2} x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                        )
                    })}
                    {this.state.points.map((value, index) => {
                        var cx = value.x*this.state.width_inc + point_radius;
                        var cy = value.y*this.state.width_inc + point_radius;
                        var handleClick = this.handleClick.bind(this, value.x, value.y);
                        var color = "red";
                        return (
                            <circle key={"pinboard_point_" + value.x + "_" + value.y} cx={cx} cy={cy} r={point_radius} fill={color} onClick={handleClick} />
                        )
                    })}                
                </svg>
            </div>
        )
    }
}