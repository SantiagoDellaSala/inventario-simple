const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.send('API Inventario Simple funcionando 🚀');
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Conectado a MySQL');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}).catch(err => {
  console.error('❌ Error al conectar con la base de datos:', err);
});
