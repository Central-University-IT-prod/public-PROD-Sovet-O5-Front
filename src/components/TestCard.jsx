import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import styles from './card.module.scss'
import { HandHeart, HeartOff , Sparkle } from 'lucide-react';
import { BadLotti, El, Hard, InTeam, LottiBest, LottiLetsFind, LottiMiddle, LottiSad, position, TopBg, words } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Select, { components } from "react-select";
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import WebApp from "@twa-dev/sdk"
import { BASEURL } from '../../config/config';

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const options = [
  { value: "", label: "любое" },
  { value: "frontend", label: "💅 фронт" },
  { value: "backend", label: "🪖 бэк"},
  { value: "mobile", label: "🏳️‍🌈 мобила"},
];

let HardSkills = [
  { value: "React", label: "React" },
  { value: "Vue", label: "Vue"},
  { value: "NextJs", label: "NextJs"},
];

const { Option } = components;
const IconOption = (props) => (
    <div className={classNames(styles.Bgh)}>
        <Option {...props} >
            <div className={styles.Chooses}>
                <h5 className={styles.ChoosesH}>{props.data.label}</h5>
            </div>
        </Option>
    </div>
);

function TagBlock(props) {
  return (
    <div className={styles.TagStroke}>
      <div className={styles.Tag}>
        <img src={props.image} className={styles.ImgP} />
        {/* <p>{character?.position}</p> */}
        <p className={styles.TagP}>{props.text}</p>
      </div>
    </div>
  );
}

const colourStyles = {
  control: (baseStyles, state) => ({
      ...baseStyles,
      background: 'rgba(255, 255, 255, 0.07)',
      color: "#000000",
      borderWidth: 0,
      fontSize: 16,
      height: 42,
      fontWeight: 300,
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: 400,
      color: "#FFF",
      borderRadius: 3,
      background: state.isSelected ? 'linear-gradient(90deg, #6140CD 0%, #8271CD 100%)' : '#342579',
    })
};

const colourStyles2 = {
  control: (baseStyles, state) => ({
      ...baseStyles,
      fontWeight: 300,
      background: 'rgba(255, 255, 255, 0.07)',
      color: "#000000",
      borderWidth: 0,
  }),
  option: (provided, state) => ({
      ...provided,
      fontWeight: 400,
      fontSize: 16,
      color: "#FFF",
      background: state.isSelected ? 'linear-gradient(90deg, #6140CD 0%, #8271CD 100%)' : '#342579',
  }),
  multiValue: (base) => ({
      ...base,
      fontSize: 16,
      background: 'linear-gradient(90deg, #6140CD 0%, #8271CD 100%)',
      color: 'white',
  }),
};

const animatedComponents = makeAnimated();

