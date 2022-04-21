//logic section

const renderHomePage = (req, res) => {
    res.render('home')
};

const renderSmoothiePage = (req, res) => {
    res.render('smoothies')
}

//exporting section
module.exports = {
    renderHomePage,
    renderSmoothiePage
}