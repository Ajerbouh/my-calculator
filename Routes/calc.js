const {InfixtoPostfix, calcRPN} = require('../Repository/calcRepository');

module.exports = function (app) {
    app.post('/', async function(req, res)  {
        try {
            let body = req.body.expression;
            if (!body) {
                throw new Error('Need expression to evaluate : "expression" : "<the-expression-to-evaluate>"');
            }
            const data = await InfixtoPostfix(body);
            const result = await calcRPN(data);


            if (!data) {
                throw new Error('infix to postfix conversion impossible');
            }
            if (!data) {
                throw new Error('Impossible to evaluate expression');
            }
            res.status(200);
            res.send(`${result}`);

        } catch (err) {
            res.status(500);
            res.send(err.message)
        }

    })
}