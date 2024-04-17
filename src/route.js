
const methods=require('methods')
const flaten=require('array-flatten')
const Layer=require("./Layer")


class Route {
    constructor(path) {
        this.path = path;
        this.stack = [];

        this.methods = {};
    }
    dispatch(req, res, done) {
    }
}




methods.forEach(function(method){
    let handles=flaten.flatten(Array.prototype.slic.call(arguments));
    for(let i=0;i<handles.length;i++){
        let handle=handles[i];

        if(typeof handle !== 'function'){
            let type=toString.call(handle);
            let msg=`Route.` + method + `() require a callback function but got a ` + type
        
            throw new Error(msg)

        }
        let layer=Layer('/',{},handle);
        layer.method=method;

        this.methods[method]=true;
        this.stack.push(layer);
    
    }

    return this;

    
})

module.exports=Route;
