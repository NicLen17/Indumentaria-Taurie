import { useRouteError } from 'react-router-dom'

function Error() {

    const error = useRouteError();

    return (
        <div>
            <h1>
                {error.statusText || error.message}
            </h1>
        </div>
    )
}

export default Error