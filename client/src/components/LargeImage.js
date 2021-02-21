import './LargeImage.scss';

function LargeImage(props) {
    return(
        <div className="large-image">
            <img src={props.src} alt={props.alt} />
        </div>
    );
}

export default LargeImage;
