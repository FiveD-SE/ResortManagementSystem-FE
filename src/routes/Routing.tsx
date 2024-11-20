import { Routes, Route } from 'react-router-dom';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="login" element={<div>Login</div>} />
      <Route path="register" element={<div>Register</div>} />
    </Routes>
  );
};

export default Routing;
