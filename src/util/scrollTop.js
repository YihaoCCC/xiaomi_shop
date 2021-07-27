export function debonce(fn,delay){
        let time=null;
        return function () {
            if (time){
                clearTimeout(time)
                time = setTimeout(fn,delay)
            }
            else{
                time =setTimeout(fn,delay)
            }
        }
}