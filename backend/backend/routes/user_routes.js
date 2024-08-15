import express, { Router } from "express"
import { signup, test,viewAdminRequests,AllRequests,userlisting,superadmindelete,acceptrequest, declinerequest, signin, user, bankdetail, updateUser, deleteUser, signout} from "../controllers/user_controller.js";
import { verifyToken } from "../utils/verifyUser.js";


const router=express.Router();

router.get('/test',test);
router.post('/signup',signup);
router.post('/signin',signin);
// router.post('/requestadmin',requestadmin)
 router.get('/superadminlisting',viewAdminRequests);
 router.get('/superadminalllisting',AllRequests);
 router.get('/superadminuserlisting',userlisting);
 router.post('/delete',superadmindelete)
 router.post('/accept',acceptrequest)
 router.post('/decline',declinerequest)
 router.post('/bankdetail',bankdetail)
 router.get('/:id',user)
 router.post('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser)
router.post('/signout',signout)
// router.post('/approve-admin',approveAdmin);
// router.post('/deny-admin', denyadmin);
//,viewAdminRequests,approveAdmin,denyadmin, requestadmin 
export default router;