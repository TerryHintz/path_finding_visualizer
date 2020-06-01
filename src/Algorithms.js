export function dfs(grid, start, end) {
    let gridCopy = grid;
    let x = start.startX;
    let y = start.startY;
    const endX = end.endX;
    const endY = end.endY;
    const xMax = grid[0].length - 1;
    const yMax = grid.length - 1;

    let trail = [];
    let search = [];

    while(x !== endX || y !== endY){
        search.push({x, y});
        let priority = getPriority(x, y, endX, endY);
        while(priority.length){
            if(priority[0] === 'left'){
                if(x > 0){
                    if(gridCopy[y][x-1] === 0 || gridCopy[y][x-1] === 'e'){
                        trail.push({x, y});
                        gridCopy[y][x-1] = 'v';
                        x = x - 1;
                        break;
                    }
                }
            } else if(priority[0] === 'up'){
                if(y > 0){
                    if(gridCopy[y-1][x] === 0 || gridCopy[y-1][x] === 'e'){
                        trail.push({x, y});
                        gridCopy[y-1][x] = 'v';
                        y = y - 1;
                        break;
                    }
                }
            } else if(priority[0] === 'right'){
                if(x < xMax){
                    if(gridCopy[y][x+1] === 0 || gridCopy[y][x+1] === 'e'){
                        trail.push({x, y});
                        gridCopy[y][x+1] = 'v';
                        x = x + 1;
                        break;
                    }
                }
            } else if(priority[0] === 'down'){
                if(y < yMax){
                    if(gridCopy[y+1][x] === 0 || gridCopy[y+1][x] === 'e'){
                        trail.push({x, y});
                        gridCopy[y+1][x] = 'v';
                        y = y + 1;
                        break;
                    }
                }
            }
            priority.shift();
        }
        if(priority.length === 0){
            if(trail.length === 0){
                console.log('no path');
                return [[], search, xMax + 1];
            }
            let prev = trail.pop();
            if(prev.x === x && prev.y === y){
                prev = trail.pop();
            }
            x = prev.x;
            y = prev.y;
        }
    }
    gridCopy[endY][endX] = 'e';
    trail.push({x, y});
    search.push({x, y});
    console.log('found exit at ' + x + ', ' + y);
    return [trail, search, xMax + 1];
}

function getPriority(x, y, endX, endY){
    let horizontal = x - endX;
    let vertical = y - endY;
    let horizontalPriority = false;
    let left;
    let up;

    if(Math.abs(horizontal) >= Math.abs(vertical)){
        horizontalPriority = true;
    }

    if(horizontal > 0){
        left = true;
    } else {
        left = false;
    }

    if(vertical > 0){
        up = true;
    } else {
        up = false;
    }

    if(horizontalPriority){
        if(up && left){
            return ['left', 'up', 'right', 'down'];
        } else if (up && !left){
            return ['right', 'up', 'left', 'down'];
        } else if (!up && left){
            return ['left', 'down', 'right', 'up'];
        } else {
            return ['right', 'down', 'left', 'up'];
        }
    } else {
        if(up && left){
            return ['up', 'left', 'down', 'right'];
        } else if (up && !left){
            return ['up', 'right', 'down', 'left'];
        } else if (!up && left){
            return ['down', 'left', 'up', 'right'];
        } else {
            return ['down', 'right', 'up', 'left'];
        }
    }
}

export function bfs(grid, start, end){
    let gridCopy = grid;
    const endX = end.endX;
    const endY = end.endY;
    const xMax = grid[0].length - 1;
    const yMax = grid.length - 1;

    let queue = [];
    let search = [];

    queue.push({x: start.startX, y: start.startY, distance: 0, prev: null});
    // trail.push({x, y, distance: 0, prev: null});

    while(queue.length){
        let current = queue.shift();
        const x = current.x;
        const y = current.y;
        let distance = current.distance;
        
        console.log(x + ', ' + y + ', D=' + distance);

        // left
        if(x > 0){
            if(gridCopy[y][x-1] === 0){
                gridCopy[y][x-1] = 'v';
                queue.push({x: x-1, y: y, distance: distance + 1, prev: current});
                search.push({x: x-1, y: y, distance: distance + 1, prev: current});
            } else if(gridCopy[y][x-1] === 'e') {
                search.push({x: x-1, y: y, distance: distance + 1, prev: current});
                const trail = breadthTrail(search);
                return [trail, search, xMax + 1];
            }
        }
        // up
        if(y > 0){
            if(gridCopy[y-1][x] === 0){
                gridCopy[y-1][x] = 'v';
                queue.push({x: x, y: y-1, distance: distance + 1, prev: current});
                search.push({x: x, y: y-1, distance: distance + 1, prev: current});
            } else if(gridCopy[y-1][x] === 'e') {
                search.push({x: x, y: y-1, distance: distance + 1, prev: current});
                const trail = breadthTrail(search);
                return [trail, search, xMax + 1];
            }
        }
        // right
        if(x < xMax){
            if(gridCopy[y][x+1] === 0){
                gridCopy[y][x+1] = 'v';
                queue.push({x: x+1, y: y, distance: distance + 1, prev: current});
                search.push({x: x+1, y: y, distance: distance + 1, prev: current});
            } else if(gridCopy[y][x+1] === 'e') {
                search.push({x: x+1, y: y, distance: distance + 1, prev: current});
                const trail = breadthTrail(search);
                return [trail, search, xMax + 1];
            }
        }
        // down
        if(y < yMax){
            if(gridCopy[y+1][x] === 0){
                gridCopy[y+1][x] = 'v';
                queue.push({x: x, y: y+1, distance: distance + 1, prev: current});
                search.push({x: x, y: y+1, distance: distance + 1, prev: current});
            } else if(gridCopy[y+1][x] === 'e') {
                search.push({x: x, y: y+1, distance: distance + 1, prev: current});
                const trail = breadthTrail(search);
                return [trail, search, xMax + 1];
            }
        }
    }
    return [[], search, xMax + 1];
}

function breadthTrail(search){
    let trail = [];
    const len = search.length;
    let tail = search[len - 1];
    trail.push(tail);
    while(tail.prev){
        tail = tail.prev;
        trail.push(tail);
    }
    trail.reverse();
    return trail;
}