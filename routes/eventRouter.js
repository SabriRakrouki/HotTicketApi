const router = require('express').Router();

const eventController = require('../conrollers/eventController');
const { Role } = require('../helper/role');
const { auth, authAdmin, authRole } = require('../middelWare/authentification')
const { canViewEvent } = require('../middelWare/permissions')
router.post('/addEvent', auth, authRole([Role.ADMIN, Role.EventProvider]), eventController.addEvent)
router.post('/deleteEvent', auth, authRole([Role.ADMIN, Role.EventProvider]), eventController.deleteEvent)
router.post('/updateEvent', auth, authRole([Role.ADMIN, Role.EventProvider]), eventController.updateEvent)
router.post('/gellAllEvent', eventController.getAllEvent)
router.get('/getEventById:idEvent', auth, authRole([Role.ADMIN, Role.EventProvider]), authGetEvent, eventController.getEventById)




function authGetEvent(req, res, next) {
    if (!canViewEvent(req.user, req.eventNeeded)) {
        res.status(401);
        return res.send('Not Allowed')
    }
    next()
}
module.exports = router;