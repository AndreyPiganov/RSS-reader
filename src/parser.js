const parser = (data) =>{
    const typeContent = data.status.content_type.split(';')[0];
    const content_type = typeContent.includes('application/rss+xml') ? 'application/xml' : typeContent;
    const contents = data.contents;
    const domParser = new DOMParser();
    const parseContent = domParser.parseFromString(contents, content_type);
    const title = parseContent.querySelector('title').textContent
    const description = parseContent.querySelector('description').textContent;
    const items = parseContent.querySelectorAll('item');
    const objects = Array.from(items).map((item) => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        return {title, description, link};
    })
    return {feeds: {title: title, description: description}, posts: objects};
}
export default parser;