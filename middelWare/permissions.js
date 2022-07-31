const { Role } = require('../helper/role')
const canViewEvent = (user, eventNeeded) => {
    return ((user.role === Role.ADMIN || user.role === Role.EventProvider) && (eventNeeded.userID == user.id))
}
