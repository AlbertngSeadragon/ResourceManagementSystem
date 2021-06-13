module.exports = (req, res, next) => {
    //res.set('Content-Range', 'posts 0-25/50');
    res.set({
        'Access-Control-Expose-Headers': 'Content-Range',
        'Content-Range': 'posts 0-25/50',
        'X-Total-Count': '50'
      })
    next()
}