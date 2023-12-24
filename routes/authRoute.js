const express = require('express');


const { registerUserController, loginUserController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { testController } = require('../controllers/testController');

const router = express.Router();

//register user
router.post('/user/register',registerUserController);

//login user
router.post('/user/login', loginUserController);

//test router for require sign in and is admin
router.get('/test',requireSignIn,isAdmin,testController)

//protected user
router.get('/user-auth',requireSignIn,(req,res) => {
    res.status(200).send({
        ok: true
    });
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports = router;