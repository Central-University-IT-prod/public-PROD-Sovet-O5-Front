import { Bg, Change, Delete, LottiGrey, TopBg } from '../../assets';
import Select, { components } from "react-select";
import styles from './TestAdmin.module.scss'
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';


let data = {
    "ok": true,
    "response": [
        {
            "name": "1",
            "description": "",
            "_id": 1022917596,
            "lead": {
                "_id": 1022917596,
                "profile": null
            },
            "members": [
                {
                    "_id": 1022917596,
                    "profile": null
                }
            ]
        },
        {
            "name": "2",
            "description": "",
            "_id": 2,
            "lead": {
                "_id": 2,
                "profile": null
            },
            "members": [
                {
                    "_id": 1022917596,
                    "profile": null
                }
            ]
        },
        {
            "name": "3",
            "description": "",
            "_id": 1368727604,
            "lead": {
                "_id": 1368727604,
                "profile": null
            },
            "members": [{
                "_id": 17,
                "profile": null
            },
            {
                "_id": 20,
                "profile": null
            },]
        },
        {
            "name": "4",
            "description": "",
            "_id": 1,
            "lead": {
                "_id": 1,
                "profile": null
            },
            "members": []
        },
        {
            "name": "admin team",
            "description": "test",
            "_id": -5,
            "lead": {
                "_id": 2,
                "profile": null
            },
            "members": [
                {
                    "_id": 1,
                    "profile": null
                },
                {
                    "_id": 2,
                    "profile": null
                },
                {
                    "_id": 1368727604,
                    "profile": null
                }
            ]
        }
    ]
}

