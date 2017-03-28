import React from 'react';
import ReactDOM from 'react-dom';
import {Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle} from 'react-shapes';

const default_width = 400;
const default_n = 4;
const point_radius = 5;
const stroke_width = 2;

function calculate_points(width, n)
{
    var i=0, j=0;
    var points = [];
    var available_width = width - point_radius*2;
    var width_inc = available_width / (n-1);
    for( i=0; i<n; i++ ) {
        for( j=0; j<n; j++ ) {
            points.push({x: i, y: j});
        }
    }
    return points;
}

function rotate_vector(vec, ang)
{
    ang = -ang * (Math.PI/180);
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return new Array(Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000, Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000);
}

function compare_point(a, b)
{
    if(a.x < b.x) return -1;
    if(a.x > b.x) return 1;
    if(a.y < b.y) return -1;
    if(a.y > b.y) return 1;
    return 0;
}

function calculate_squares(points)
{
    var i=0, j=0, k=0;
    var original_vec = [0, 0];
    var rotated_vec = [0, 0];
    var squares = [];
    var number_of_points = points.length;
    var max_x = points[number_of_points -1].x;
    var max_y = points[number_of_points -1].y;
    for( i=0; i<number_of_points-1; i++ ) {
        for( j=i+1; j<number_of_points; j++ ){
            var square_obj = [];

            // get 2 points first
            square_obj.push({x: points[i].x, y: points[i].y});
            square_obj.push({x: points[j].x, y: points[j].y});
            
            // calculate vector
            original_vec = [points[j].x - points[i].x, points[j].y - points[i].y];

            // calculate point 3
            rotated_vec = rotate_vector(original_vec, -90.0);
            square_obj.push({x: points[j].x + rotated_vec[0], y: points[j].y + rotated_vec[1]});
            if( square_obj[2].x > max_x ||
                square_obj[2].x < 0 ||
                square_obj[2].y > max_y ||
                square_obj[2].y < 0 ) continue;

            // calculate point 4
            rotated_vec = rotate_vector(original_vec, -180.0);
            square_obj.push({x: square_obj[2].x + rotated_vec[0], y: square_obj[2].y + rotated_vec[1]});
            if( square_obj[3].x > max_x || 
                square_obj[3].x  < 0 ||
                square_obj[3].y > max_y ||
                square_obj[3].y < 0 ) continue;

            // normalize square_obj
            var min_index = 0;
            for( k=1; k<4; k++ ) {
                if( square_obj[k].x < square_obj[min_index].x ) {
                    min_index = k;
                    continue;
                } else if( square_obj[k].x > square_obj[min_index].x ) continue;
                if( square_obj[k].y < square_obj[min_index].y ) min_index = k;
            }
            if( min_index > 0 ) {
                var first_half = square_obj.slice(0, min_index);
                var second_half = square_obj.slice(min_index);
                square_obj = second_half;
                first_half.map(function(value) {
                    square_obj.push(value);
                });
            }

            // check duplicate
            var is_duplicate = false;
            for( k=0; k<squares.length; k++ ) {
                if( square_obj[0].x != squares[k][0].x || square_obj[0].y != squares[k][0].y ) continue;
                if( square_obj[1].x != squares[k][1].x || square_obj[1].y != squares[k][1].y ) continue;
                if( square_obj[2].x != squares[k][2].x || square_obj[2].y != squares[k][2].y ) continue;
                if( square_obj[3].x != squares[k][3].x || square_obj[3].y != squares[k][3].y ) continue;
                is_duplicate = true;
                break;
            }

            // append if not duplicate
            if( !is_duplicate ) squares.push(square_obj);
        }
    }
    return squares;
}

function calulate_squares_statistics(squares)
{
    var i = 0;
    var squares_statics_obj = {};
    var area = 0;
    for( i=0; i<squares.length; i++ ) {
        area = (squares[i][0].x - squares[i][1].x)**2 + (squares[i][0].y - squares[i][1].y)**2;
        if( isNaN(squares_statics_obj[area]) ) squares_statics_obj[area] = 0;
        squares_statics_obj[area] += 1;
    }
    return squares_statics_obj;
}

class App extends React.Component
{
    constructor(props) {
        super(props);

        // states
        var points = calculate_points(default_width, default_n);
        var squares = calculate_squares(points);
        var squares_statistics = calulate_squares_statistics(squares);
        this.state = {
            width: default_width,
            width_inc: (default_width - point_radius*2)/(default_n-1),
            n: default_n,
            points: points,
            squares: squares,
            squares_statistics: squares_statistics
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
        var points = calculate_points(this.state.width, this.state.n);
        var squares = calculate_squares(points);
        var squares_statistics = calulate_squares_statistics(squares);
        this.setState({width_inc: (this.state.width - point_radius*2) / (this.state.n - 1)});
        this.setState({points: points});
        this.setState({squares: squares});
        this.setState({squares_statistics: squares_statistics});
        event.preventDefault();
    }
    render() {
        var style = {
            padding: "50px 30px 50px 80px"
        };
        return (
            <div style={style}>
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
                <div>
                    Number of Squares: {this.state.squares.length}
                </div>
                <div>
                    Area Statistics (Area -> Count):
                    <ul>
                        {Object.keys(this.state.squares_statistics).map((key) => {
                            return (<li>{key} -> {this.state.squares_statistics[key]}</li>);
                        })}
                    </ul>
                </div>             
                <svg width={this.state.width} height={this.state.width}>
                    {this.state.points.map((value, index) => {
                        var cx = value.x*this.state.width_inc + point_radius;
                        var cy = value.y*this.state.width_inc + point_radius;
                        return (
                            <circle cx={cx} cy={cy} r={point_radius} fill="red" />
                        )
                    })}
                    {this.state.squares.map((value, index) => {
                        var x1 = value[0].x*this.state.width_inc + point_radius;
                        var y1 = value[0].y*this.state.width_inc + point_radius;
                        var x2 = value[1].x*this.state.width_inc + point_radius;
                        var y2 = value[1].y*this.state.width_inc + point_radius;
                        return (
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                        )
                    })}
                    {this.state.squares.map((value, index) => {
                        var x1 = value[1].x*this.state.width_inc + point_radius;
                        var y1 = value[1].y*this.state.width_inc + point_radius;
                        var x2 = value[2].x*this.state.width_inc + point_radius;
                        var y2 = value[2].y*this.state.width_inc + point_radius;
                        return (
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                        )
                    })}
                    {this.state.squares.map((value, index) => {
                        var x1 = value[2].x*this.state.width_inc + point_radius;
                        var y1 = value[2].y*this.state.width_inc + point_radius;
                        var x2 = value[3].x*this.state.width_inc + point_radius;
                        var y2 = value[3].y*this.state.width_inc + point_radius;
                        return (
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                        )
                    })}
                    {this.state.squares.map((value, index) => {
                        var x1 = value[3].x*this.state.width_inc + point_radius;
                        var y1 = value[3].y*this.state.width_inc + point_radius;
                        var x2 = value[0].x*this.state.width_inc + point_radius;
                        var y2 = value[0].y*this.state.width_inc + point_radius;
                        return (
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth={stroke_width} />
                        )
                    })}
                </svg>
            </div>
        )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));