export function dfs(grid, start, end) {
    let gridCopy = grid;
    let x = start.startX;
    let y = start.startY;
    const endX = end.endX;
    const endY = end.endY;

    // while(x != endX && y != endY){
        console.log(getPriority(x, y, endX, endY));
    // }
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