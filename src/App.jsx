import { Routes, Route, useNavigate } from "react-router-dom";
import { Profile, ProfileAdmin, Accept, Card, Team, MainPage, Query, ShowUser, TestAdmin, ShowUserNext, TeamDif } from './components'
import 'swiper/css';
import './App.css'
import { Helmet } from 'react-helmet';

function App() {
  try {
    let tg = window.Telegram.WebApp;
    tg.expand();
  } catch {}

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <Routes>
        <Route path='/' element={<Profile/>}></Route>
        <Route path='/find' element={<Card/>}></Route>
        <Route path='/accept' element={<Accept/>}></Route>
        <Route path='/admin' element={<ProfileAdmin/>}></Route>
        <Route path='/team' element={<Team/>}></Route>
        <Route path='/query' element={<Query/>}></Route>
        <Route path='/userinfo' element={<ShowUser/>}></Route>
        <Route path='/usernextinfo' element={<ShowUserNext/>}></Route>
        <Route path='/test' element={<TestAdmin/>}></Route>
        <Route path='/Dif' element={<TeamDif/>}></Route>
      </Routes>
      {/* <ProfileAdmin/> */}
      {/* <Accept/> */}
      {/* <Card/> */}
    </>
  )
}

export default App
