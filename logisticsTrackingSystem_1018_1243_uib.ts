// 代码生成时间: 2025-10-18 12:43:03
// Import necessary modules and types
import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

// Define the Prisma model for the package
export class Package {
  id: number;
  trackingNumber: string;
  status: string;
  lastUpdated: Date;
}

// Define the Prisma client
const prisma = new PrismaClient();

// Function to create a new package
async function createPackage(data: Prisma.PackageCreateInput): Promise<Package> {
  try {
    const packageData = await prisma.package.create({
      data: {
        trackingNumber: data.trackingNumber,
        status: data.status,
        lastUpdated: new Date(),
      },
    });
    return packageData;
  } catch (error) {
    throw new Error('Failed to create package: ' + error.message);
  }
}

// Function to update package status
async function updatePackageStatus(id: number, status: string): Promise<Package> {
  try {
    const packageData = await prisma.package.update({
      where: { id },
      data: {
        status: status,
        lastUpdated: new Date(),
      },
    });
    return packageData;
  } catch (error) {
    throw new Error('Failed to update package status: ' + error.message);
  }
}

// Function to retrieve package details
async function getPackageById(id: number): Promise<Package | null> {
  try {
    const packageData = await prisma.package.findUnique({
      where: { id },
    });
    if (!packageData) return null;
    return packageData;
  } catch (error) {
    throw new Error('Failed to retrieve package: ' + error.message);
  }
}

// Define the Express route handlers
export const packageRoutes = (app) => {
  app.post('/create-package', async (req: Request, res: Response) => {
    try {
      const { trackingNumber, status } = req.body;
      const packageData = await createPackage({ trackingNumber, status });
      res.status(201).json(packageData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/update-package/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const packageData = await updatePackageStatus(Number(id), status);
      res.json(packageData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/package/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const packageData = await getPackageById(Number(id));
      if (!packageData) return res.status(404).json({ error: 'Package not found' });
      res.json(packageData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
