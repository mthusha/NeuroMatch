import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserTypeRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch(user.role) {
        case 'job_seeker':
          navigate('/jobseeker');
          break;
        case 'employer':
        case 'recruiter':
          navigate('/employer');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  return <div>Redirecting...</div>;
};

export default UserTypeRedirect;