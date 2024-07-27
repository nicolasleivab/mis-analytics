import { useEffect } from "react";
import * as styles from "./Home.module.css";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.Home}>
      <h2>Home</h2>
      <Button onClick={() => navigate("/dashboard")}>Import csv</Button>
    </div>
  );
}
