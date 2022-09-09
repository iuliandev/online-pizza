import React from "react";

import styles from "./NotFoundBlock.module.scss";

console.log(styles);

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>🙁</span>
        <br />
        Nothing found!
      </h1>
      <p className={styles.description}>The page you are looking for was moved, removed, renamed or might never existed</p>
    </div>
  );
};
