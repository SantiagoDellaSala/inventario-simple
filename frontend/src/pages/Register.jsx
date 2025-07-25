import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (form.password !== form.confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
      });
      setExito('Usuario registrado correctamente. Redirigiendo a login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Registro de Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {exito && <div className="alert alert-success">{exito}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmarPassword"
            className="form-control"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}
