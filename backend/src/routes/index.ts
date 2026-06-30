import { Router } from 'express';
import authRoutes from './auth.routes';
import problemsRoutes from './problems.routes';
import contestsRoutes from './contests.routes';
import notesRoutes from './notes.routes';
import geminiRoutes from './gemini.routes';
import adminRoutes from './admin.routes';

const apiRouter = Router();

// Combine all route groups
apiRouter.use(authRoutes);
apiRouter.use(problemsRoutes);
apiRouter.use(contestsRoutes);
apiRouter.use(notesRoutes);
apiRouter.use(geminiRoutes);
apiRouter.use(adminRoutes);

export default apiRouter;
