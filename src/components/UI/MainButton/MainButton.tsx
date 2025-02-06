import React, {FC} from "react";
import styles from './mainButton.module.scss';

interface IMainButtonProps {
    fontSize: string;
    padding: string;
    children: React.ReactNode;
}

export const MainButton: FC<IMainButtonProps> = ({fontSize, padding, children}) => {

    return (
        <button style={{fontSize, padding}} className={styles.main_button}>
            {children}
        </button>
    );
};