import Feed from './components/Feed.js';

import Post from './components/Post.js';

const parser = (data) => {
  const { contents } = data;
  const domParser = new DOMParser();
  const parseContent = domParser.parseFromString(contents, 'application/xml');
  const parseError = parseContent.querySelector('parsererror');
  if (parseError) {
    throw new Error('parse');
  }
  const titleFeed = parseContent.querySelector('title').textContent;
  const descriptionFeed = parseContent.querySelector('description').textContent;
  const items = parseContent.querySelectorAll('item');
  const objects = Array.from(items).map((item) => new Post(item));
  return { feeds: new Feed(titleFeed, descriptionFeed), posts: objects.reverse() };
};
export default parser;
