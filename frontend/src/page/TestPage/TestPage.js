import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginSection from '../../components/LoginSection/LoginSection';

const TestPage = () => {
  const inforUsers = useSelector((state) => {
    return state.user.value
  })

  return (
    <>
      {inforUsers && <LoginSection />}
      <Link style={{ 'fontSize': '24px', 'padding': '24px', 'color': 'red' }} to='/'>trang chu</Link>
      <h2 style={{ 'fontSize': '48px', 'padding': '24px' }}>Test page</h2>
    </>
  );
};

export default TestPage;
