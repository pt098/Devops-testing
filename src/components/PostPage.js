import React, { useState } from 'react';
import { Container, Header, Form, Radio, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { db, storage } from './firebase'; // Importing Firestore and Storage
import { collection, addDoc } from 'firebase/firestore'; // For Firestore database
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // For Firebase Storage
import './PostPage.css';

const PostPage = () => {
  const [postType, setPostType] = useState('question'); // Default to "Question" of type
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(''); // To show submission confirmation

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
            <label>Select Post Type:</label>
            <Form.Field>
              <Radio
                label="Question"
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
        {/* Submission message displayed here */}
        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
      </Segment>
    </Container>
  );
};

// Question Form Component
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
        <label>Title</label>
        <input
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Describe your problem</label>
        <textarea
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <input
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

// Article Form Component with Image Upload
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
        imageURL, // Save the image URL
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
        <label>Title</label>
        <input
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      
      {/* Image upload UI with Browse and Upload buttons */}
      <Form.Field>
        <label>Add an image:</label>
        <div className="image-upload-buttons">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input"
          />
          <Button 
            onClick={(e) => { 
              e.preventDefault(); // Prevent the button from submitting the form
              handleImageUpload(); 
            }} 
            type="button" // Specify that this button does not submit the form
            disabled={!image || loading}
          >
            Upload
          </Button>
        </div>
      </Form.Field>

      <Form.Field>
        <label>Abstract</label>
        <textarea
          placeholder="Enter a 1 paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <textarea
          placeholder="Enter the full article text"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <input
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

export default PostPage;
