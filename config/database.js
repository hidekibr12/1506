const mongoose = require ('mongoose')

const conn = async()=>{
    //mongoAtlas
    const atlas = await mongoose.connect('mongodb+srv://userNovo:senha4567@fiaptecnico.6rxza.mongodb.net/todo_list')
   
}
 
module.exports = conn    