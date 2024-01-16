import style from './profile.module.css'
import {Outlet} from "react-router-dom";
import {Navigation} from "../../components/body/profile/navigation/navigation";
import {FC} from "react";

export const Profile: FC = () => {
    return (
        <div className={style.view}>
            <main className={style.main}>
                <Navigation/>
                <Outlet/>
            </main>
        </div>
    )
}