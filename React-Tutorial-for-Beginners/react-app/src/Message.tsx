// PascalCasing => We should capitalize the first letter of every word
// In react applications we should always follow PascalCasing, since other developers expect us to do so
// There are two ways to create a react component: either a JavaScript class or a function (a function is more convenient)
function Message(){
    // JSX: JavaScript XML
    const name = 'Mosh'
    if (name)
        return <h1>Hello {name}</h1>
    return <h1>Hello World</h1>
}

export default Message;