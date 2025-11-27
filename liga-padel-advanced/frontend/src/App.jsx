import { useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

function App() {
  const [view, setView] = useState('ranking');
  const [players, setPlayers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const res = await axios.get(API + '/players');
    setPlayers(res.data);
  }

  async function login(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await axios.post(API + '/auth/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        alert('Login OK');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  }

  async function register(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post(API + '/auth/register', { email, password });
      alert('Cuenta creada');
    } catch (err) {
      alert(err.response?.data?.error || 'Error');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Liga Pádel</h1>
      <nav style={{ marginBottom: 12 }}>
        <button onClick={() => setView('ranking')}>Ranking</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('register')}>Register</button>
        <button onClick={() => setView('admin')}>Admin</button>
      </nav>

      {view === 'ranking' && (
        <div>
          <h2>Ranking</h2>
          {players.map((p, i) => (
            <div key={p._id}>{i+1}. {p.name} — {p.points} pts</div>
          ))}
        </div>
      )}

      {view === 'login' && (
        <form onSubmit={login}>
          <h2>Login</h2>
          <input name="email" placeholder="email" /><br/>
          <input name="password" placeholder="password" type="password" /><br/>
          <button type="submit">Ingresar</button>
        </form>
      )}

      {view === 'register' && (
        <form onSubmit={register}>
          <h2>Register</h2>
          <input name="email" placeholder="email" /><br/>
          <input name="password" placeholder="password" type="password" /><br/>
          <button type="submit">Crear</button>
        </form>
      )}

      {view === 'admin' && (
        <div>
          <h2>Admin panel</h2>
          <p>Acciones de admin (requiere token con role ADMIN)</p>
        </div>
      )}
    </div>
  );
}

export default App;