function Card() {
  const navigate = useNavigate();
  const [Swapped, setSwapped] = useState(0);
  const [NoUsers, setNoUsers] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState()
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCustomSkill, setSelectedCustomSkill] = useState([]);
  const [selectedCustomSkills, setSelectedCustomSkills] = useState([]);
  const currentIndexRef = useRef(currentIndex)
  const [dismatch, setDismatch] = useState([]);
  const [match, setMatch] = useState([]);
  const [querymatch, setQueryMatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Who, setWho] = useState({ value: "", label: "любое" });
  const [Skills, setSkills] = useState([]);
  const [dataBase, setDataBase] = useState([]);
  const [FilterPos, setFilterPos] = useState(null);
  const [FilterSkills, setFilterSkills] = useState(null);
  let Test = true;
  let FG = [];

  function OpenProfile() {
    let Good = true;
    for (let i = 0; i < document.getElementsByClassName(styles.swipe).length; i++) {
      const Obj = document.getElementsByClassName(styles.swipe)[i];
      const stylest = window.getComputedStyle(Obj);
      if (stylest.transform != 'matrix(1, 0, 0, 1, 0, 0)') {
        Good = false;
        break;
      }
    }
    console.log(Good);
    if (Good) {
      // console.log(dataBase);
      if (dataBase[currentIndex].team?.members.length < 2) { 
        navigate("/usernextinfo", {state:{from: dataBase[currentIndex]}});
      } else { // Команда
        navigate("/Dif", {state:{from: dataBase[currentIndex]?.team}});
      }
    }
  }
  

  const childRefs = useMemo(
    () =>
      Array(10000)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index + 1);
    const card = dataBase[index];
    console.log("Swiped", dataBase[index]);
    if (direction === 'left') {
      setDismatch((prevDismatch) => {
        const updatedDismatch = [...prevDismatch, card];
        console.log('Updated Dismatch:', updatedDismatch);
        return updatedDismatch;
      });
      // DISLIKE
      const InitData = WebApp.initData;
      try {
        axios({
            method: 'post',
            url: `https://prod-o5.difhel.dev/users/${dataBase[index].id}/dislike`,
            // url: `https://prod-o5.difhel.dev/users/1368727604/like`,
            headers: {
                "authorization": `TGMA ${InitData}`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            }
        })
        .then(res => {
            // setDataBase(res.data.response.profile);
          // LoadInfo();

            console.log(222);
            console.log(res);

        })
        setSwapped(Swapped+1);
      } catch {}
    } else if (direction === 'right') {
      setMatch((prevMatch) => {
        const updatedMatch = [...prevMatch, card];
        console.log('Updated Match:', updatedMatch);
        return updatedMatch;
      });

      // LIKE
      const InitData = WebApp.initData;
      try {
        axios({
            method: 'post',
            // url: `https://prod-o5.difhel.dev/users/${tg.initDataUnsafe.user.id}`,
            url: `https://prod-o5.difhel.dev/users/${dataBase[index].id}/like`,
            headers: {
                "authorization": `TGMA ${InitData}`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            }
        })
        .then(res => {
          console.log("222", res);
          // LoadInfo();
            // setDataBase(res.data.response.profile);
            console.log(222);
        })
        setSwapped(Swapped+1);
      } catch {}

    } else if (direction === 'down') {
      setQueryMatch((prevQueryMatch) => {
        const updatedQueryMatch = [...prevQueryMatch, card];
        console.log('Updated Query Match:', updatedQueryMatch);
        return updatedQueryMatch;
      });

      // Defer
      const InitData = WebApp.initData;
      try {
        axios({
            method: 'post',
            url: `https://prod-o5.difhel.dev/users/${dataBase[index].id}/defer`,
            // url: `https://prod-o5.difhel.dev/users/1368727604/defer`,
            headers: {
                "authorization": `TGMA ${InitData}`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            }
        })
        .then(res => {
          console.log("defer", res);
          // LoadInfo();
        })
        setSwapped(Swapped+1);
      } catch {}

    }
    console.log("222121222", myQuery.current.length)
    if (currentIndex % 3 == 0) {
      LoadInfo()
    }
    console.log(`Swiped ${direction}`);
    console.log("cur", querymatch);
  };


  const outOfFrame = (name, idx) => {
    try {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      setTimeout(() => currentIndexRef.current >= idx && childRefs[idx].current.restoreCard(), 1500)
      console.log(idx);
      setTimeout(() => document.getElementById("Card" + idx).remove(), 1500);
      // childRefs[idx].current.remove();
    } catch {}
  }

  const swipe = async (dir) => {
    console.log(currentIndex);
    if (canSwipe && currentIndex < dataBase.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  function Burger(){
    document.getElementsByClassName(styles.nav_toggle)[0].classList.toggle(styles.opened);
    document.getElementById("MainHeader").classList.toggle(styles.ZIndex);
    document.getElementById("filters").classList.toggle(styles.hidden);
    const T = document.getElementById("LottiText");
    if (T == null) return;
    if (document.getElementById("filters").classList.contains(styles.hidden)) {
      T.innerText = "Давай найдем тебе команду!";
    } else {
      T.innerText = "Отфильтруй сокомандников!";
    }
  }

  function SaveButton() {
    let Sk = [];
    for (let i = 0; i < Skills.length; i++) {
      Sk.push(Skills[i].value);
    }
    myQuery.current = [];
    let t1 = Who.value == "" ? null : Who.value;
    let t2 = Sk.length == 0 ? null : Sk;
    setFilterPos(t1); setFilterSkills(t2);
    LoadInfo({t1:t1, t2: t2});
    LoadInfo({t1:t1, t2: t2});
  }

  function LoadInfo(props) {
    console.log(1);
    let U = [];
    for (let i = 0; i < dataBase.length; i++) {
      U.push(dataBase[i].id);
    }
    if (U.length == 0) {
      for (let i = 0; i < FG.length; i++) {
        U.push(FG[i].id);
      }
    }
    const InitData = WebApp.initData;
    console.log("InitData", InitData);
    axios({
      method: 'post',
      url: `https://prod-o5.difhel.dev/users/next`,
      headers: {
          "authorization": `TGMA ${InitData}`
          // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
      }, 
      data: {
        skills: props?.t2 || FilterSkills,
        position: props?.t1 || FilterPos,
        exclude: U,
      } 
    })
    .then(res => {
        res.data.response.forEach(value=>addToQueue(value))
        console.log("3333", myQuery.current.reverse());
        setDataBase(myQuery.current.reverse());
        console.log("FG", myQuery.current.reverse());
        FG = myQuery.current.reverse();
        setNoUsers(false);
        console.log(2);

    }).catch(res => {
      setNoUsers(true);
    })
  }
  const myQuery = useRef([])
  const addToQueue = (value)=>{
    myQuery.current.push(value)
  }
  const getFromQuery = ()=>{
    return myQuery.current.shift()
  }

  useEffect(() => {
    // if (Test){
    //   Test = false;
    //   setNoUsers(false);
    //   LoadInfo();
    //   sleep(1000).then(() => LoadInfo());
    // } else {
    //   LoadInfo();
    //   sleep(1000).then(() => LoadInfo());
    // }
    LoadInfo();
    sleep(1000).then(() => LoadInfo());
  }, []);

  return (
    
    <div className={styles.Screen}>
      {NoUsers ? 
      <div className={styles.ScreenNo}>
        <img src={LottiSad} alt="" className={styles.ScreenNoImg} />
        <p>Вы пролистали всю ленту!</p>
      </div> : ""}
      <div id="filters" className={classNames(styles.hidden, styles.Filters)}>
        <div className={styles.Check}>
          <h5>Направление:</h5>
          {!isLoading ? <Select 
            id="CategorySelect"
            cacheOptions={true}
            defaultValue={Who}
            options={options}
            components={{ Option: IconOption }}
            onChange={(choice) => setWho(choice)}
            styles={colourStyles}
            theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                colors: {
                ...theme.colors,
                  text: '#FFF',
                  primary25: "transparent",
                  primary50: "transparent",
                  primary: 'transparent',
                  neutral0: "transparent",
                  neutral30: "transparent",
                  neutral50: "#FFF",
                  neutral60: "#FFF",
                  neutral80: "#FFF",
                },
              })}
        /> : <input type="text" className={styles.BlockInput} /> }
        </div>
        <div className={styles.Check}>
                    <h5>Hard Skills:</h5>
                    {!isLoading ? <CreatableSelect
                        isClearable={true} 
                        closeMenuOnSelect={false}
                        isSearchable
                        components={animatedComponents}
                        onChange={(choice) => setSkills(choice)}
                        defaultValue={Skills}
                        isMulti={true}
                        options={HardSkills}
                        styles={colourStyles2}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                            colors: {
                            ...theme.colors,
                            text: '#FFF',
                            primary50: "transparent",
                            primary: 'transparent',
                            neutral0: "#342579",
                            neutral50: "#FFF",
                            neutral80: "#FFF",
                            neutral30: "transparent",
                            },
                        })}
                    /> : <input type="text" className={styles.BlockInput} /> }
                </div>
          <button onClick={SaveButton} className={styles.ButtonSave}>Сохранить</button>
      </div>
      <img src={TopBg} alt="" className={styles.Img} />
      <header id="MainHeader" className={styles.Main}>
        <div>
            <img src={LottiLetsFind} className={styles.Decor} alt="" />
            <img src={words} className={styles.Message} alt="" />
            <p id="LottiText" className={styles.MessageText}>Давай найдем тебе команду!</p>
        </div>
          <div className={classNames(styles.nav_toggle_container, styles.ForMobile)}>
            <button className={classNames(styles.nav_toggle, styles.ForMobile)} onClick={() => Burger()}>
                <span className={styles.bar_top}></span>
                <span className={styles.bar_mid}></span>
                <span className={styles.bar_bot}></span>
            </button>
          </div>
      </header>
      <div className={styles.PlaceForCards}>
        {!NoUsers ? <div className={styles.card}>
          {dataBase.reverse().map((character, index) => (
            <div id={"Card" + index} className={styles.DivHelp} style={{zIndex: 10000-index}}>
            <TinderCard
              ref={childRefs[index]}
              key={character.name}
              className={styles.swipe}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
              
            >
              <div onTouchStart={() => setTimeout(OpenProfile, 500) } className={styles.card}>
                <div className={styles.Tags}>
                  <TagBlock image={position} text={character?.profile?.position || 'без направления'} />
                  {character?.team?.members.length >= 2 ? <TagBlock image={InTeam} text={'в команде'} /> : ""}
                  {character?.profile?.skills &&
                    character?.profile?.skills.map((item, index) => (
                      <TagBlock image={Hard} text={item} />
                  ))}
                </div>
                <img className={styles.LogoImg} alt="" src={BASEURL + `/avatars/getAvatar/?id=${character?.id}`} />
                <div  className={styles.NameCard}>{character?.first_name || 'User'}</div>
                <div className={styles.InfoCard}>Опыт: <span className={styles.InfoCardLight}>{character?.profile?.experience || 'Данные не указаны'}</span></div>
                <div className={styles.InfoCard}>Описание: <span className={styles.InfoCardLight}>{character?.profile?.description || 'Данные не указаны'}</span></div>
                <div className={classNames(styles.InfoCard, styles.InJ)}>Ссылки: 
                <span className={styles.InfoCardLight}>
                <ul className={classNames(styles.InfoCard, styles.Top)}>
                  {character?.profile?.links && character?.profile?.links.map((item, index) => (
                    <li key={index}> <a href={item}>{item}</a></li>
                  ))}
                </ul>
                </span></div>
              </div>
            </TinderCard>
            </div>
          ))}
        </div> : ""}
      </div>
      <footer className={styles.Footer}>
        <div className={styles.UpButtons}>
          <div className={styles.TogImg}>
            <img className={styles.Btn} onClick={() => swipe('left', null, currentIndex)} src={BadLotti} />
            <h4>Дизлайк</h4>
          </div>
          <div className={styles.TogImg}>
            <img className={styles.Btn} onClick={() => swipe('down', null, currentIndex)} src={LottiMiddle} />
            <h4>Избранное</h4>
          </div>
          <div className={styles.TogImg}>
            <img className={styles.Btn} onClick={() => swipe('right', null, currentIndex)} src={LottiBest} />
            <h4>Лайк</h4>
          </div>
        </div> 
        <hr className={styles.hr} />
        <div className={styles.Points}>
          <Link className="Link" to='/team'>Моя команда</Link>
          <div className={styles.Activee}>
            <Link className="Link" to='/find'>Мэтчинг</Link>
            <img src={El} className={styles.El} alt="" />
          </div>
          <Link className="Link" to='/'>Профиль</Link>
              
          
        </div>
      </footer>
  </div>
  )
}

export default Card