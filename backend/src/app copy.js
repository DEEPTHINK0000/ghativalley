// backend/src/app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const { initWebSocket } = require('./websocket/notification.socket');
const orderRoutes = require('./routes/order.routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Initialize WebSocket Hub
initWebSocket(io);

// Register API Routes
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.get('/api/quotes', (req, res) => {
    const quotes = [
        {
            id: 1,
            title:'चाणक्य-',
            content: 'ब्रह्माज्ञानी को स्वर्ग तृण है, शूर को जीवन तृण है, जिसने इंद्रियों को वश में किया उसको स्त्री तृण-तुल्य जान पड़ती है, निस्पृह को जगत तृण है'
        },
        {
            id: 2,
            title:'विदुर-',
            content: 'कुमंत्रणा से राजा का, कुसंगति से साधु का, अत्यधिक दुलार से पुत्र का और अविद्या से ब्राह्मण का नाश होता है।'
        },
        {
            id: 3,
            title:'अटल बिहारी वाजपेयी-',
            content: 'लक्ष्य के लिए की गई कड़ी मेहनत कभी भी आप पर थकान नहीं लाती, वो आपके लिए संतोष ही लाती है।'
        },
        {
            id: 4,
            title:'रतन टाटा-',
            content: 'मैं कभी भी सही निर्णय लेने पर विश्वास नहीं करता। मैं निर्णय ले कर, उसे सही साबित करने में विश्वास करता हूं। '
        },
        {
            id: 5,
            title:'स्वामी विवेकानंद-',
            content: 'ब्रह्माण्ड की सारी शक्तियां पहले से हमारी हैं. वो हमीं हैं जो अपनी आँखों पर हाँथ रख लेते हैं और फिर रोते हैं कि कितना अन्धकार है!'
        },
        {
            id: 6,
            title:'स्वामी विवेकानंद-',
            content: 'ब्रह्माण्ड की सारी शक्तियां पहले से हमारी हैं. वो हमीं हैं जो अपनी आँखों पर हाँथ रख लेते हैं और फिर रोते हैं कि कितना अन्धकार है!'
        },
        {
            id: 7,
            title:'स्वामी विवेकानंद-',
            content: 'ब्रह्माण्ड की सारी शक्तियां पहले से हमारी हैं. वो हमीं हैं जो अपनी आँखों पर हाँथ रख लेते हैं और फिर रोते हैं कि कितना अन्धकार है!'
        },
        {
            id: 8,
            title:'स्वामी विवेकानंद-',
            content: 'ब्रह्माण्ड की सारी शक्तियां पहले से हमारी हैं. वो हमीं हैं जो अपनी आँखों पर हाँथ रख लेते हैं और फिर रोते हैं कि कितना अन्धकार है!'
        }
    ];
    res.send(quotes);
})




sequelize.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});