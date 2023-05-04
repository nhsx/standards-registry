import styles from './logo.module.scss';

const Logo = ({ owner, image_url }) => {
  return (
    <>
      {image_url && (
        <div className={styles.logo}>
          <img src={image_url} alt={`${owner} logo`} />
        </div>
      )}
    </>
  );
};

export default Logo;
