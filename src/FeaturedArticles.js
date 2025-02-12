import React from 'react';
import { Card, Image } from 'semantic-ui-react';

// Added an 'id' field to each article so we can use it as a key.
const articles = [
  {
    id: 'react-vs-vue',
    title: 'React vs Vue',
    desc: 'Description - Difference between React or Vue',
    author: 'John Doe',
    rating: 5,
    image: 'https://www.mindinventory.com/blog/wp-content/uploads/2023/11/react-vs-vue.webp'
  },
  {
    id: 'nodejs-best-practices',
    title: 'NodeJS Best Practices',
    desc: 'Description - What is NodeJS',
    author: 'Will Smith',
    rating: 5,
    image: 'https://www.tatvasoft.com/blog/wp-content/uploads/2021/02/Node-js-Best-Practices-and-Security-768x389.jpg'
  },
  {
    id: 'understanding-react-hooks',
    title: 'Understanding React Hooks',
    desc: 'Description - What are React Hooks',
    author: 'James Smith',
    rating: 5,
    image: 'https://www.yourteaminindia.com/hs-fs/hubfs/Understanding%20React%20Hooks.png?width=1224&height=690&name=Understanding%20React%20Hooks.png'
  }
];

function FeaturedArticles() {
  return (
    <section style={{ padding: '20px' }}>
      <h2>Featured Articles</h2>
      <Card.Group itemsPerRow={3}>
        {articles.map((article) => (
          <Card key={article.id}>
            <Image src={article.image} alt={article.title} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{article.title}</Card.Header>
              <Card.Description>{article.desc}</Card.Description>
              <Card.Meta>
                {/* Removed emoji to fix accessibility issues */}
                Rating: {article.rating} by {article.author}
              </Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button>See all articles</button>
      </div>
    </section>
  );
}

export default FeaturedArticles;
