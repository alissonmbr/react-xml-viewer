import { fireEvent, render, screen } from '@testing-library/react';
import XMLViewer from '..';

jest.mock('assets/svg/caret-right.svg', () => ({
  ReactComponent: () => <div data-testid="caret"></div>,
}));

describe('XMLViewer', () => {
  it('should render the xml with all types of elements', () => {
    const xml = `
      <?xml version="1.0"?>
      <books>
        <book>
          <name>The Hobbit</name>
          <author>J. R. R. Tolkien</author>
        </book>
        <book>
          <name>Brave New World</name>
          <author>Aldous Huxley</author>
        </book>
      </books>
      <multiLineText>
          multi line text 1
          multi line text 2
      </multiLineText>
      <inlineText>inline text</inlineText>
      <!-- <comment>inline comment</comment> -->
      <!-- 
        <comment>multi line comment 1</comment> 
        <comment>multi line comment 2</comment> 
      -->
      <cdata>
          <![CDATA[
            multi line cdata 1
            multi line cdata 2
          ]]>
      </cdata>
      <cdata><![CDATA[inline cdata]]></cdata>
      `;
    render(<XMLViewer xml={xml} />);
    expect(screen.getByText(/<\?/)).toBeInTheDocument();
    expect(screen.getByText('xml')).toBeInTheDocument();
    expect(screen.getByText('version')).toBeInTheDocument();
    expect(screen.getByText('"1.0"')).toBeInTheDocument();
    expect(screen.getByText(/\?>/)).toBeInTheDocument();
    expect(screen.getAllByText('books')).toHaveLength(2);
    expect(screen.getAllByText('book')).toHaveLength(4);
    expect(screen.getAllByText('name')).toHaveLength(4);
    expect(screen.getAllByText('author')).toHaveLength(4);
    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByText('J. R. R. Tolkien')).toBeInTheDocument();
    expect(screen.getByText('Brave New World')).toBeInTheDocument();
    expect(screen.getByText('Aldous Huxley')).toBeInTheDocument();
    expect(screen.getAllByText('multiLineText')).toHaveLength(2);
    expect(screen.getByText('multi line text 1')).toBeInTheDocument();
    expect(screen.getByText('multi line text 2')).toBeInTheDocument();
    expect(screen.getAllByText('inlineText')).toHaveLength(2);
    expect(screen.getByText('inline text')).toBeInTheDocument();
    expect(screen.getByText(/<comment>inline comment<\/comment>/)).toBeInTheDocument();
    expect(screen.getByText(/<comment>inline comment<\/comment>/)).toBeInTheDocument();
    expect(screen.getAllByText(/<!--/)).toHaveLength(2);
    expect(screen.getAllByText(/-->/)).toHaveLength(2);
    expect(screen.getAllByText('cdata')).toHaveLength(4);
    expect(screen.getAllByText(/<!\[CDATA\[/)).toHaveLength(2);
    expect(screen.getAllByText(/]]>/)).toHaveLength(2);
    expect(screen.getByText('multi line cdata 1')).toBeInTheDocument();
    expect(screen.getByText('multi line cdata 1')).toBeInTheDocument();
    expect(screen.getByText('inline cdata')).toBeInTheDocument();
  });

  it('should render invalid xml', () => {
    const xml = '!';
    render(<XMLViewer xml={xml} />);
    expect(screen.getByText('Invalid XML!')).toBeInTheDocument();
  });

  it('should collapse the xml', () => {
    const xml = `
      <?xml version="1.0"?>
      <book ref="1">
        The Hobbit
      </book>
    `;
    render(<XMLViewer xml={xml} collapsible />);
    expect(screen.getByText(/<\?/)).toBeInTheDocument();
    expect(screen.getByText('xml')).toBeInTheDocument();
    expect(screen.getByText('version')).toBeInTheDocument();
    expect(screen.getByText('"1.0"')).toBeInTheDocument();
    expect(screen.getByText(/\?>/)).toBeInTheDocument();
    expect(screen.getAllByText('book')).toHaveLength(2);
    expect(screen.getByText('ref')).toBeInTheDocument();
    expect(screen.getByText('"1"')).toBeInTheDocument();
    expect(screen.getByText('The Hobbit')).toBeInTheDocument();
    expect(screen.getByTestId('caret')).toBeInTheDocument();
    expect(screen.queryByText('...')).toBeNull();
    fireEvent.click(screen.getByTestId('caret'));
    expect(screen.getByText(/<\?/)).toBeInTheDocument();
    expect(screen.getByText('xml')).toBeInTheDocument();
    expect(screen.getByText('version')).toBeInTheDocument();
    expect(screen.getByText('"1.0"')).toBeInTheDocument();
    expect(screen.getByText(/\?>/)).toBeInTheDocument();
    expect(screen.getAllByText('book')).toHaveLength(2);
    expect(screen.queryByText('The Hobbit')).toBeNull();
    expect(screen.getByTestId('caret')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('should render empty xml', () => {
    const xml = '';
    const { container } = render(<XMLViewer xml={xml} />);
    expect(container.querySelector('.rxv-container')).toBeEmptyDOMElement;
  });

  it('should render empty tag', () => {
    const xml = '<emptyTag></emptyTag>';
    render(<XMLViewer xml={xml} />);
    expect(screen.getByText('emptyTag')).toBeInTheDocument();
    expect(screen.getByText(/</)).toBeInTheDocument();
    expect(screen.getByText(/\/>/)).toBeInTheDocument();
  });

  it('should collapse comment', () => {
    const xml = `
      <!-- comment -->
    `;
    render(<XMLViewer xml={xml} collapsible />);
    expect(screen.getByText('comment')).toBeInTheDocument();
    expect(screen.getByTestId('caret')).toBeInTheDocument();
    expect(screen.queryByText('...')).toBeNull();
    expect(screen.getByText(/<!--/)).toBeInTheDocument();
    expect(screen.getByText(/-->/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('caret'));
    expect(screen.queryByText('comment')).toBeNull();
    expect(screen.getByTestId('caret')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText(/<!--/)).toBeInTheDocument();
    expect(screen.getByText(/-->/)).toBeInTheDocument();
  });

  it('should start collapsed', () => {
    const xml = `
      <root>
        <level1>
          this should be collapsed
        </level1>
      </root>
    `
    render(<XMLViewer xml={xml} collapsible initialCollapsedDepth={1} />);
    expect(screen.getAllByText('root')).toHaveLength(2);
    expect(screen.getAllByText('level1')).toHaveLength(2);
    expect(screen.queryByText('this should be collapsed')).toBeNull();
    expect(screen.getByText('...')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('level1')[0]);
    expect(screen.getAllByText('root')).toHaveLength(2);
    expect(screen.getAllByText('level1')).toHaveLength(2);
    expect(screen.getByText('this should be collapsed')).toBeInTheDocument();
    expect(screen.queryByText('...')).toBeNull();
  });

  it('should show custom invalid xml component', () => {
    const xml = '<?xml';
    const invalidXml = <div>Custom Invalid XML</div>;
    render(<XMLViewer xml={xml} invalidXml={invalidXml} />);
    expect(screen.getByText('Custom Invalid XML')).toBeInTheDocument();
  });
});
