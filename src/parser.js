const parser = (data) =>{
    const typeContent = data.status.content_type.split(';')[0];
    const content_type = typeContent.includes('application/rss+xml') ? 'application/xml' : typeContent;
    const contents = data.contents;
    const domParser = new DOMParser();
    const parseContent = domParser.parseFromString(contents, content_type);
    const title = parseContent.querySelector('title').textContent
    const description = parseContent.querySelector('description').textContent;
    console.log(parseContent)
    return {feeds: {title: title, description: description}};
}
export default parser;