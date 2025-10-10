// 代码生成时间: 2025-10-10 23:04:43
import { PrismaClient } from '@prisma/client';

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

class FileVersionControlSystem {
  // Add a new version of a file to the system
  async addFileVersion(filePath: string, fileContent: string): Promise<void> {
    try {
      // Generate a unique identifier for the new version
      const versionId = Date.now().toString();
      // Create a new file version record
      await prisma.fileVersion.create({
        data: {
          filePath: filePath,
          fileContent: fileContent,
          versionId: versionId,
        },
      });
    } catch (error) {
      console.error('Failed to add file version:', error);
      throw new Error('Failed to add file version');
    }
  }

  // Retrieve all versions of a file
  async getFileVersions(filePath: string): Promise<string[]> {
    try {
      // Fetch all versions of the file
      const versions = await prisma.fileVersion.findMany({
        where: { filePath: filePath },
        orderBy: { createdAt: 'asc' },
      });
      // Extract the file content from each version
      return versions.map(version => version.fileContent);
    } catch (error) {
      console.error('Failed to retrieve file versions:', error);
      throw new Error('Failed to retrieve file versions');
    }
  }

  // Get the latest version of a file
  async getLatestFileVersion(filePath: string): Promise<string | null> {
    try {
      // Find the file version with the latest createdAt timestamp
      const version = await prisma.fileVersion.findFirst({
        where: { filePath: filePath },
        orderBy: { createdAt: 'desc' },
      });
      // Return the file content if found, otherwise return null
      return version ? version.fileContent : null;
    } catch (error) {
      console.error('Failed to retrieve the latest file version:', error);
      throw new Error('Failed to retrieve the latest file version');
    }
  }
}

// Example usage
const system = new FileVersionControlSystem();

// Add a new version of a file
system.addFileVersion('example.txt', 'Initial content').then(() => {
  console.log('File version added successfully');
}).catch(error => {
  console.error(error.message);
});

// Get all versions of a file
system.getFileVersions('example.txt').then(versions => {
  console.log('File versions:', versions);
}).catch(error => {
  console.error(error.message);
});

// Get the latest version of a file
system.getLatestFileVersion('example.txt').then(version => {
  console.log('Latest file version:', version);
}).catch(error => {
  console.error(error.message);
});