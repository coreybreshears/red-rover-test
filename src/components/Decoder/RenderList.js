export default function RenderList({ list, isOdd }) {
  return (
    <>
      {list.map((item, index) => (
        <ul key={index} className={`${isOdd ? "odd" : ""}`}>
          <li>
            {item.text}
            {item.child ? (
              <RenderList list={item.child} isOdd={!isOdd} />
            ) : (
              <></>
            )}
          </li>
        </ul>
      ))}
    </>
  );
}
