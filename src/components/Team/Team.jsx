import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BadLotti, bell, Bg, Change, Delete, dislike, El, exit, Hard, like, LottiGrey, LottiSad, removeUser, TopBg, transfer } from '../../assets';
import styles from './Team.module.scss'
import axios from 'axios'
import WebApp from "@twa-dev/sdk"
import {BASEURL} from "../../config/config"

function Team() {
    const [TeamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const [Me, setMe] = useState(false);
    const [Name, setName] = useState("");

    useEffect(() => {
        LoadInfo();
    }, []);

    function LeaveTeam() {
        try {
            const InitData = WebApp.initData;
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/teams/quit`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
            .then(res => { 
                LoadInfo();
            })
        } catch {}
    }

    function BlockIn(props) {
        const navigate = useNavigate();
    
        function OpenU() {
            navigate("/usernextinfo", {state:{from: props.open}});
        }

        
        function ChangeLead() {
            try {
                const InitData = WebApp.initData;
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/teams/my/${props.gg}/change_lead`,
                    headers: {
                        "authorization": `TGMA ${InitData}`
                        // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                    }
                })
                .then(res => { 
                    LoadInfo();
                })
            } catch {}
        }

        function DeleteUser() {
            try {
                const InitData = WebApp.initData;
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/teams/my/${props.gg}/remove`,
                    headers: {
                        "authorization": `TGMA ${InitData}`
                        // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                    }
                })
                .then(res => { 
                    LoadInfo();
                })
            } catch {}
        }
        
        return (
            <>
                <div onClick={OpenU} className={styles.BlockIn}>
                    <div className={styles.Info}>
                        <div className={styles.InfoTog}>
                            <img src={props.image} className={styles.InfoImg} alt="" />
                            <h4>{props.Title}</h4>
                        </div>
                        <h5 className={styles.InfoTime}>{props.pos}</h5>
                    </div>
                    <div className={styles.Info}>
                        {props.type == 1 ?
                            <div className={styles.InfoTog}>
                                <img src={like} className={styles.InfoImg} alt="" />
                                <img src={dislike} className={styles.InfoImg} alt="" />
                            </div> : ""}
                        {props.type == 2 ?
                            <div className={styles.InfoTogColumn}>
                                <button className={styles.InfoApprove}>Пригласить в команду</button>
                                <a href="/">@MishaZhem</a>
                            </div> : ""}
                        {props.type == 3 ?
                            <div className={styles.InfoTogColumn}>
                                <button className={classNames(styles.InfoApprove, styles.ThirdType)}>Принять</button>
                                <button className={classNames(styles.InfoNot, styles.ThirdType)}>
                                    <h4 className={styles.InfoNotH}>Отклонить</h4>
                                </button>
                            </div> : ""}
                        {props.type == 4 ?
                            <div className={styles.TagsList}>{props.skills.map((member) => (
                                <div className={styles.InfoSkills}>
                                    <div className={styles.TagStroke}>
                                        <div className={styles.Tag}>
                                            <img src={Hard} className={styles.ImgP} />
                                            <p className={styles.TagP}>{member}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}</div> : ""}
                    </div>
                    {props.isLead ? (<p className={styles.Bold}>Leader</p>) : ""}
                    {Me && !props.isLead ? (
                        <div className={classNames(styles.InfoTog, styles.MarginLeft)}>
                            <img onClick={(e) => (e.stopPropagation(), ChangeLead())} src={transfer} className={styles.InfoImg2} alt="" />
                            <img onClick={(e) => (e.stopPropagation(), DeleteUser())} src={removeUser} className={styles.InfoImg2} alt="" />
                        </div>
                    ) : ""}
                </div>
                <hr className={styles.BlockInHr} />
            </>
    
        );
    }    

    function ChangeName(id) {
        try {
            const InitData = WebApp.initData;
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/teams/my/change_name/${id}`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    
                })
        } catch {}
    }

    function LoadInfo() {
        setIsLoading(true);
        try {
            const InitData = WebApp.initData;
            axios({
                method: 'get',
                url: `https://prod-o5.difhel.dev/teams/my`,
                // url: `https://prod-o5.difhel.dev/users/1368727604`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    setData(res.data.response);
                    console.log("pppp", res.data.response);
                    setName(res.data.response.name);
                    try {
                        let tg = window.Telegram.WebApp;
                        const Id = tg.initDataUnsafe.user.id;
                        if (Id == res.data.response?.lead?._id) {
                            setMe(true);
                        } else {
                            setMe(false);
                        }
                    } catch {
                
                    }
                    setIsLoading(false);
                })
        } catch {
            setIsLoading(false);
        }

    }

    return (
        <div className={styles.Screen}>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiGrey} className={styles.Decor} alt="" />
                <h2 className={styles.Title}>Моя команда<br/><span className={styles.DecsD}>{data?.is_true ? "валидная команда" : "невалидная команда"}</span></h2>
                <div onClick={() => LeaveTeam()} className={styles.notion2}>
                    <img src={exit} className={styles.Exit} alt="" />
                </div>
            </header>
            <div>
                {Me ? <input onChange={(e) => ChangeName(e.target.value)} defaultValue={data?.name} className={styles.NameInput} /> :
                <p className={styles.Name}>{data?.name}</p>}
                
                {/* <p className={styles.Decs}>{data?.description}</p> */}
                <div>
                    {data?.members.length >= 2 ? 
                        (data?.members.map((member) => (
                            <div key={member._id}>
                                {member?.profile && (
                                    <>
                                        <BlockIn gg={member?._id} isLead={member?._id != null && member?._id == data?.lead?._id} open={member} Title={member.first_name} pos={member.profile.position} skills={member.profile.skills} image={BASEURL + `/avatars/getAvatar?id=${member?._id}`} type={4} />
                                        {/* <p>First name: {member.profile.first_name}</p>
                                        <p>Position: {member.profile.position}</p>
                                        <p>Skills: {member.profile.skills.join(', ')} </p> */}
                                    </>
                                )}
                            </div>
                        )))  : 
                    <div className={styles.Sad}>
                        <div className={styles.SadTog}>
                            <img src={LottiSad} className={styles.SadImg} />
                            <h4 className={styles.SadH}>У вас нет команды</h4>
                        </div>
                    </div>}
                </div>
            </div>

            <div className={styles.L}>
                {TeamList.map((i, index) =>
                    <BlockIn Title={"Вы получили лайк!"} image={bell} type={1} />
                )}
                {/* <BlockIn Title={"Вы получили лайк!"} image={bell} type={1} />
                <BlockIn Title={"Взаимный лайк!"} image={bell} type={2} />
                <BlockIn Title={"Вас приглашают в команду!"} image={bell} type={3} /> */}

            </div>
            <footer className={styles.Footer}>
                <div className={styles.Activee}>
                    <Link className="Link" to='/team'>Моя команда</Link>
                    <img src={El} className={styles.El} alt="" />
                </div>
                <Link className="Link" to='/find'>Мэтчинг</Link>
                <Link className="Link" to='/'>Профиль</Link>
            </footer>
        </div>
    );
}

export default Team;
