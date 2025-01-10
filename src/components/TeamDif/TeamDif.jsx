import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BadLotti, bell, Bg, Change, close, Delete, dislike, El, Hard, like, LottiGrey, LottiSad, LoveIco, TopBg } from '../../assets';
import styles from './TeamDif.module.scss'
import axios from 'axios'
import WebApp from "@twa-dev/sdk"
import {BASEURL} from "../../config/config"

function BlockIn(props) {
    const navigate = useNavigate();

    function OpenU() {
        navigate("/usernextinfo", {state:{from: props.open}});
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
            </div>
            <hr className={styles.BlockInHr} />
        </>

    );
}


function TeamDif() {
    const navigate = useNavigate();
    const [TeamList, setTeamList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const location = useLocation();
    const item = location.state;
    const Name = item.from.name;
    const Decs = item.from.description;
    const Members = item.from.members;
    const LeadId = item.from?.lead?.id;
    console.log(item, LeadId);

    return (
        <div className={styles.Screen}>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiGrey} className={styles.Decor} alt="" />
                <h2 className={styles.Title}>Команда пользователя</h2>
                <div onClick={() => navigate(-1)} className={styles.notion2}>
                    <img src={close} className={styles.MImg} alt="" />
                </div>
            </header>
            <div>
                <p className={styles.Name}>{Name}</p>
                <p className={styles.Decs}>{Decs}</p>
                <div>
                    {Members.length >= 2 ? 
                        (Members.map((member) => (
                            <div key={member._id}>
                                {member?.profile && (
                                    <>
                                        <BlockIn gg={member?.id} isLead={member?.id != null && member?.id == item.from?.lead?.id} open={member} Title={member.first_name} pos={member.profile.position} skills={member.profile.skills} image={BASEURL + `/avatars/getAvatar?id=${member?.id}`} type={4} />
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
                            <h4 className={styles.SadH}>Нет команды</h4>
                        </div>
                    </div>}
                </div>
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

export default TeamDif;
