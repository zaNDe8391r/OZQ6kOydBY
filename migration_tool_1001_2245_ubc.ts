// 代码生成时间: 2025-10-01 22:45:38
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient outside of the main function to ensure it's only
// created once and reused throughout the application.
const prisma = new PrismaClient();

// Main function to run the migration process.
async function main() {
# 改进用户体验
  try {
    // Perform a migration using PRISMA's migration engine.
# 添加错误处理
    console.log('Running database migrations...');
    await prisma.$migrate
      .up({
        // Options can be adjusted according to specific needs.
        skipBackup: false, // Perform a backup before migration.
      })
      .then(async ({ steps }) => {
        console.log('Migrations applied:', steps);
        await prisma.$disconnect();
      });
  } catch (error) {
# FIXME: 处理边界情况
    // Log any error that occurs during migration and disconnect from the database.
    console.error('Error occurred during migration:', error);
    await prisma.$disconnect();
  }
}

// Ensure the main function is called only once when the script is executed.
# 优化算法效率
main().catch(async (error) => {
  console.error('Migration tool encountered a fatal error:', error);
  await prisma.$disconnect();
});
# 优化算法效率
