import _ from 'lodash';

const parser = (data) => {
  const typeContent = data.status.content_type.split(';')[0];
  const contentType = typeContent.includes('application/rss+xml') ? 'application/xml' : typeContent;
  const { contents } = data;
  const domParser = new DOMParser();
  const parseContent = domParser.parseFromString(contents, contentType);
  const titleFeed = parseContent.querySelector('title').textContent;
  const descriptionFeed = parseContent.querySelector('description').textContent;
  const items = parseContent.querySelectorAll('item');
  const objects = Array.from(items).map((item) => {
    const id = _.uniqueId();
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    return {
      title, description, link, id,
    };
  });
  return { feeds: { title: titleFeed, description: descriptionFeed }, posts: objects };
};
export default parser;
