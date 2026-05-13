const logger=(req,res,next)=>{

    console.log(`method is ${req.method} url is ${req.url}`)

    next()
}

export default logger;