import React, {FC} from "react";
import styles from './productCard.module.scss';
import Image from "next/image";
import {MainButton} from "@/components/UI/MainButton/MainButton";
import {Product} from "@/types/products";

interface IProductCardProps {
    product: Product

}

export const ProductCard: FC<IProductCardProps> = ({product}) => {
    return (
        <div className={styles.product_card}>
            <div className={styles.product_card_preview}>
                {product.image ?
                    <Image src={'http://localhost:1337' + product.image.url} alt={'Телефон'} width={product.image.width}
                           height={product.image.height}/> : ''}
            </div>
            <span className={styles.product_card_title}>{product.title}</span>
            <div className={styles.product_card_description}>
                <div className={styles.product_card_prices}>
                     <span
                         className={styles.product_card_old_price}>{product.old_price ? <><span
                         className={styles.product_card_old_price_title}>{product.old_price} {product.currency}</span><span
                         className={styles.product_card_discount_size}>40%</span></> : ''}</span>
                    <h2>{product.price} {product.currency}</h2>
                </div>
                <MainButton fontSize={'16px'} padding={'11px 16px'}>Подробнее</MainButton>
            </div>
        </div>
    );
};