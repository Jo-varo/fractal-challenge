import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>
        <Link to="/my-orders">My orders</Link>
      </div>
      <div>
        <Link to="/add-order">Manage orders</Link>
      </div>
    </>
  );
}
