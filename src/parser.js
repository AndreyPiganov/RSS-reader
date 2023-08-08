import Feed from './components/Feed.js';

import Post from './components/Post.js';

const parser = (data) => {
  const { contents } = data;
  const domParser = new DOMParser();
  const parseContent = domParser.parseFromString(contents, 'application/xml');
  const titleFeed = parseContent.querySelector('title').textContent;
  const descriptionFeed = parseContent.querySelector('description').textContent;
  const items = parseContent.querySelectorAll('item');
  const objects = Array.from(items).map((item) => {
    return new Post(item);
  });
  return { feeds: new Feed(titleFeed, descriptionFeed), posts: objects };
};
export default parser;
