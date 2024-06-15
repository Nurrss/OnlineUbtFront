import styles from './ErrorDisplay.module.css'

export const ErrorDisplay = ({ errorMessage }) => {
    return (
      <div className={styles.responseError}>
        {errorMessage}
      </div>
    );
  };