import app from './app';
import prisma from './prisma';
import { config } from './utils/config';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
