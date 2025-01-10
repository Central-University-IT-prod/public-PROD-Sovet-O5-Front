import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { bell, Bg, Change, Delete, dislike, El, FullDisLike, FullLike, like, LottiGrey, TopBg } from '../../assets';
import styles from './Accept.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios'
import WebApp from "@twa-dev/sdk"

function Accept() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    useEffect(() => {
        LoadInfo();
    }, []);

    function LoadInfo() {
        setIsLoading(true);
        try {
            {/*const InitData = WebApp.initData;
            let tg = window.Telegram.WebApp;*/}
            const InitData = WebApp.initData;
            axios({
                method: 'get',
                url: `https://prod-o5.difhel.dev/reactions`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    setData(res.data.response);
                    console.log("222", res.data.response)
                    setIsLoading(false);
                    console.log('not err')
                })
        } catch {
            setIsLoading(false);
        }
    }


    function BlockIn(props) {

        function Like() {
            console.log(`https://prod-o5.difhel.dev/users/${props.GG}/like`);
            // LIKE
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    // url: `https://prod-o5.difhel.dev/users/${tg.initDataUnsafe.user.id}`,
                    url: `https://prod-o5.difhel.dev/users/${props.GG}/like`,
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
            document.getElementById("Like" + props.id).setAttribute('src', FullLike);
            document.getElementById(props.id).classList.add(styles.hidden);
        }
        
        function DisLike() {
            // DISLIKE
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/users/${props.GG}/dislike`,
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
            document.getElementById("DisLike" + props.id).setAttribute('src', FullDisLike);
            document.getElementById(props.id).classList.add(styles.hidden);
        }

        function Invite() {
            // DISLIKE
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/reactions/send_join_request/${props.GG}`,
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
            document.getElementById(props.id).classList.add(styles.hidden);
        }

        function Approve() {
            // DISLIKE
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/reactions/join_request/${props.GG}/approve`,
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
            document.getElementById(props.id).classList.add(styles.hidden);
        }

        function Deny() {
            // DISLIKE
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/reactions/join_request/${props.GG}/deny`,
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
            document.getElementById(props.id).classList.add(styles.hidden);
        }
    
        return (
            <>
                <div id={props.id} className={styles.BlockIn}>
                    <div className={styles.Info}>
                        <div className={styles.InfoTog}>
                            <img src={props.image} className={styles.InfoImg} alt="" />
                            <Link to="/userinfo" state={{ from: props.item }}>
                                    {props.Title}
                            </Link>
                        </div>
                        <h4>{props.team || props.description}</h4>
                    </div>
                    <div>
                        {props.type == 1 ?
                            <div className={styles.InfoTog}>
                                <img onClick={Like} src={like} className={styles.InfoImg} alt="" />
                                <img onClick={DisLike} src={dislike} className={styles.InfoImg} alt="" />
                            </div>
                            : ""}
                        {props.type == 4 ?
                            <div className={styles.InfoTogColumn}>
                                <Link to="/userinfo" state={{ from: props.item }}>
                                    {props.lead}
                                </Link>
                                <button onClick={Invite} className={styles.InfoApprove}>Пригласить в команду</button>
                            </div> : ""}
                        {props.type == 3 ?
                            <div className={styles.InfoTogColumn}>
                                <button onClick={Approve} className={classNames(styles.InfoApprove, styles.ThirdType)}>Принять</button>
                                <button onClick={Deny} className={classNames(styles.InfoNot, styles.ThirdType)}>
                                    <h4 className={styles.InfoNotH}>Отклонить</h4>
                                </button>
                            </div> : ""}
                    </div>
                </div>
                <hr className={styles.BlockInHr} />
            </>
    
        );
    }


    return (
        <div className={styles.Screen}>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiGrey} className={styles.Decor} alt="" />
                <h2 className={styles.Title}>Уведомления</h2>
            </header>
            <div className={styles.L}>
                {data?.map((item, index) => (
                    <BlockIn
                        item={item}
                        id={"KKK" + index}
                        Title={item?.user?.first_name}
                        key={item?.user?._id}
                        GG={item?.user?._id}
                        image={bell}
                        type={item.type}
                        lead={item?.user?.team?.lead?.first_name}
                        team={item?.user?.team?.name}
                        description={item?.user?.profile?.description} />
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

export default Accept;
