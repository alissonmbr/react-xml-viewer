import type { Meta, StoryObj } from '@storybook/react';
import XMLViewer from 'components/XMLViewer';
import { defaultTheme } from 'contants';

const xmlString = `
<?xml version="1.0"?>
<?test?>
<example
   description1="XML Example" description2="XML Example" description3="XML Example"
   description4="XML Example" description5="XML Example" description6="XML Example"
   description7="XML Example" description8="XML Example" description9="XML Example"
   flag="11">
   <long

      attr="1111111111111111111111111111 111111111111111111111111111111111111111111111111 11111111111111111 111111111111111111111 11111111111111 1111111111111 11111111111111111111111111111111111111111111 111111111111111111111 1111111111111111111111"
   >
   Long attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attributeLong attribute
   </long>
   <inlineLong attr="111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111">111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</inlineLong>
   <hello id="hello" value="world">World</hello>
   <a>wow</a>
   <a> wow again <c> unlimited </c>
   </a>
   <books>
      <book ref="1">
         <name>Book 1</name>
         <authors>
            <author>
               <name>Author 1</name>
            </author>
            <author>
               <name>Author 2</name>
            </author>
         </authors>
      </book>
      <book ref="2">
         <name>Book 2</name>
         <authors>
            <author>
               <name>Author 3</name>
            </author>
         </authors>
      </book>
   </books>
   <texts id="0">
      a
      b
      c
   </texts>
   <!-- <comment>example</comment> -->
   <!-- 
      <comment>example</comment> 
      <comment>example</comment>
   <comment>example</comment> 
   -->
   <cdata><![CDATA[
      <foo></bar>
                ]]>
      <![CDATA[<foo></bar>]]>
   </cdata>
   <cdata><![CDATA[<foo></bar>]]></cdata>
   <?go example?>
</example>
`;

const meta = {
  title: 'ReactXmlViewer',
  component: XMLViewer,
  argTypes: {
    invalidXml: {
      table: {
         
        disable: true,
      },
    },
  },
} satisfies Meta<typeof XMLViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    xml: xmlString,
    indentSize: 2,
    collapsible: true,
    theme: defaultTheme,
    initalCollapsedDepth: undefined
  },
};
