
const mainRouter = async (req, res) => {
    try {
        
        res.send('Hello from main route');
    }
    catch (error) {
        console.log(error);
    }
    
};

module.exports = {mainRouter};