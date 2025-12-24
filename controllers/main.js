
const mainRouter = async (req, res) => {
    try {
        res.render('index', {title: 'Home Page'});  
    }
    catch (error) {
        console.log(error);
    }
};

const aboutrouter = async (req,res) => {
    res.render('about', {title: 'About Page'});
}
module.exports = { mainRouter, aboutrouter };