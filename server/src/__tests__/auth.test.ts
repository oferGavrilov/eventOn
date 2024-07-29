import request from 'supertest';
import { app } from '../app';
import bcrypt from 'bcryptjs';
import { Server } from 'http';
import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../../jest.setup';


const prisma: PrismaClient = getPrismaClient();
let server: Server;

beforeAll(async () => {
    server = app.listen(4000, () => {
        console.log('Test server running on port 4000');
    })
});

afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
    await prisma.$disconnect();
    server.close();
});

beforeEach(async () => {
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
});

describe('POST /api/auth/signup', () => {
    it('should signup successfully with valid data', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Jane',
                lastName: 'Doe',
                role: 'EventPlanner',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe('test@example.com');
        expect(res.headers['set-cookie']).toBeDefined();
    });
});