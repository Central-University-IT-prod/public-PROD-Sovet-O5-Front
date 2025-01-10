import styles from './ShowUserNext.module.scss'
import { Approve, Bg, decor, El, ExampleIco, Logo, notion, TopBg } from "../../assets"
import { useEffect, useState } from 'react';
import classNames from "classnames"
import Select, { components } from "react-select";
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import WebApp from "@twa-dev/sdk"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ProfileAdmin from "../ProfileAdmin/ProfileAdmin";
import { useLocation } from 'react-router-dom';
import { BASEURL } from '../../config/config';
import Tooltip from '@atlaskit/tooltip';

const { Option } = components;
const IconOption = (props) => (
    <div className={classNames(styles.Bgh)}>
        <Option {...props} >
            <a href={props.data.label} className={styles.ChoosesH}>{props.data.label}</a>
        </Option>
    </div>
);

function Block(props) {
    return (
        <div className={styles.Block}>
            <h5>{props.text}:</h5>
            <input readOnly defaultValue={props.Value} placeholder={props.text} type="text" className={styles.BlockInput} />
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

function ShowUserNext() {
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state;
    const ID = item.from._id;
    console.log(item)
    
    let Links = [];
    let Ls = item.from.profile.links || [];
    for (let i = 0; i < Ls.length; i++) {
        Links.push({value: Ls[i], label: Ls[i]});
    }
    let Skills = [];
    const Sk = item.from.profile.skills || [];
    for (let i = 0; i < Sk.length; i++) {
        Skills.push({value: Sk[i], label: Sk[i]});
    }
    const Name = item.from.first_name;

    try {
        let tg = window.Telegram.WebApp;
        if (tg.initDataUnsafe.user.id == "admin") {
            navigate("/admin");
            return <ProfileAdmin></ProfileAdmin>
        }
    } catch { }

    return (
        <div className={styles.Screen}>
            <img src={TopBg} alt="" className={styles.Img} />
            <header className={styles.Main}>
                <img src={decor} className={styles.Decor} alt="" />
                <img src={BASEURL + `/avatars/getAvatar?id=${ID}`} className={styles.ImgLogo} alt="" />
                <h2 className={styles.TitlePerson}>{Name}</h2>
            </header>

            <main className={styles.List}>
                <div className={styles.Check}>
                    <Block text={"Направление"} Value={item.from.profile.position} />
                </div>
                <div className={styles.Check}>
                    <h5>Hard Skills:</h5>
                    <CreatableSelect
                        isClearable={true} 
                        closeMenuOnSelect={false}
                        isSearchable
                        components={animatedComponents}
                        defaultValue={Skills}
                        isDisabled={true}
                        onChange={(choice) => setSkills(choice)}
                        isMulti={true}
                        options={Skills}
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
                    />
                </div>
                <div className={styles.Check}>
                    <h5>Ссылки на соцсети:</h5>
                    <ul className={styles.Cus}>
                        {Links.map((item, index) => (
                            <li className={styles.li} key={item.index}><a className={styles.Light} href={item.value}>{item.label}</a></li>
                        ))}
                    </ul>
               
                </div>
                <Block text={"О себе"} Value={item.from.profile.description} />
                <Block text={"Опыт"} Value={item.from.profile.experience} />
            </main>


            <footer className={styles.Footer}>
                <Link className="Link" to='/team'>Моя команда</Link>
                <Link className="Link" to='/find'>Мэтчинг</Link>
                <div className={styles.Activee}>
                    <Link className="Link" to='/find'>Профиль</Link>

                    <img src={El} className={styles.El} alt="" />
                </div>
            </footer>
        </div>
    );
}

export default ShowUserNext