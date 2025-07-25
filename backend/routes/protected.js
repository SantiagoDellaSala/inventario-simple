const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, (req, res) => {
    res.json({
        message: `Hola ${req.user.email}, accediste a una ruta protegida.`,
        user: req.user,
    });
});

module.exports = router;
