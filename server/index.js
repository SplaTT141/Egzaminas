import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { cookieParser } from './middleware/cookieParser.js';
import { userData } from './middleware/userData.js';
import { postRegister } from './api/postRegister.js';
import { postLogin } from './api/postLogin.js';
import { postEvent } from './api/postEvent.js';
import { getEvents } from './api/getEvents.js';
import { deleteEvent } from './api/deleteEvent.js';
import { putEvent } from './api/putEvent.js';
import { putHeart } from './api/putHeart.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser);
app.use(userData);

app.get('/', (req, res) => {
    res.send("It's alive!");
});
app.get('/events', getEvents);

app.post('/register', postRegister);
app.post('/login', postLogin);
app.post('/admin/event/add', postEvent);

app.delete('/admin/events/:id', deleteEvent)

app.put('/admin/event/edit', putEvent);
app.put('/heart', putHeart);

app.get('*error', (req, res) => {
    return res.json({
        status: 'error',
        message: 'No such route',
    });
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
