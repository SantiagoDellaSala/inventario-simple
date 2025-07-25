import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', form);
            login(res.data.user, res.data.token);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Error en login');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 400 }}>
            <h2>Iniciar sesión</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                <p className="mt-3">
                    ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
                </p>
                <button className="btn btn-primary w-100" type="submit">
                    Ingresar
                </button>
            </form>
        </div>
    );
}
