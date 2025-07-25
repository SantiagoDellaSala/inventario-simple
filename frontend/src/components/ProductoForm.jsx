import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductoForm({ producto, onClose }) {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    if (!form.descripcion.trim()) {
      setError('La descripción es obligatoria');
      return;
    }
    if (!form.precio || isNaN(form.precio) || Number(form.precio) <= 0) {
      setError('El precio debe ser un número mayor que cero');
      return;
    }
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0) {
      setError('El stock debe ser un número igual o mayor que cero');
      return;
    }

    try {
      if (producto) {
        // Editar producto
        await axios.put(`http://localhost:3000/api/productos/${producto.id}`, form);
      } else {
        // Crear producto
        await axios.post('http://localhost:3000/api/productos', form);
      }
      onClose();
    } catch (err) {
      setError('Error al guardar el producto');
      console.error(err);
    }
  };

  return (
    <div className="card mb-3 p-3 bg-dark text-white">
      <h4>{producto ? 'Editar Producto' : 'Nuevo Producto'}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={form.precio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {producto ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
