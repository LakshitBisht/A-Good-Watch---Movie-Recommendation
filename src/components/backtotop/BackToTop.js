import "./BackToTop.css";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";

function BackToTop({ disable = false }) {
  return (
    <div className="back-to-top">
      <Button
        className="back-to-top-button"
        variant="contained"
        onClick={() => window.scrollTo(0, 0)}
        disabled={disable}
      >
        <KeyboardArrowUpIcon className="back-to-top-icon" fontSize="large" />
      </Button>
    </div>
  );
}

export default BackToTop;
