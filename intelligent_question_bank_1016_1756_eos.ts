// 代码生成时间: 2025-10-16 17:56:37
 * Intelligent Question Bank System
 * This system allows users to manage a question bank with
 * the ability to add, remove, and retrieve questions.
 */

import { PrismaClient } from '@prisma/client';

// Initialize the Prisma client
const prisma = new PrismaClient();

interface Question {
  id: number;
  content: string;
  options: Array<string>;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

class IntelligentQuestionBank {
  async addQuestion(question: Question): Promise<void> {
    try {
      await prisma.question.create({
        data: question,
      });
    } catch (error) {
      console.error('Failed to add question:', error);
      throw new Error('Failed to add question');
    }
  }

  async getQuestionById(id: number): Promise<Question | null> {
    try {
      return await prisma.question.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to retrieve question:', error);
      throw new Error('Failed to retrieve question');
    }
  }

  async deleteQuestionById(id: number): Promise<void> {
    try {
      await prisma.question.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to delete question:', error);
      throw new Error('Failed to delete question');
    }
  }

  async listQuestions(): Promise<Question[]> {
    try {
      return await prisma.question.findMany();
    } catch (error) {
      console.error('Failed to list questions:', error);
      throw new Error('Failed to list questions');
    }
  }
}

// Usage example
const questionBank = new IntelligentQuestionBank();

// Add a new question to the question bank
questionBank.addQuestion({
  id: 1,
  content: 'What is the capital of France?',
  options: ['London', 'Paris', 'Berlin', 'Madrid'],
  answer: 'Paris',
  difficulty: 'easy',
}).then(() => console.log('Question added successfully'))
  .catch((error) => console.error('Error adding question:', error));

// Get a question by ID
questionBank.getQuestionById(1).then((question) => {
  if (question) {
    console.log('Retrieved question:', question);
  } else {
    console.log('Question not found');
  }
}).catch((error) => console.error('Error retrieving question:', error));

// Delete a question by ID
questionBank.deleteQuestionById(1).then(() => console.log('Question deleted successfully'))
  .catch((error) => console.error('Error deleting question:', error));

// List all questions
questionBank.listQuestions().then((questions) => {
  console.log('All questions:', questions);
}).catch((error) => console.error('Error listing questions:', error));