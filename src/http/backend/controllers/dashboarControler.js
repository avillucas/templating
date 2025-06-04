module.exports = {
    dashboard: async (req, res) => {
        res.render('dashboard.ejs',{'title':'Dashboard'});
    }
}