import parse from 'html-react-parser';

class HTML {

    static parse(text: string) {
        // remove stylesheet
        text = text.replaceAll(/(style=")([a-zA-Z0-9:;\.\s\(\)\-\,]*)(")/gi, "");
        text = text.trim();
        return(parse(text));
    }

    static remove(text: string) {
        // remove html
        text = text.replace(/(<([^>]+)>)/gi, "");
        return text;
    }

    static remoteEntities(text: string) {
        // remove html entities
        text = text.replace(/&[a-z]+;/gi, "");
        return text;
    }

    static nl2br(text: string) {
        return(text.replace(/\n/g, '<br />'));
    }

}

export default HTML;