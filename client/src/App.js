// client/src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
    </div>
  );
};

export default App;
