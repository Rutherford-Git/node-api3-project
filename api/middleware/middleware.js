const user = require('../users/users-model')

function logger(req, res, next) {
  let timestamp = new Date().toLocaleString()
  let method = req.method
  let url = req.originalUrl
  console.log(timestamp, method, url)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
    try{
        const users = await user.getById(req.params.id)
        if (!users){
            res.status(404).json({
                message: "user not found"
            })
        }else{
            req.user = users;
            next()
        }
    }catch (err){
        res.status(500).json({
            message: "error finding user"
        })
    }

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || !name.trim()){
    res.status(400).json({
      message: "missing required name field"
    })
}else{
    req.text = text.trim()
    next()
}
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text || !text.trim()){
      res.status(400).json({
        message: "missing required text field"
      })
  }else{
      req.text = text.trim()
      next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
    validatePost, 
    validateUser, 
    validateUserId, 
    logger}