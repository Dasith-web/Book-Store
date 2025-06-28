import { Router } from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/admin/dashboard', verifyToken, verifyAdmin,
  (_, res) => res.json({ message: 'Admin Dashboard' })
);

router.get('/user/dashboard', verifyToken,
  (req, res) => res.json({ message: `User Dashboard for ${req.user.userId}` })
);

export default router;
