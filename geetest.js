require('dotenv').config()
const Geetest = require('gt3-sdk')
const slide = new Geetest({
    geetest_id: process.env.geetest_id,
    geetest_key: process.env.geetest_key
})

module.exports = (app) => {
    app.get("/gt/register-slide", function (req, res) {
        slide.register(null, function (err, data) {
            if (err) {
                console.error(err)
                res.status(500)
                res.send(err)
                return
            }
    
            if (!data.success) {
                req.session.failback = true
                res.send(data)
            } else {
                req.session.failback = false
                res.send(data)
            }
        })
    })

    app.post("/gt/validate-slide", function (req, res) {
        slide.validate(req.session.failback, {
            geetest_challenge: req.body.geetest_challenge,
            geetest_validate: req.body.geetest_validate,
            geetest_seccode: req.body.geetest_seccode
        }, function (err, success) {
    
            if (err) {
                res.send({
                    status: "error",
                    info: err
                })
    
            } else if (!success) {
                res.send({
                    status: "fail",
                    info: '登录失败'
                })
            } else {
                res.send({
                    status: "success",
                    info: '登录成功'
                })
            }
        })
    })
}