import express from "express"
import { availableticketname, checkticket, countallTicket, countavailableallTicket, countavailableTicket, countexpiryallTicket, countexpiryTicket, countsoldoutallTicket, countsoldoutTicket, countTicket, createfeedback, createticket, deleteTicket, detailticket, detailticketbyticketid, editticket, Expiryticketname, getAllTickets, getavailableticket, getexpiryticket, getfeedback, getsoldoutticket, getTickets, latestticket, purchasedetail, purchasedetailone, purchaseTicket, soldticketname, sportwise, test, totalticketname, usermyticket } from "../controllers/ticket_controller.js";

const router=express.Router();

router.get('/tickettest',test);
router.post('/createticket',createticket);
router.post('/deleteticket',deleteTicket);
router.get('/countticket/:id',countTicket);
router.get('/countsoldoutticket/:id',countsoldoutTicket);
router.get('/countavailableticket/:id',countavailableTicket);
router.get('/countexpiryticket/:id',countexpiryTicket);
router.get('/detailticket/:id',detailticket);
router.post('/purchase',purchaseTicket);
router.get('/purchasedetail/:id',purchasedetail);
router.post('/purchasedetailone/:id',purchasedetailone);
router.post('/detailticketone',detailticketbyticketid);
router.get('/:ticketId/feedback/:userId', getfeedback);
router.post('/feedback', createfeedback);
router.get('/totalticketname/:id',totalticketname)
router.get('/availableticketname/:id',availableticketname)
router.get('/soldoutticketname/:id',soldticketname)
router.get('/expiryticketname/:id',Expiryticketname)
router.get('/superadmintotalticketname',getAllTickets)
router.get('/superadminavailableticketname',getavailableticket)
router.get('/superadminexpiryticketname',getexpiryticket)
router.get('/superadminsoldoutticketname',getsoldoutticket)
router.get('/countallticket',countallTicket);
router.get('/countallsoldoutticket',countsoldoutallTicket);
router.get('/countallavailableticket',countavailableallTicket);
router.get('/countallexpiryticket',countexpiryallTicket);
router.get('/latestticket',latestticket)
router.get('/ticketsportwise/:category',sportwise)
router.get('/check-purchase/:ticketId/:userId',checkticket)
router.get('/:userId/tickets',usermyticket)
router.get('/get',getTickets)
router.post('/editticket/:id',editticket)
export default router;


