import React, {FC} from "react";
import styles from './breadcrumbs.module.scss';

interface IBreadcrumbsProps {
    items: string[];
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({items}) => {

    return (
        <div className={styles.breadcrumbs}>
            <ul className={styles.breadcrumbs__list}>
                <li className={styles.breadcrumbs__item}>
                    <a className={styles.breadcrumbs__link} href="#">
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.5 5.5V10.25C2.5 10.5261 2.72386 10.75 3 10.75H9C9.27614 10.75 9.5 10.5261 9.5 10.25V5.5"
                                stroke="#818699" stroke-width="0.625"></path>
                            <path d="M11 7L6.21213 2.21213C6.09498 2.09497 5.90503 2.09497 5.78787 2.21213L1 7"
                                  stroke="#818699" stroke-width="0.625" stroke-linecap="round"></path>
                        </svg>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 20L15.0358 12.4369C15.2875 12.2 15.2875 11.8 15.0358 11.5631L7 4"
                                  stroke-width="1.25" stroke-linecap="round"></path>
                        </svg>
                    </a>
                </li>
                {items.map((item, index) => (
                    <li className={styles.breadcrumbs__item} key={index}>
                        <a className={styles.breadcrumbs__link} href="#">
                            {item}
                            {index !== items.length - 1 && (
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 20L15.0358 12.4369C15.2875 12.2 15.2875 11.8 15.0358 11.5631L7 4"
                                          stroke-width="1.25" stroke-linecap="round"></path>
                                </svg>

                            )}
                        </a>

                    </li>
                ))}
            </ul>
        </div>
    );
};