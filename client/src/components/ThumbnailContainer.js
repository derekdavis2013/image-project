import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail';

class ThumbnailContainer extends React.PureComponent {
    renderThumbnails() {
        const thumbnails = [];

        this.props.thumbnails.forEach((thumbnail) => {
            const thumbSrc = require(`../assets/thumbnails/${thumbnail}`).default;

            thumbnails.push(
                <Thumbnail
                    key={thumbnail}
                    thumbnail={thumbnail}
                    src={thumbSrc}
                    alt={thumbnail}
                    isActive={thumbnail === this.props.activeThumb}
                    onClick={this.props.handleThumbnailClick}
                />
            );
        });

        return thumbnails;
    }


    render() {
        return (
            <div>
                {this.renderThumbnails()}
            </div>
        );
    }
}

ThumbnailContainer.propTypes = {
    activeThumb: PropTypes.string.isRequired,
    thumbnails: PropTypes.array.isRequired,
    handleThumbnailClick: PropTypes.func.isRequired
}

export default ThumbnailContainer;
