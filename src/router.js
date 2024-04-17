const setPrototypeOf=require('setprototypeof')
const Route=require("./route")
const Layer=require("./Layer")
// const setPrototypeOf = require('setprototypeof')

let proto=module.exports=function(options){
    let opts=options|| {}

    function router(req,res,next){
        router.handle(req,res,next)
    }

    setPrototypeOf(router,proto)


    router.params={};
    router._params=[];
    router.caseSensiitive=opts.caseSensiitive;
    router.mergeParams=opts.mergeParams;
    router.strict=opts.strict;
    router.stack=[];

    return router;
}

proto.route=function route(path){
    let route=new Route(path)

    let layer=new Layer(path,{},route.dispatch.bind(route))

    layer.route=route;
    this.stack.push(layer);

    return route;
}

proto.handle=function handle(req,res,out){
    let self=this;
    let stack=self.stack;
    let layer=stack[0];
    let route=layer.route;
    route.stack[0].handle_request(req,res);
}