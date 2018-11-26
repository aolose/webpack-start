import './styles/index.scss'

document.body.innerHTML = '<h4>A example for background-size width sprite image</h4>';


['a', 'b', 'c', 'd'].forEach(a => document.body.appendChild(
    Object.assign(
        document.createElement('div'),
        {
            className: a,
        }
    )
));

