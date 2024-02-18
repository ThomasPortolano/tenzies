export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="dice active" style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  );
}
