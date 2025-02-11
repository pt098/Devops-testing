import React from 'react';
import { Card, Image } from 'semantic-ui-react'; // Import necessary components

const tutorials = [
  { title: 'JavaScript Tutorials', desc: 'Description- Learn A to Z JavaScript', author: 'John Smith', rating: 4, image: 'https://www.tutorialrepublic.com/lib/images/javascript-illustration.png' },
  { title: 'React Understanding', desc: 'Description- Learn React in 10 hours', author: 'Priyanshu Thakur', rating: 5, image: 'https://miro.medium.com/v2/resize:fit:2000/1*z0teiQBZw9e0iPWlD47jTw.png' },
  { title: 'ExpressJS Guide', desc: 'Description- Learn ExpressJS', author: 'Emilie', rating: 4.9, image: 'https://media.licdn.com/dms/image/D5612AQHqYWqhiP2bWQ/article-cover_image-shrink_720_1280/0/1713769258709?e=2147483647&v=beta&t=CYKXVlO-lUdX90cXS1wyXNkh9bJ61z7lE4TwzDDvCw0' },
];

function FeaturedTutorials() {
  return (
    <section style={{ padding: '20px' }}>
      <h2>Featured Tutorials</h2>
      <Card.Group itemsPerRow={3}>
        {tutorials.map((tutorial, index) => (
          <Card key={index}>
            <Image src={tutorial.image} alt={tutorial.title} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{tutorial.title}</Card.Header>
              <Card.Description>{tutorial.desc}</Card.Description>
              <Card.Meta>⭐ {tutorial.rating} by {tutorial.author}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button>See all tutorials</button>
      </div>
    </section>
  );
}

export default FeaturedTutorials;
