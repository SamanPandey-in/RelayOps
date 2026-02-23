// ============================================================================
// SERVER ENTRY POINT
// ============================================================================

import app from './src/app.js';
import config from './src/config/index.js';
import { logger } from './src/config/logger.js';
import { testConnection } from './src/config/database.js';

const startServer = async () => {
  // Test database connection
  const dbConnected = await testConnection();
  if (!dbConnected) {
    logger.error('Failed to connect to database. Exiting...');
    process.exit(1);
  }

  // Start server
  const server = app.listen(config.PORT, () => {
    logger.info(`🚀 Server running on port ${config.PORT}`);
    logger.info(`📚 API available at http://localhost:${config.PORT}/api`);
    logger.info(`🏥 Health check at http://localhost:${config.PORT}/health`);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    
    server.close(async () => {
      logger.info('HTTP server closed');
      
      // Close database connection
      try {
        const { prisma } = await import('./src/config/database.js');
        await prisma.$disconnect();
        logger.info('Database connection closed');
      } catch (err) {
        logger.error('Error closing database:', err);
      }
      
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer();
