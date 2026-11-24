import { Router } from 'express';
import { ADMIN_ROLES } from '../../../../shared/constants.js';
import { requireAuth, requireRole } from '../auth/auth.middleware.js';
import { adminUsersController } from './adminUsers.controller.js';

export function createAdminUsersRouter() {
  const router = Router();

  router.use(requireAuth, requireRole(ADMIN_ROLES.SUPER_ADMIN));

  router.get('/users', adminUsersController.listUsers);
  router.patch('/users/:id', adminUsersController.updateUser);
  router.delete('/users/:id', adminUsersController.deleteUser);

  router.get('/invitations', adminUsersController.listInvitations);
  router.post('/invitations', adminUsersController.createInvitation);
  router.patch('/invitations/:id/revoke', adminUsersController.revokeInvitation);

  return router;
}
