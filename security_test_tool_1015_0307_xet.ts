// 代码生成时间: 2025-10-15 03:07:19
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcrypt';

// 定义 Prisma 的客户端实例
const prisma = new PrismaClient();

// 安全测试工具类
class SecurityTestTool {
  // 哈希密码
  async hashPassword(password: string): Promise<string> {
    try {
      const hashedPassword = await hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw new Error('Failed to hash password: ' + error.message);
    }
  }

  // 验证密码
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const isValid = await compare(plainPassword, hashedPassword);
      return isValid;
    } catch (error) {
      throw new Error('Failed to validate password: ' + error.message);
    }
  }

  // 获取用户信息（示例）
  async getUserInfo(userId: number): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      throw new Error('Failed to get user info: ' + error.message);
    }
  }
}

// 使用示例
async function run() {
  const securityTool = new SecurityTestTool();

  // 哈希密码示例
  const password = 'mySuperSecretPassword';
  const hashedPassword = await securityTool.hashPassword(password);
  console.log('Hashed Password:', hashedPassword);

  // 验证密码示例
  const isValid = await securityTool.validatePassword(password, hashedPassword);
  console.log('Password is valid:', isValid);

  // 获取用户信息示例
  const userId = 1;
  const userInfo = await securityTool.getUserInfo(userId);
  console.log('User Info:', userInfo);
}

run().catch(console.error);