import React, {FC} from "react";
import styles from './secondButton.module.scss';

interface ISecondButtonProps {
    fontSize: string;
    padding: string;
    onClick: () => void;
    children: React.ReactNode;
}

export const SecondButton: FC<ISecondButtonProps> = ({fontSize, padding, children, onClick}) => {

    return (
        <button style={{fontSize, padding}} onClick={onClick} className={styles.second_button}>
            {children}
        </button>
    );
};