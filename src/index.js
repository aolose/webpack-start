import './styles/index.scss'
document.body.appendChild(
    Object.assign(
        document.createElement('h1'),
        {
            innerHTML: 'Hello world',
            className: 'a'
        }
    )
);