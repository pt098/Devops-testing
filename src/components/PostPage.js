import React, { useState } from 'react';
import { Container, Header, Form, Radio, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; // For navigation
import { db, storage } from './firebase'; // Firestore and Storage
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Storage functions
import PropTypes from 'prop-types';
import './PostPage.css';

const PostPage = () => {
  const [postType, setPostType] = useState('question'); // Default to "question"
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(''); // Submission confirmation message

  return (
    <Container className="post-container">
      <Header as="h2" className="page-header">New Post</Header>
      
      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <Link to="/" className="ui button">Home</Link>
        <Link to="/find-question" className="ui button">Find Questions</Link>
      </div>
      
      <Segment raised className="post-segment">
        <Form>
          {/* Post Type Selector */}
          <Form.Group inline className="post-type-selector">
            <label htmlFor="postTypeSelect">Select Post Type:</label>
            <Form.Field>
              <Radio
                label="Question"
                id="postTypeQuestion"
                name="postType"
                value="question"
                checked={postType === 'question'}
                onChange={() => setPostType('question')}
                className="post-radio"
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Article"
                id="postTypeArticle"
                name="postType"
                value="article"
                checked={postType === 'article'}
                onChange={() => setPostType('article')}
                className="post-radio"
              />
            </Form.Field>
          </Form.Group>

          {/* Conditional rendering based on Post Type */}
          {postType === 'question' ? (
            <QuestionForm
              loading={loading}
              setLoading={setLoading}
              setSubmissionMessage={setSubmissionMessage}
            />
          ) : (
            <ArticleForm
              loading={loading}
              setLoading={setLoading}
              setSubmissionMessage={setSubmissionMessage}
            />
          )}
        </Form>
        {/* Display submission message */}
        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
      </Segment>
    </Container>
  );
};

// QuestionForm Component
const QuestionForm = ({ loading, setLoading, setSubmissionMessage }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handlePost = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      await addDoc(collection(db, 'questions'), {
        title,
        description,
        tags,
        createdAt: new Date(),
      });
      setSubmissionMessage('Question has been submitted successfully!');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setLoading(false);
  };

  return (
    <Form className="post-form" loading={loading}>
      <Form.Field>
        <label htmlFor="questionTitle">Title</label>
        <input
          id="questionTitle"
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="questionDescription">Describe your problem</label>
        <textarea
          id="questionDescription"
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="questionTags">Tags</label>
        <input
          id="questionTags"
          placeholder="Please add up to 3 tags to describe what your question is about e.g. Java"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Field>
      <Button primary className="post-button" onClick={handlePost} disabled={loading}>
        Post
      </Button>
    </Form>
  );
};

QuestionForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSubmissionMessage: PropTypes.func.isRequired
};

// ArticleForm Component with Image Upload
const ArticleForm = ({ loading, setLoading, setSubmissionMessage }) => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null); // For handling the uploaded image
  const [imageURL, setImageURL] = useState('');

  const handleImageUpload = async () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.error('Upload error: ', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageURL(downloadURL);
        }
      );
    }
  };

  const handlePost = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    await handleImageUpload(); // Wait for the image upload to finish

    try {
      await addDoc(collection(db, 'articles'), {
        title,
        abstract,
        articleText,
        tags,
        imageURL,
        createdAt: new Date(),
      });
      setSubmissionMessage('Article has been submitted successfully!');
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
      setImageURL('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    setLoading(false);
  };

  return (
    <Form className="post-form" loading={loading}>
      <Form.Field>
        <label htmlFor="articleTitle">Title</label>
        <input
          id="articleTitle"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      
      <Form.Field>
        <label htmlFor="articleImage">Add an image:</label>
        <div className="image-upload-buttons">
          <input
            type="file"
            id="articleImage"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input"
          />
          <Button 
            onClick={(e) => { 
              e.preventDefault(); 
              handleImageUpload(); 
            }} 
            type="button"
            disabled={!image || loading}
          >
            Upload
          </Button>
        </div>
      </Form.Field>

      <Form.Field>
        <label htmlFor="articleAbstract">Abstract</label>
        <textarea
          id="articleAbstract"
          placeholder="Enter a 1 paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="articleText">Article Text</label>
        <textarea
          id="articleText"
          placeholder="Enter the full article text"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="articleTags">Tags</label>
        <input
          id="articleTags"
          placeholder="Please add up to 3 tags to describe what your article is about e.g. Java"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Field>
      <Button primary className="post-button" onClick={handlePost} disabled={loading}>
        Post
      </Button>
    </Form>
  );
};

ArticleForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSubmissionMessage: PropTypes.func.isRequired
};

export default PostPage;
