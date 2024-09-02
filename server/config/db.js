const mongoose =require('mongoose')


function    connects(){

    mongoose.connect('mongodb://localhost:27017/Exam_Evaluvation_System')
    .then(()=>
        console.log('Server is Online!'))
    .catch((error)=>{console.log(error)})
}

module.exports = connects
    