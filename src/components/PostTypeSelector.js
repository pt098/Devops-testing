import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const PostTypeSelector = ({ postType, setPostType }) => {
  return (
    <Form>
      <Form.Group inline>
        <label htmlFor="postTypeSelect">Select Post Type:</label>
        <Form.Radio
          label="Question"
          id="postTypeQuestion"
          value="question"
          checked={postType === 'question'}
          onChange={() => setPostType('question')}
        />
        <Form.Radio
          label="Article"
          id="postTypeArticle"
          value="article"
          checked={postType === 'article'}
          onChange={() => setPostType('article')}
        />
      </Form.Group>
    </Form>
  );
};

PostTypeSelector.propTypes = {
  postType: PropTypes.string.isRequired,
  setPostType: PropTypes.func.isRequired
};

export default PostTypeSelector;
