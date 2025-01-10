import styles from  './Profile.module.scss'
import {Approve, Bg, decor, El, ExampleIco, loader, Logo, LoveIco, notion, TopBg} from "../../assets"
import { useEffect, useState } from 'react';
import classNames from "classnames"
import Select, { components } from "react-select";
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import WebApp from "@twa-dev/sdk"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ProfileAdmin from "../ProfileAdmin/ProfileAdmin"

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label className={styles.LabelF}>
        <input className={styles.InputF} type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

const options = [
    { value: "frontend", label: "💅 фронт" },
    { value: "backend", label: "🪖 бэк"},
    { value: "mobile", label: "🏳️‍🌈 мобила"},
];

let HardSkills = [ 
    { value: "Python", label: "Python"}, 
    { value: "Java", label: "Java"}, 
    { value: "Kotlin", label: "Kotlin"}, 
    { value: "Go", label: "Go"}, 
    { value: "Swift", label: "Swift"}, 
    { value: "NodeJS", label: "NodeJS"}, 
    { value: "React", label: "React" }, 
    { value: "Vue", label: "Vue"}, 
    { value: "NextJS", label: "NextJs"}, 
    { value: "Flask", label: "Flask" }, 
    { value: "FastAPI", label: "FastAPI"}, 
    { value: "Docker", label: "Docker"}, 
    { value: "Перфоратор", label: "Перфоратор"}, 
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

function Block(props) {
    return (
        <div className={styles.Block}>
            <h5>{props.text}:</h5>
            <input defaultValue={props.Value} onClick={(e) => props.setValue(e.target.value)} placeholder={props.text} type="text" className={styles.BlockInput} />
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

const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
        setWho(inputValue);
    //   callback(filterColors(inputValue));
    }, 1000);
  };

