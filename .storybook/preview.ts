import type { Preview } from '@storybook/react'
import DocumentationTemplate from './DocumentationTemplate.mdx'
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
      page: DocumentationTemplate,
    },
  },
}

export default preview