function BlockTeam(props) {
    const [selectedUserId, setSelectedUserId] = useState('');
    const handleDeleteGroup = () => {
        try {
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/admin/remove_team/${props.id}`,
                headers: {
                    "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    console.log(res);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteUser = () => {
        try {
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/admin/remove_user/${selectedUserId}`,
                headers: {
                    "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    console.log(res);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.BlockTeam}>
            <div onClick={(e) => e.stopPropagation()} id="Modal" className={classNames(styles.Modal, styles.hidden)}>
                <h4>Удалить участника из команды {props.Title}:</h4>
                <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                    <option value="">Выберите команду</option>
                    {props.members?.map(member => (
                        <option key={member._id} value={member._id}>{member._id}</option>
                    ))}
                </select>
                <button onClick={handleDeleteUser} className={styles.ButtonSave}>Удалить</button>
            </div>
            <div className={styles.BlockTeamButtons}>
                <h3>{props.Title}</h3>
                <h5>Кол-во участников: 3/5</h5>
            </div>
            <div className={styles.BlockTeamButtons}>
                <img onClick={handleDeleteGroup} src={Delete} alt="" className={styles.BlockTeamIco} />
                <img onClick={(e) => (e.stopPropagation(), document.getElementById("Modal").classList.toggle(styles.hidden))} src={Change} alt="" className={styles.BlockTeamIco2} />
            </div>
        </div>
    );
}

function BlockPerson(props) {
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const handleAddPerson = () => {
        console.log(selectedTeamId)
        try {
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/admin/move_user/${props.id}/${selectedTeamId}`,
                headers: {
                    "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    console.log(res);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.BlockTeam}>
            <div onClick={(e) => e.stopPropagation()} id="Modal2" className={classNames(styles.Modal, styles.hidden)}>
                <h4>Добавить участника в команду</h4>
                <select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)}>
                    <option value="">Выберите команду</option>
                    {props.teams?.map(team => (
                        <option key={team._id} value={team._id}>{team.name}</option>
                    ))}
                </select>
                <button onClick={() => handleAddPerson(selectedTeamId)} className={styles.ButtonSave}>Добавить</button>
            </div>
            <div className={styles.BlockTeamButtons}>
                <h3>{props.Title}</h3>
                <h5>{props.position || 'position'}</h5>
            </div>
            <div className={styles.BlockTeamButtons}>
                <img onClick={(e) => (e.stopPropagation(), document.getElementById("Modal2").classList.toggle(styles.hidden))} src={Change} alt="" className={styles.BlockTeamIco2} />
            </div>
        </div>
    );
}



function TestAdmin() {
    const [stateWithZeroOrOneMember, setStateWithZeroOrOneMember] = useState([]);
    const [stateWithMoreThanOneMember, setStateWithMoreThanOneMember] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [selectedLead, setSelectedLead] = useState('')
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
            axios({
                method: 'get',
                url: `https://prod-o5.difhel.dev/admin/get_commands`,
                headers: {
                    // "authorization": `TGMA ${InitData}`
                    "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
                .then(res => {
                    setData(res.data.response);
                    console.log(res.data.response)
                    setIsLoading(false);
                })
        } catch {
            setIsLoading(false);
        }
    }

    const handleInputChange = (event) => {
        if (event.target.name === 'teamName') {
            setTeamName(event.target.value);
        } else if (event.target.name === 'description') {
            setDescription(event.target.value);
        }
    };
    const options = stateWithZeroOrOneMember.map((members) => ({
        value: members.members[0]?._id,
        label: members.members[0]?._id,
      }));
    

    const selectMembers = (selected) => {
        setSelectedMembers(selected);
    };

    const selectLead = (selected) => {
        setSelectedLead(selected);
    };

    useEffect(() => {
        separateData(data);
    }, []);


    const createGroup = () => {
        try {
          const requestData = {
            name: teamName,
            description: description,
            members: selectedMembers,
            lead: selectedLead
          };
          console.log(requestData)
      
          axios({
            method: 'post',
            url: `https://prod-o5.difhel.dev/admin/create_team`,
            headers: {
              "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
            },
            data: requestData
          })
            .then(res => {
              console.log(res);
            });
        } catch (error) {
          console.error(error);
        }
      };

    function separateData(data) {
        const zeroOrOneMember = [];
        const moreThanOneMember = [];

        data.response.forEach(item => {
            if (item.members.length <= 1) {
                zeroOrOneMember.push(item);
            } else {
                moreThanOneMember.push(item);
            }
        });

        setStateWithZeroOrOneMember(zeroOrOneMember);
        setStateWithMoreThanOneMember(moreThanOneMember);
    }
    console.log(stateWithMoreThanOneMember)

    return (
        <div onClick={() => document.getElementById("Modal").classList.add(styles.hidden)} className={styles.Screen}>
            <div onClick={(e) => e.stopPropagation()} id="Modal3" className={classNames(styles.Modal, styles.hidden)}>
                <h4>Добавить команду</h4>
                <input
                    name="teamName"
                    value={teamName}
                    onChange={handleInputChange}
                    placeholder='Название команды' />
                <input
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    placeholder='Описание' />
                <div>
                    <h4>Выберите опции:</h4>
                    <Select
                        options={options}
                        isMulti
                        onChange={selectMembers}
                    />
                </div>
                <div>
                    <h4>Выберите опции:</h4>
                    <Select
                        options={options}
                        onChange={selectLead}
                    />
                </div>
                <button onClick={() => createGroup()} className={styles.ButtonSave}>Удалить</button>
            </div>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiGrey} className={styles.Decor} alt="" />
                <h2 className={styles.Title}>Администратор</h2>
            </header>
            <div className={styles.L}>
                <h3 className={styles.LTitle}>Существующие команды: <button onClick={(e) => (e.stopPropagation(), document.getElementById("Modal3").classList.toggle(styles.hidden))} src={Change} alt="" className={styles.BlockTeamIco2}>Добавить</button></h3>
                <div className={styles.List}>
                    {stateWithMoreThanOneMember.map((team, index) => (
                        <BlockTeam key={index} id={team._id} members={team.members} Title={team.name} />
                    ))}
                </div>
                <h3 className={styles.LTitle}>Люди без команды:</h3>
                <div className={styles.List}>
                    {stateWithZeroOrOneMember.map((team, index) => (
                        <BlockPerson key={index} teams={stateWithMoreThanOneMember} Title={team.name} position={team?.members[0]?.profile?.position} id={team?._id || 105} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestAdmin;
