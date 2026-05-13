import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const { PrismaClient } = pkg;

console.log('Testing Connection String from db.js:', process.env.DATABASE_URL);

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });