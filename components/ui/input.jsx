export function Input(props) {
    return <input {...props} className={`border p-2 rounded-md ${props.className}`} />;
  }

export default Input;
