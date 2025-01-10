import axios from 'axios';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bell, Bg, Change, Delete, dislike, El, FullDisLike, FullLike, like, LottiGrey, TopBg } from '../../assets';
import styles from './Query.module.scss'
import {BASEURL} from "../../config/config"
import WebApp from "@twa-dev/sdk"

function Like(id) {
    // LIKE
    try {
        const InitData = WebApp.initData;
        axios({
            method: 'post',
            // url: `https://prod-o5.difhel.dev/users/${tg.initDataUnsafe.user.id}`,
            url: `https://prod-o5.difhel.dev/users/${id}/like`,
            headers: {
                "authorization": `TGMA ${InitData}`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            }
        })
        .then(res => {
        console.log("222", res);
        LoadInfo();
            // setDataBase(res.data.response.profile);
            console.log(222);
        })
    } catch {}
    document.getElementById("Like" + id).setAttribute('src', FullLike);
    document.getElementById(id).classList.add(styles.hidden);
}

function DisLike(id) {
    // DISLIKE
    try {
        const InitData = WebApp.initData;
        axios({
            method: 'post',
            url: `https://prod-o5.difhel.dev/users/${id}/dislike`,
            // url: `https://prod-o5.difhel.dev/users/1368727604/like`,
            headers: {
                "authorization": `TGMA ${InitData}`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            }
        })
        .then(res => {
            // setDataBase(res.data.response.profile);
          LoadInfo();

            console.log(222);
            console.log(res);

        })
    } catch {}
    document.getElementById("DisLike" + id).setAttribute('src', FullDisLike);
    document.getElementById(id).classList.add(styles.hidden);
}

function BlockIn(props) {
    return (
        <>
            <div id={props.id} className={styles.BlockIn}>
                <div className={styles.Info}>
                    <div className={styles.InfoTog}>
                        <img src={props.image} className={styles.InfoImg} alt="" />
                        <h4>{props.Title}</h4>
                    </div>
                    <h5 className={styles.InfoTime}>{props.position}</h5>
                </div>
                <div>
                    <div className={styles.InfoTog}>
                        <img id={"Like" + props.id} onClick={() => Like(props.id)} src={like} className={styles.InfoImg} alt="" />
                        <img id={"DisLike" + props.id} onClick={() => DisLike(props.id)} src={dislike} className={styles.InfoImg} alt="" />
                    </div>
                </div>
            </div>
            <hr className={styles.BlockInHr} />
        </>

    );
}
function Query() {
    
    const [ListUser, setListUsers] = useState([]);

    useEffect(() => {
        const InitData = WebApp.initData;
        axios({
            method: 'get',
            url: `https://prod-o5.difhel.dev/users/deferred`,
            headers: {
                "authorization": `TGMA ${InitData}`
                // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            }
        })
        .then(res => {
            console.log("response", res);
            setListUsers(res.data.response);
        })
    }, []);

    return (
        <div className={styles.Screen}>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiGrey} className={styles.Decor} alt="" />
                <h2 className={styles.Title}>Избранное</h2>
            </header>
            <div className={styles.L}>
                {ListUser.map((item) => (
                    <BlockIn id={item.id} position={item.profile.position} Title={item.first_name} key={item.id} user={'@Scarlett'} image={BASEURL + `/avatars/getAvatar?id=${item.id}`} type={item.type} />
                ))}
            </div>
            <footer className={styles.Footer}>
                <Link to='/team'>Моя команда</Link>
                <Link to='/find'>Мэтчинг</Link>
                <Link to='/'>Профиль</Link>
            </footer>
        </div>
    );
}

export default Query;
