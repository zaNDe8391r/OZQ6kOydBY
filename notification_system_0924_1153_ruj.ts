// 代码生成时间: 2025-09-24 11:53:37
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface to represent a message
interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
}

// Interface to represent a user
interface User {
  id: string;
  name: string;
  email: string;
}

class NotificationSystem {

  /**
   * Send a message to a specific user.
   * @param message - The message to be sent.
   * @returns The sent message or an error if the message cannot be sent.
   */
  async sendMessage(message: Message): Promise<Message | string> {
    try {
      const sentMessage = await prisma.message.create({
        data: message,
      });

      return sentMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      return 'Failed to send message.';
    }
  }

  /**
   * Retrieve all messages for a specific user.
   * @param userId - The ID of the user to retrieve messages for.
   * @returns All messages for the user or an error if messages cannot be retrieved.
   */
  async getMessagesForUser(userId: string): Promise<Message[] | string> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          receiverId: userId
        }
      });

      return messages;
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return 'Failed to retrieve messages.';
    }
  }

  /**
   * Add a new user to the system.
   * @param user - The user to be added.
   * @returns The added user or an error if the user cannot be added.
   */
  async addUser(user: User): Promise<User | string> {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });

      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      return 'Failed to add user.';
    }
  }
}

// Example usage of the Notification System
const notificationSystem = new NotificationSystem();

// Add a new user
notificationSystem.addUser({
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
}).then(user => {
  console.log('User added:', user);
}).catch(error => {
  console.error('Error adding user:', error);
});

// Send a message
notificationSystem.sendMessage({
  id: '1',
  content: 'Hello, this is a test message.',
  senderId: '1',
  receiverId: '1',
}).then(message => {
  console.log('Message sent:', message);
}).catch(error => {
  console.error('Error sending message:', error);
});
