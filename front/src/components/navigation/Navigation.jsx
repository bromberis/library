import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useGlobalUserContext, UserContext } from '../context/UserContext';

function Navigation() {
  const { signOut, userData } = useGlobalUserContext(UserContext);

  function isDisabled() {
    if (!userData.hasOwnProperty('email')) {
      return `d-none`;
    }
  }

  let navigate = useNavigate();
  return (
    <>
      <div className='nav-row '>
        <div className='col-12 text-center'>
          <ul className='ul-nav'>
            {Object.keys(userData).length === 0 && (
              <li>
                <Link to='/home'>
                  <button className='nav-button'>Pradžia</button>{' '}
                </Link>
              </li>
            )}
            <li className={`${userData.role === 'user' ? true : 'd-none'}`}>
              <Link to='/items'>
                <button className='nav-button'>
                  Mano rezervuoti leidiniai
                </button>
              </Link>
            </li>
            <li className={`${userData.role === 'admin' ? true : 'd-none'} `}>
              <Link to='/search'>
                <button className='nav-button'>Ieškoti knygos</button>
              </Link>
            </li>
            <li className={`${userData.role === 'admin' ? true : 'd-none'} `}>
              <Link to='/allbooks'>
                <button className='nav-button'>Knygų sąrašas</button>
              </Link>
            </li>
            <li className={`${userData.role === 'admin' ? true : 'd-none'} `}>
              <Link to='/addbook'>
                <button className='nav-button'>Pridėti knygą</button>
              </Link>
            </li>
            <li className={`${isDisabled()} logout`}>
              <button
                onClick={() => {
                  swal({
                    title: 'Ar tikrai atsijungti?',
                    icon: 'warning',
                    buttons: ['Atšaukti', 'Gerai'],
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      signOut();
                      navigate('/');
                    }
                  });
                }}
                className='nav-button'
              >
                Atsijungti
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navigation;
