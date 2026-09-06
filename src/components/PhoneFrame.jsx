export default function PhoneFrame({ children }) {
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-body">{children}</div>
      </div>
    </div>
  );
}
