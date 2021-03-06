export const default_width = 400;
export const default_n = 4;
export const point_radius = 5;
export const stroke_width = 2;

export function calculatePoints(width, n)
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

export function rotateVector(vec, ang)
{
    ang = -ang * (Math.PI/180);
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return new Array(Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000, Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000);
}

export function comparePoint(a, b)
{
    if(a.x < b.x) return -1;
    if(a.x > b.x) return 1;
    if(a.y < b.y) return -1;
    if(a.y > b.y) return 1;
    return 0;
}

export function indexOfPointInList(points, x, y) {
    var i = 0;
    var points_length = points.length;
    for(i=0; i<points_length; i++ ) {
        if( points[i].x == x && points[i].y == y ) {
            return i;
        }
    }
    return -1;
}