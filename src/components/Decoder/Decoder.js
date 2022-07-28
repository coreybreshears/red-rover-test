import { useRef, useState } from "react";
import decodeString from "../../utils/decodeString";
import RenderList from "./RenderList";

const Decoder = () => {
  const decodeTextRef = useRef();
  const [decodedList, setDecodedList] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const decode = () => {
    const decodeText = decodeTextRef.current.value.replace(/\s/g, "");

    try {
      setDecodedList(decodeString(decodeText));
      setErrMsg("");
    } catch (error) {
      setErrMsg("Invalid input");
    }
  };

  return (
    <div className="decoder">
      <div className="flex">
        <input className="decoder--text-input" ref={decodeTextRef} />
        <button onClick={() => decode()}>Decode</button>
      </div>
      <div className="decoder--err-msg">{errMsg}</div>
      {!errMsg && <RenderList list={decodedList} isOdd={false} />}
    </div>
  );
};

export default Decoder;
