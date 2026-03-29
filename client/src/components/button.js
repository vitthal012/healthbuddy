export default function Button({value,func}){
    return (
    <button onClick={()=>func()}>{value}</button>
    );
}