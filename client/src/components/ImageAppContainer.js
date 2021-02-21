import React from 'react';

import LargeImage from './LargeImage';
import ThumbnailContainer from './ThumbnailContainer';
import previous from '../assets/previous.png';
import next from '../assets/next.png';
import './ImageAppContainer.scss';

class ImageAppContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeThumb: '',
            allThumbnails: [],
            allTemplates: [],
            activeTemplate: {
                cost: '',
                description: '',
                id: '',
                image: '',
                thumbnail: '',
                title: ''
            },
            visibleThumbs: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch("http://localhost:3001/imageAPI/allTemplates")
            .then((r) => r.text())
            .then((res) => {
                const allTemplates = JSON.parse(res);
                const allThumbnails = allTemplates.map((template) => template.thumbnail);
                this.setState(() => ({ 
                    allTemplates: allTemplates,
                    allThumbnails: allThumbnails,
                    activeTemplate: allTemplates[0],
                    activeThumb: allThumbnails[0],
                    visibleThumbs: allThumbnails.slice(0, 4),
                    loading: false
                 }));
            });
    }

    handleThumbnailClick = (thumbnail) => {
        const activeTemplate = this.state.allTemplates.find((t) => t.thumbnail === thumbnail);
        const activeThumb = activeTemplate.thumbnail;

        this.setState(() => ({ activeTemplate, activeThumb }));
    }

    handlePreviousClick = () => {
        let leftIndex = this.state.allThumbnails.indexOf(this.state.visibleThumbs[0]);
        let rightIndex = this.state.allThumbnails.indexOf(this.state.visibleThumbs[this.state.visibleThumbs.length - 1]);
        const indexDiff = rightIndex - leftIndex;

        leftIndex -= 4;
        rightIndex -= indexDiff; // subtract the diff to account for array not being divisable by 4
        this.setState((state) => ({
            visibleThumbs: state.allThumbnails.slice(leftIndex, rightIndex)
        }));
    }

    handleNextClick = () => {
        let leftIndex = this.state.allThumbnails.indexOf(this.state.visibleThumbs[0]);
        let rightIndex = this.state.allThumbnails.indexOf(this.state.visibleThumbs[this.state.visibleThumbs.length - 1]);
            
        leftIndex += 4;
        rightIndex += 5; // plus 5 because .slice(inclusiveIndex, exclusiveIndex) 
        this.setState((state) => ({
            visibleThumbs: state.allThumbnails.slice(leftIndex, rightIndex)
        }));
    }

    renderLargeImage() {
        const largeImage = this.state.loading ? <h2>LOADING</h2> : <LargeImage src={require(`../assets/large/${this.state.activeTemplate.image}`).default} alt={this.state.activeTemplate.image} />;
        return largeImage;
    }

    renderMetaData() {
        const { cost, description, id, image, thumbnail, title } = this.state.activeTemplate;

        return (
            <div className="meta-data">
                <div className="meta-text">Cost: {cost}</div>
                <div className="meta-text">Description: {description}</div>
                <div className="meta-text">ID: {id}</div>
                <div className="meta-text">Image: {image}</div>
                <div className="meta-text">Thumbnail: {thumbnail}</div>
                <div className="meta-text">Title: {title}</div>
            </div>
        );
    }

    renderButtons() {
        const leftIndex = this.state.allThumbnails.indexOf(this.state.visibleThumbs[0]);
        const rightIndex = this.state.allThumbnails.indexOf(this.state.visibleThumbs[this.state.visibleThumbs.length - 1]);

        return (
            <div>
                <img className={`nav-button ${leftIndex === 0 ? 'disabled' : ''}`} src={previous} alt='previous' onClick={this.handlePreviousClick} />
                <img className={`nav-button ${rightIndex === this.state.allTemplates.length - 1 ? 'disabled' : ''}`} src={next} alt='next' onClick={this.handleNextClick} />
            </div>
        );
    }

    renderThumbnails() {
        const thumbnails = this.state.loading ? <h2>LOADING</h2> : <ThumbnailContainer activeThumb={this.state.activeTemplate.thumbnail} thumbnails={this.state.visibleThumbs} handleThumbnailClick={this.handleThumbnailClick} />;
        return thumbnails;
    }

    render() {
        
        return (
            <div className="image-app-container">
                <div>
                    {this.renderLargeImage()}
                    {this.renderMetaData()}
                </div>
                {this.renderButtons()}
                {this.renderThumbnails()}
            </div>
        );
    }
}

export default ImageAppContainer;
