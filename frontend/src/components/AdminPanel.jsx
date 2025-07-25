import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductoForm from './ProductoForm'; // Lo crearemos en el paso 11
import './AdminPanel.css'; // (opcional para estilos)

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/productos');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const abrirFormulario = (producto = null) => {
    setProductoEditando(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setProductoEditando(null);
    setMostrarForm(false);
    obtenerProductos();
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Productos</h2>
      <button onClick={() => abrirFormulario()} className="btn btn-success mb-3">+ Nuevo Producto</button>

      {mostrarForm && (
        <ProductoForm
          producto={productoEditando}
          onClose={cerrarFormulario}
        />
      )}

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>{prod.descripcion}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => abrirFormulario(prod)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarProducto(prod.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
