import './PageTitle.css'

export default function PageTitle({ title, slideDist }) {
    return ( 
        <h1 className={'title-fade-in-slide-up'} 
            style={{ fontFamily: 'Arial, Helvetica, sans-serif', color:'#f2e9e5', margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', '--slide-distance': slideDist}}>
            {title}
        </h1>
    )
}