function Profile() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
	const [CopyText, setCopyText] = useState(false);
    const [TextC, setTextC] = useState("Сохраните анкету!");
    const [What, setWhat] = useState({value: "фронт", label: "фронт"});
    const [Decs, setDecs] = useState("");
    const [experience, setExperience] = useState("");
    const [Links, setLinks] = useState([]);
    const [Skills, setSkills] = useState([]);
    const [Name, setName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Who, setWho] = useState({ value: "frontend", label: "💅 фронт" });

    const handleChange = () => {
        setChecked(!checked);
    };

    useEffect(() => {
        LoadInfo();
    }, [])

    try {
        let tg = window.Telegram.WebApp;
        if (tg.initDataUnsafe.start_param == "admin") {
            navigate("/admin");
            return <ProfileAdmin></ProfileAdmin>
        }
    } catch {}

    function LoadInfo() {
        setIsLoading(true);
        try {
            const InitData = WebApp.initData;
            let tg = window.Telegram.WebApp;
            axios({
                method: 'get',
                url: `https://prod-o5.difhel.dev/users/${tg.initDataUnsafe.user.id}`,
                // url: `https://prod-o5.difhel.dev/users/1368727604`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
            .then(res => {
                console.log("TEST", res);
                if (res.data.profile == null) {
                    setSkills([]);
                    setDecs("");
                    setLinks([]);
                    setExperience("");
                    setName("");
                    setLastName("");
                    setWho({ value: "Backend", label: "🪖 бэк"});
                    setIsLoading(false);    
                    return;
                }
                setDecs(res.data.profile.description);
                let Sk = [];
                for (let i = 0; i < res.data.profile.skills.length; i++) {
                    const val = res.data.profile.skills[i];
                    Sk.push({value: val, label: val})
                }
                console.log(Sk);
                setSkills(Sk);
                let Lin = [];
                for (let i = 0; i < res.data.profile.links.length; i++) {
                    const val = res.data.profile.links[i];
                    Lin.push({value: val, label: val})
                }
                setLinks(Lin);
                setExperience(res.data.profile.experience);
                setName(res.data.first_name);
                setLastName(res.data.last_name);
                if (res.data.profile.position == "backend") {
                    setWho({ value: "backend", label: "🪖 бэк"});
                } 
                if (res.data.profile.position == "mobile") {
                    setWho({ value: "mobile", label: "🏳️‍🌈 мобила"});
                }
                console.log(Who);
                setIsLoading(false);    
            })
        } catch {
            setIsLoading(false);
        }
    }

    function LinkTo(to) {
        try {
            const InitData = WebApp.initData;
            let tg = window.Telegram.WebApp;
            axios({
                method: 'get',
                url: `https://prod-o5.difhel.dev/users/${tg.initDataUnsafe.user.id}`,
                // url: `https://prod-o5.difhel.dev/users/1368727604`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }
            })
            .then(res => {
                if (res.data.profile == null) { }
                else {
                    navigate(to);
                    return;
                }
            })
        } catch {}  
        setTextC("Сохраните анкету!")
        setCopyText(true);
        setTimeout(() => (document.getElementById("BlockCopy")).setAttribute('style', `transition: transform 0.7s; transform: translateX(-1002px);`), 300);
        setTimeout(() => (document.getElementById("BlockCopy")).setAttribute('style', `transition: transform 0.7s; transform: translateX(1002px);`), 1700);
        setTimeout(() => setCopyText(false), 2500);
    }

    function Save() {
        try {
            let Sk = []
            for (let i = 0; i < Skills.length; i++) {
                Sk.push(Skills[i].value);
            }
            let Ln = []
            for (let i = 0; i < Links.length; i++) {
                Ln.push(Links[i].value);
            }
            let ans = {
                first_name: Name,
                last_name: LastName,
                position: Who.value,
                links: Ln,
                experience: experience,
                skills: Sk,
                description: Decs,
                show_in_search: !checked,
            }
            const InitData = WebApp.initData;
            let tg = window.Telegram.WebApp;
            axios({
                method: 'post',
                url: `https://prod-o5.difhel.dev/users/${tg.initDataUnsafe.user.id}`,
                // url: `https://prod-o5.difhel.dev/users/1368727604`,
                headers: {
                    "authorization": `TGMA ${InitData}`
                    // "authorization": `TGMA user=%7B%22id%22%3A1368727604%2C%22first_name%22%3A%22Mark%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22difhel%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-2849971755655524577&chat_type=private&start_param=admin&auth_date=1711910453&hash=9a8b781975fcae53a23c5df195f01d8b7a3d534779fd94b626434877cbf1a21c`
                }, 
                data: ans,
            })
            .then(res => { 
                setTextC("Анкета сохранена!")
                setCopyText(true);
                setTimeout(() => (document.getElementById("BlockCopy")).setAttribute('style', `transition: transform 0.7s; transform: translateX(-1002px);`), 300);
                setTimeout(() => (document.getElementById("BlockCopy")).setAttribute('style', `transition: transform 0.7s; transform: translateX(1002px);`), 1700);
                setTimeout(() => setCopyText(false), 2500);
            })
        } catch {
        }
    }
    
    return (
        !isLoading ?
        <div className={styles.Screen}>
			{CopyText ? <h1 id="BlockCopy" className={styles.BlockCopy}><p className={styles.BlockCopyText}>{TextC}</p></h1> : ""}
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={decor} className={styles.Decor} alt="" />
                <Link to='/accept' className={styles.notion}>
                    <img src={notion} alt="" />
                </Link>
                <h2 className={styles.TitlePerson}>{Name}</h2>
                <Link to='/query' className={styles.notion2}>
                    <img src={LoveIco} alt="" />
                </Link>
                {/* <img src={ExampleIco} className={styles.ImgLogo} alt="" /> */}
            </header>

            <main className={styles.List}>
                <div className={styles.Check}>
                    <h5>Направление</h5>
                    {!isLoading ? <Select 
                        id="CategorySelect"
                        cacheOptions={true}
                        loadOptions={loadOptions}
                        defaultValue={Who}
                        onChange={(choice) => setWho(choice)}
                        options={options}
                        // isDisabled={true}
                        components={{ Option: IconOption }}
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
                        defaultValue={Skills}
                        onChange={(choice) => setSkills(choice)}
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
                <div className={styles.Check}>
                    <h5>Ссылки на соцсети:</h5>
                    {!isLoading ? <CreatableSelect
                        isClearable={true} 
                        closeMenuOnSelect={false}
                        isSearchable
                        onChange={(choice) => setLinks(choice)}
                        components={animatedComponents}
                        defaultValue={Links}
                        isMulti={true}
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
                <div className={styles.Block}>
                    <h5>О себе:</h5>
                    <input defaultValue={Decs} onChange={(e) => setDecs(e.target.value)} placeholder={"О себе"} type="text" className={styles.BlockInput} />
                </div>
                <div className={styles.Block}>
                    <h5>Опыт:</h5>
                    <input defaultValue={experience} onChange={(e) => setExperience(e.target.value)} placeholder={"Опыт"} type="text" className={styles.BlockInput} />
                </div>
                <div className={styles.Block}>
                    <Checkbox
                        label="Скрыть меня в поиске?"
                        value={checked}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={Save} className={styles.ButtonSave}>Сохранить</button>
            </main>


            <footer className={styles.Footer}>
                <div className="Link" onClick={() => LinkTo('/team')}>Моя команда</div>
                <div className="Link" onClick={() => LinkTo('/find')}>Мэтчинг</div>
                <div className={styles.Activee}>
                    <div className="Link" onClick={() => LinkTo('/')}>Профиль</div>
                    <img src={El} className={styles.El} alt="" />
                </div>
            </footer>
        </div> : 
        <div className={styles.Loader}>
            <img alt='' src={loader} className={styles.LoaderImg} />
        </div>
    );
}

export default Profile
