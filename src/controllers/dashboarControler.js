module.exports = {
    dashboard: async (req, res) => {
        res.render('/dashboard',{'title':'Dashboard'});
    }
}