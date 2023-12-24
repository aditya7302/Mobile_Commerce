const testController = async (req,res) => {
    try{
        console.log('This is a test route');
        res.status(200).send({
            success: true,
            message:'This is a test route'
        })
    }catch(error){
        console.log('There was a error in test router'.bgRed.black);
        res.status(500).send({
            success: false,
            message:'There was a error in test router',
            error
        })
    }
}

module.exports = {testController}