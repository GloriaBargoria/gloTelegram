const {Router} = require('express')
const router = Router()
const {getTelegramLogin, getTelegramOtp, resendCode, serversideLogin} = require('../controller/telegramController')
const { createGroup, joinChannel, addChatUser, createChat, getAllGroups, getGroupById, getNearbyGroups } = require('../controller/groupControllers')

router.post("/", getTelegramLogin)
router.post("/verify-otp", getTelegramOtp)
router.post("/server-login", serversideLogin)
router.post("/create-group", createGroup)
router.post("/resend-otp", resendCode)
router.post("/join-channel", joinChannel)
router.post("/add-user", addChatUser)
router.post("/create-chat", createChat)
router.get("/groups", getAllGroups)
router.get("/nearby-groups", getNearbyGroups)
router.get("/groups/:channelId", getGroupById)

module.exports = router;