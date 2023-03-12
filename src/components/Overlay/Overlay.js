import { memo } from 'react';
import styles from './Overlay.module.scss';

function Overlay({ onClose, children }) {
    return (
        <div className={styles.wrapper} onClick={onClose}>
            {children}
        </div>
    );
}

export default memo(Overlay);
