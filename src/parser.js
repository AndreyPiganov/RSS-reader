import _ from 'lodash';

const parser = (data) => {
  const { contents } = data;
  const domParser = new DOMParser();
  const parseContent = domParser.parseFromString(contents, 'application/xml');
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
