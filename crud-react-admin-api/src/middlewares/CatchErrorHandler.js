module.exports = (error, req, res, next) => {
    if(error) {
        return res.send(error).status(400);
    } else{
        next()
    }
}