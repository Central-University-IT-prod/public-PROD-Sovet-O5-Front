import { Bg, Change, Delete, LottiGrey, TopBg } from '../../assets';
import Select, { components } from "react-select";
import styles from './ProfileAdmin.module.scss'
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import WebApp from "@twa-dev/sdk"

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


    function BlockTeam(props) {
        const [selectedUserId, setSelectedUserId] = useState('');
        const handleDeleteGroup = () => {
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/admin/remove_team/${props.id}`,
                    headers: {
                        "authorization": `TGMA ${InitData}`
                        // "authorization": `TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2570745753979475887&chat_type=sender&start_param=admin&auth_date=1712045331&hash=19a1ed0ce3004ef2bf8be04e72135f891486b176712d73fb688109e078842d01`
                    }
                })
                    .then(res => {
                        console.log(res);
                        LoadInfo();
                    });
            } catch (error) {
                console.error(error);
            }
        };
        const handleDeleteUser = () => {
            const InitData = WebApp.initData;
            try {
                console.log(`https://prod-o5.difhel.dev/admin/move_user/${selectedUserId.value}/${selectedUserId.value}`);
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/admin/move_user/${selectedUserId.value}/${selectedUserId.value}`,
                    headers: {
                        "authorization": `TGMA ${InitData}`
                        // "authorization": `TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2570745753979475887&chat_type=sender&start_param=admin&auth_date=1712045331&hash=19a1ed0ce3004ef2bf8be04e72135f891486b176712d73fb688109e078842d01`
                    }
                })
                    .then(res => {
                        console.log(res);
                        LoadInfo();
                    });
            } catch (error) {
                console.error(error);
            }
            document.getElementById("Modal" + props.gg).classList.add(styles.hidden)
        };

        let GG = [];
        for (let i = 0; i < props.members.length; i++) {
            GG.push({value: props.members[i]._id, label: props.members[i].first_name})
        }
        return (
            <div className={styles.BlockTeam}>
                <div onClick={(e) => e.stopPropagation()} id={"Modal" + props.gg} className={classNames(styles.Modal, styles.hidden)}>
                    <button style={{ background: 'transparent', border: 'none', fontSize: 'larger', float: 'right', color: 'white' }} 
                    onClick={() => document.getElementById("Modal" + props.gg).classList.add(styles.hidden)}> X</button>
                    <h4 style={{ marginBottom: '10px' }} >Удалить участника из {props.Title}:</h4>
                    <Select
                        options={GG}
                        onChange={setSelectedUserId}
                        styles={colourStyles}
                        components={{ Option: IconOption }}
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
                        })}/>
                    <button onClick={handleDeleteUser} className={styles.ButtonSave}>Удалить</button>
                </div>
                <div className={styles.BlockTeamButtons}>
                    <h3>{props.Title}</h3>
                    <h5>{props.description}</h5>
                </div>
                <div className={styles.BlockTeamButtons}>
                    <img onClick={handleDeleteGroup} src={Delete} alt="" className={styles.BlockTeamIco} />
                    <img onClick={(e) => (e.stopPropagation(), document.getElementById("Modal" + props.gg).classList.toggle(styles.hidden))} src={Change} alt="" className={styles.BlockTeamIco2} />
                </div>
            </div>
        );
    }
    
    function BlockPerson(props) {
        const [selectedTeamId, setSelectedTeamId] = useState('');
        const handleAddPerson = () => {
            const InitData = WebApp.initData;
            try {
                axios({
                    method: 'post',
                    url: `https://prod-o5.difhel.dev/admin/move_user/${props.id}/${selectedTeamId.value}`,
                    headers: {
                        "authorization": `TGMA ${InitData}`
                        // "authorization": `TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2570745753979475887&chat_type=sender&start_param=admin&auth_date=1712045331&hash=19a1ed0ce3004ef2bf8be04e72135f891486b176712d73fb688109e078842d01`
                    }
                })
                    .then(res => {
                        console.log(res);
                        LoadInfo();
                    });
            } catch (error) {
                console.error(error);
            }
            document.getElementById("Modal2" + props.gg).classList.add(styles.hidden)
        };
        
        let GG = [];
        for (let i = 0; i < props.teams.length; i++) {
            GG.push({value: props.teams[i]._id, label: props.teams[i].name})
        }

        return (
            <div className={styles.BlockTeam}>
                <div onClick={(e) => e.stopPropagation()} id={"Modal2" + props.gg} className={classNames(styles.Modal, styles.hidden)}>
                    <button
                        style={{ background: 'transparent', border: 'none', fontSize: 'larger', float: 'right', color: 'white' }}
                        onClick={() => document.getElementById("Modal2" + props.gg).classList.add(styles.hidden)}
                    >X</button>
                    <h4>Добавить участника в команду</h4>
                    <Select
                        options={GG}
                        onChange={setSelectedTeamId}
                        styles={colourStyles}
                        components={{ Option: IconOption }}
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
                        })}/>
                    <button onClick={() => handleAddPerson(selectedTeamId)} className={styles.ButtonSave}>Добавить</button>
                </div>
                <div className={styles.BlockTeamButtons}>
                    <h3>{props.Title}</h3>
                    <h5>{props.position || 'position'}</h5>
                </div>
                <div className={styles.BlockTeamButtons}>
                    <img onClick={(e) => (e.stopPropagation(), document.getElementById("Modal2" + props.gg).classList.toggle(styles.hidden))} src={Change} alt="" className={styles.BlockTeamIco2} />
                </div>
            </div>
        );
    }


    function LoadInfo() {
        setIsLoading(true);
        try {
            const InitData = WebApp.initData;
            let tg = window.Telegram.WebApp;
            axios({
                method: 'get',
                url: `https://prod-o5.difhel.dev/admin/get_teams`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2570745753979475887&chat_type=sender&start_param=admin&auth_date=1712045331&hash=19a1ed0ce3004ef2bf8be04e72135f891486b176712d73fb688109e078842d01`
                }
            })
                .then(res => {
                    setData(res.data);
                    console.log(res.data)
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
        label: members.members[0]?.first_name,
    }));


    const selectMembers = (selected) => {
        setSelectedMembers(selected);
    };

    const selectLead = (selected) => {
        setSelectedLead(selected);
    };

    useEffect(() => {
        if (data) {
            separateData(data);
        }
    }, [data]);


    const createGroup = () => {
        const res =  selectedMembers.map(member => member.value); res.push(parseInt(selectedLead.value));
        try {
            const requestData = {
                name: teamName,
                description: description,
                members: res,
                lead: parseInt(selectedLead.value)
            };
            console.log(requestData)
            const InitData = WebApp.initData;
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/admin/create_team`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1022917596%2C%22first_name%22%3A%22Andrew%22%2C%22last_name%22%3A%22C%22%2C%22username%22%3A%22AndrewE01%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2570745753979475887&chat_type=sender&start_param=admin&auth_date=1712045331&hash=19a1ed0ce3004ef2bf8be04e72135f891486b176712d73fb688109e078842d01`
                },
                data: requestData
            })
                .then(res => {
                    console.log(res);
                    LoadInfo();
                });
        } catch (error) {
            console.error(error);
        }
        document.getElementById("Modal3").classList.add(styles.hidden)
    };

    function separateData(data) {
        const zeroOrOneMember = [];
        const moreThanOneMember = [];

        data.response.forEach(item => {
            if (item.members.length == 1) {
                zeroOrOneMember.push(item);
            } else if (item.members.length > 1) {
                moreThanOneMember.push(item);
            }
        });

        setStateWithZeroOrOneMember(zeroOrOneMember);
        setStateWithMoreThanOneMember(moreThanOneMember);
    }
    console.log(stateWithZeroOrOneMember)

    return (
        <div onClick={() => document.getElementById("Modal").classList.add(styles.hidden)} className={styles.Screen}>
            <div onClick={(e) => e.stopPropagation()} id="Modal3" className={classNames(styles.Modal, styles.hidden)}>
                <button style={{ background: 'transparent', border: 'none', fontSize: 'larger', float: 'right', color: 'white' }} onClick={() => document.getElementById("Modal3").classList.add(styles.hidden)}> X</button>
                <h4>Добавить команду</h4>
                <input
                    name="teamName"
                    value={teamName}
                    className={styles.BlockInput}
                    onChange={handleInputChange}
                    placeholder='Название команды' />
                <input
                    name="description"
                    className={styles.BlockInput}
                    value={description}
                    onChange={handleInputChange}
                    placeholder='Описание' />
                <div>
                    <h4>Выберите участников</h4>
                    <Select
                        options={options}
                        isMulti
                        onChange={selectMembers}
                        styles={colourStyles2}
                        components={{ Option: IconOption }}
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
                    />
                </div>
                <div>
                    <h4>Выберите лидера:</h4>
                    <Select
                        options={options}
                        onChange={selectLead}
                        styles={colourStyles}
                        components={{ Option: IconOption }}
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
                    />
                </div>
                <button onClick={() => createGroup()} className={styles.ButtonSave}>Добавить команду</button>
            </div>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={LottiGrey} className={styles.Decor} alt="" />
                <h2 className={styles.Title}>Администратор</h2>
            </header>
            <div className={styles.L}>
                <div className={styles.HHHHHH}><h3 className={styles.LTitle}>Существующие команды:</h3> <button onClick={(e) => (e.stopPropagation(), document.getElementById("Modal3").classList.toggle(styles.hidden))} className={styles.ButtonSave} src={Change} alt="">Добавить</button></div>
                <div className={styles.List}>
                    {stateWithMoreThanOneMember.map((team, index) => (
                        <BlockTeam gg={index} key={index} id={team._id} members={team.members} description={team.description} Title={team.name} />
                    ))}
                </div>
                <h3 className={styles.LTitle}>Люди без команды:</h3>
                <div className={styles.List}>
                    {stateWithZeroOrOneMember.map((team, index) => (
                        <BlockPerson gg={index} key={index} teams={stateWithMoreThanOneMember} Title={team.members[0].first_name} position={team?.members[0]?.profile?.position || 'данные еще не заполнены'} id={team?._id || 105} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestAdmin;
