var contents = {
    multiPolyLine: null,
    content: null
};

function getContentFor(multipolyLine) {
    var result = "empty";
    if (multipolyLine !== null && contents.content !== null) {
        result = contents.content;
    }
    return result;
}

function createContentFor(multiPolyLine, content) {
    contents.multiPolyLine = multiPolyLine;
    contents.content = content;
}
