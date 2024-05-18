import "./index.scss";

<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'/>

interface IProps {
    callbackFn: () => void
}

export const Splashscreen: React.FC<IProps> = ({callbackFn}:IProps) => {

    return (
        <>
            <div className="container">
            <div className="glitch" data-text="MEASURES">SOFTWARE</div>
            <div className="glow">MEASURES</div>
            </div>
            <button onClick={() => {callbackFn()}} className="subtitle">Enter</button>
            <div className="scanlines"></div>
        </>
    )
}