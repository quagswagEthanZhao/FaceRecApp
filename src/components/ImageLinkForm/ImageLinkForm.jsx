import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ inputChange, detectClick }) => {
  return (
    <div className="imagelinkform">
      <p className="f6">
        {
          'This Magic Brain will detect yout face in your picture. Give it a try!'
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            style={{ margin: '0', width: '500px' }}
            className="f4 pa2 w90 center"
            type="text"
            onChange={(event) => inputChange(event)}
          />
          <button
            style={{ width: '23%' }}
            className="w-10 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={() => detectClick()}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
