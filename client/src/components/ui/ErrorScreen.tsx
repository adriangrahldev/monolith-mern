import { faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
    message: string
}

const ErrorScreen: React.FC<Props> = ({ message }) =>{ 
    return(
        <div className="w-screen h-screen fixed flex flex-col gap-2 items-center justify-center cursor-not-allowed">
            <FontAwesomeIcon className="animate-pulse" icon={faWarning} size="2x" />
            <h1>{message}</h1>
        </div>
    )
}


export default ErrorScreen