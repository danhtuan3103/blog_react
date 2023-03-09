import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';

import styles from './OtherLayout.module.scss';
function OtherLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default OtherLayout;
