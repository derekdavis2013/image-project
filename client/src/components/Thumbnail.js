import './Thumbnail.scss';

function Thumbnail(props) {
    return(
        <div className="thumbnail">
            <img className={props.isActive ? 'active' : ''} src={props.src} alt={props.alt} onClick={() => props.onClick(props.thumbnail)} />
        </div>
    );
}

export default Thumbnail;
