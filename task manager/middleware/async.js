const asyncWrapper = (fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}
// this can be done to all the controllers with some tweaks

module.exports = asyncWrapper