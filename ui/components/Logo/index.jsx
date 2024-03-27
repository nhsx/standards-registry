import styles from './logo.module.scss';

const onError = (event) => {
  event.target.style.display = 'none';
};

const Logo = ({ owner, image_url }) => {
  return (
    <>
      {image_url && (
        <div className={styles.logo}>
          <img src={image_url} alt={`${owner} logo`} onError={onError} />
        </div>
      )}
    </>
  );
};

export default Logo;
