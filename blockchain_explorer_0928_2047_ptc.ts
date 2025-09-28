// 代码生成时间: 2025-09-28 20:47:02
 * It includes a blockchain model and provides functions to interact with it.
 */

import { PrismaClient } from '@prisma/client';

// Define the blockchain model with PRISMA
const prisma = new PrismaClient();

// Define the Block interface
interface Block {
  id: number;
  index: number;
  timestamp: Date;
  data: string;
# TODO: 优化性能
  previousHash: string;
  hash: string;
# 扩展功能模块
  nonce: number;
}

class BlockchainExplorer {
  // Add a new block to the blockchain
  async addBlock(data: string, previousHash: string): Promise<Block> {
    const newBlock: Block = {
      id: Math.random(),
      index: (await this.getLastBlock()).index + 1,
      timestamp: new Date(),
      data: data,
# 扩展功能模块
      previousHash: previousHash,
      hash: this.calculateHash(previousHash, data),
      nonce: 0,
    };
    await prisma.block.create({
      data: newBlock,
    });
    return newBlock;
  }

  // Get the last block from the blockchain
  async getLastBlock(): Promise<Block> {
    const lastBlock = await prisma.block.findFirst();
# 增强安全性
    if (!lastBlock) {
      throw new Error('No blocks found in the blockchain');
# 改进用户体验
    }
    return lastBlock;
  }

  // Calculate hash for a block
  calculateHash(previousHash: string, data: string): string {
    return new Date().getTime().toString() + previousHash + data;
  }

  // Get all blocks in the blockchain
  async getAllBlocks(): Promise<Block[]> {
    const blocks = await prisma.block.findMany();
    return blocks;
  }
}

// Example usage
const blockchainExplorer = new BlockchainExplorer();

// Add blocks to the blockchain
(async () => {
# 改进用户体验
  try {
    await blockchainExplorer.addBlock('Genesis Block', '0');
    const block1 = await blockchainExplorer.addBlock('Block 1', 'Genesis Hash');
    console.log('Added block:', block1);

    // Get all blocks
    const allBlocks = await blockchainExplorer.getAllBlocks();
    console.log('All blocks:', allBlocks);
  } catch (error) {
    console.error('Error:', error);
  }
# 扩展功能模块
})();