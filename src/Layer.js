function Layer(options,path,fn){
    if(!(this instanceof Layer)){
        return new Layer(path,options.fn);
    }
    this.handle=fn;
    this.name=fn.name|| `<anonymous>`;
    this.params=undefined;
    this.path=undefined;

}

Layer.prototype.match=function match(path){
    return this.route.path===path;
}

Layer.prototype.handle_request=function handle(req,res,next){
    let fn=this.handle;
    try{
        fn(req,res,next)
    }catch(error){
        console.log(error)
        return new Error("failed to handle request")
    }

}

module.exports=Layer;