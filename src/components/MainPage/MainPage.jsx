import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { bell, Bg, Change, Delete, dislike, El, like, LottiGrey, LottiLetsFind, TopBg, words } from '../../assets';
import styles from './MainPage.module.scss'
import TinderCard from 'react-tinder-card'
import React, { useMemo, useRef, useState } from 'react';

const db = [
  {
    name: 'Dinesh Chugtai',
    position: 'фронт',
    skills: ['react', 'nextJS', 'brainfuck'],
    description: 'Издеваюсь над помидорами',
    experience: '3 года',
    links: ['https://qwerty.com', 'https://asdfgh.ru']
  },
  {
    name: 'Dinesh Chugtai2',
    description: 'Издеваюсь над помидорами',
    skills: ['react', 'nextJS', 'brain'],
    experience: '3 года',
    links: ['https://qwerty.com', 'https://asdfgh.ru']
  },
  {
    name: 'Dinesh Chugtai43',
    position: 'фронт',
    description: 'Издеваюсь над помидорами',
    experience: '3 года',
    links: ['https://qwerty.com', 'https://asdfgh.ru']
  },
  {
    type: 'own',
    name: 'Dinesh Chugtai4',
    skills: ['react', 'nextJS', 'brainfuck'],
    position: 'бек',
    description: 'Издеваюсь над помидорами',
    experience: '3 года',
    links: ['https://qwerty.com', 'https://asdfgh.ru']
  },
  {
    type: 'team',
    members: [
      { name: 'x', position: 'фронт', experience: '3', skills: ['1', '2'] },
      { name: 'y', position: 'бек', experience: '3', skills: ['2', '4'] },
      { name: 'z', position: 'моб', experience: '3', skills: ['3', '5'] }
    ],
    name: 'Dinesh Chugtai5',
    description: 'Издеваюсь над помидорами, очень долго и мучительно изеваюсь над помидорами, совсем долго и мучительно издеваюсь над помидорами',
    links: ['https://qwerty.com', 'https://asdfgh.ru']
  }
]

function Accept() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCustomSkill, setSelectedCustomSkill] = useState([]);
  const [selectedCustomSkills, setSelectedCustomSkills] = useState([]);
  const currentIndexRef = useRef(currentIndex)
  const [dismatch, setDismatch] = useState([]);
  const [match, setMatch] = useState([]);
  const [querymatch, setQueryMatch] = useState([]);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const filteredDb = useMemo(() => {
    return db;
  }, [selectedPosition, selectedCustomSkills, selectedType]);


  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }


  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    const card = db[index];
    if (direction === 'left') {
      setDismatch((prevDismatch) => {
        const updatedDismatch = [...prevDismatch, card];
        console.log('Updated Dismatch:', updatedDismatch);
        return updatedDismatch;
      });
    } else if (direction === 'right') {
      setMatch((prevMatch) => {
        const updatedMatch = [...prevMatch, card];
        console.log('Updated Match:', updatedMatch);
        return updatedMatch;
      });
    } else if (direction === 'down') {
      setQueryMatch((prevQueryMatch) => {
        const updatedQueryMatch = [...prevQueryMatch, card];
        console.log('Updated Query Match:', updatedQueryMatch);
        return updatedQueryMatch;
      });
    }
    console.log(`Swiped ${direction}`);
  };


  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  function Card(props) {
  

    return  (
      <TinderCard
        ref={childRefs[props.index]}
        key={props.character.name}
        className={styles.swipe}
        onSwipe={(dir) => swiped(dir, props.character.name, props.index)}
        onCardLeftScreen={() => outOfFrame(props.character.name, props.index)}
      >
        <div className={styles.card}>
        
          <div style={{display:'flex', marginLeft:'0.5em'}}>
            <div  className={styles.name}>{props.character.name}</div>
            <div className={styles.name}>{props.character?.position}</div>
            
          </div>
          <div className={styles.achive}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {props.character.skills &&
                props.character.skills.map((item, index) => (
                  <div style={{ margin: '1em' }} key={index}>
                    {item}
                  </div>
                ))}
            </div>
          </div>
          {props.character?.experience ? (<div className={styles.cardContent}>Опыт работы: {props.character?.experience}</div>):(<p></p>)}
          <div className={styles.cardContent}>Описание: {props.character.description || 'Данные не указаны'}</div>
          <div>
            {props.character.links && props.character.links.map((item, index) => (
              <div className={styles.linkStyle} key={index}> <a href={item}>{item}</a></div>
            ))}
          </div>
        </div>
      </TinderCard>
    );
  }
  


    return (
        <div className={styles.Screen}>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiLetsFind} className={styles.Decor} alt="" />
                <img src={words} className={styles.Message} alt="" />
                <p className={styles.MessageText}>Давай найдем тебе команду!</p>
            </header>
            <main className={styles.card}>
            {filteredDb.map((character, index) => (
              <Card character={character} index={index}/>
            ))}
            </main>
            <footer className={styles.Footer}>
                <img src={El} className={styles.El} alt="" />
                <Link to='/team'>Моя команда</Link>
                <Link to='/find'>Мэтчинг</Link>
                <Link to='/'>Профиль</Link>
            </footer>
        </div>
    );
}

export default Accept;
