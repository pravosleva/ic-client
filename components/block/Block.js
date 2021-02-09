import styles from './block.module.scss';

const Block = ({ children, className }) => {
    return <div className={`${styles.block} ${className}`}>{children}</div>;
};

export default Block;
