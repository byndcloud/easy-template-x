import { TemplateHandler } from 'src/templateHandler';
import { writeTempFile } from 'test/testUtils';
import { readFixture } from './fixtureUtils';

describe('link fixture', () => {

    it("inserts hyper link", async () => {

        const template = readFixture("link.docx");

        const data = {
            link: {
                _type: 'link',
                text: "It's easy...",
                target: 'https://github.com/alonrbar/easy-template-x'
            }
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(template, data);

        const docXml = await handler.getXml(doc);
        expect(docXml).toMatchSnapshot();

        // writeTempFile('link - output.docx', doc);
    });

    it("inserts hyper link in a loop", async () => {

        const template = readFixture("word_cv_template.docx");

        const data = {
            links: [
                {
                    link: {
                        _type: 'link',
                        text: "It's easy...",
                        target: 'https://github.com/alonrbar/easy-template-x'
                    }
                }
            ]
        };

        const handler = new TemplateHandler();
        const doc = await handler.process(template, data);

        // const docXml = await handler.getXml(doc);
        // expect(docXml).toMatchSnapshot();

        writeTempFile('links loop - output.docx', doc);
    });
});
