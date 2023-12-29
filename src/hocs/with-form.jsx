const {useCallback} = require("react");
const {useState} = require("react");


export const withForm = (WrappedComponent, init) => (props) => {
    const [data, setData] = useState(init);
    const [error, setError] = useState(getInitErrors());

    function getInitErrors() {
        let result = {};
        for (const prop in init) {
            if (!Object.hasOwnProperty(prop)) {
                result[prop] = false;
            }
        }
        return result;
    }

    const validate = useCallback(() => {
        let obj = {};
        let hasErrors = false;
        for (const prop in data) {
            if (!Object.hasOwnProperty(prop)) {
                obj[prop] = data[prop].length === 0;
                hasErrors |= data[prop].length === 0;
            }
        }
        setError({...error, ...obj});
        return !hasErrors;
    }, [data, error]);

    const onValueChange = useCallback((e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        setError({
            ...error,
            [e.target.name]: false
        });
    }, [data, error]);

    return (
        <WrappedComponent onValueChange={onValueChange} validate={validate} data={data} error={error} {...props}/>
    )
}