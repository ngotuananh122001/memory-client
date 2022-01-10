import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { useEffect, useState } from 'react';
import { getPosts } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import './styles/home.css';

const Home = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    // fetch all posts from server
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getPosts());
        }
    }, [dispatch, isAuthenticated]);

    const show = (text) => {
        document.querySelector('.textBox').value = text;
    };

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
        });

        dispatch({
            type: 'DELETE_ALL',
        });

        localStorage.removeItem('TOKEN_NAME');
        navigate('/');
    };

    // danh sach option
    const [option, setOption] = useState('');
    return (
        <>
            {isAuthenticated && (
                <Container maxWidth="lg" className="home-section">
                    <Grid
                        className="navbar-section"
                        item
                        xs={12}
                        sm={12}
                        style={{ margin: '20px' }}
                    >
                        <ion-icon name="cube-outline"></ion-icon>
                        <h2>Hộp ký ức</h2>
                    </Grid>
                    <Grow in>
                        <Container>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="stretch"
                                spacing={3}
                            >
                                <Grid item xs={12} sm={4} className="sidebar">
                                    <div
                                        className="dropdown"
                                        onClick={(e) =>
                                            e.currentTarget.classList.toggle(
                                                'active'
                                            )
                                        }
                                    >
                                        <input
                                            type="text"
                                            className="textBox"
                                            placeholder={`Xin chào, ${user.username}`}
                                            readOnly
                                        />
                                        <div className="option">
                                            <div
                                                onClick={() => {
                                                    show('Account');
                                                    setOption('ACCOUNT');
                                                }}
                                            >
                                                <ion-icon name="person-outline"></ion-icon>
                                                Account
                                            </div>
                                            <div
                                                onClick={() => {
                                                    show('Create post');
                                                    setOption('CREATE POST');
                                                }}
                                            >
                                                <ion-icon name="create-outline"></ion-icon>
                                                New Post
                                            </div>
                                            <div onClick={() => logout()}>
                                                <ion-icon name="log-out-outline"></ion-icon>
                                                Logout
                                            </div>
                                        </div>
                                    </div>

                                    {option === 'ACCOUNT' && (
                                        <div className="account">
                                            <div>
                                                Username:{' '}
                                                <span>{user.username}</span>
                                            </div>
                                            <div>
                                                Email:
                                                <span>{user.email}</span>
                                            </div>
                                            <div>
                                                CreateAt:{' '}
                                                <span>{user.createAt}</span>
                                            </div>
                                        </div>
                                    )}

                                    {option === 'CREATE POST' && (
                                        <Form
                                            currentId={currentId}
                                            setCurrentId={setCurrentId}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <Posts setCurrentId={setCurrentId} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </Container>
            )}
            {!isAuthenticated && navigate('/login')}
        </>
    );
};

export default Home;
