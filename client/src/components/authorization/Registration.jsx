import { useState } from 'react';
import './authorization.css';
import Input from '../input/Input';
import { registration } from '../../actions/user';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="authorization">
      <div className="authorization__header">Register new user</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Enter email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Enter password..."
      />
      <button
        className="authorization__btn"
        onClick={() => registration(email, password)}
      >
        Register
      </button>
    </div>
  );
};

export default Registration;
