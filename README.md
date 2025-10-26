# React Flow Family Tree

This project is a React component library for creating family trees using [React flow](https://github.com/xyflow/xyflow).

![Sample Family Tree](src/test/image.png)

[Sample Family Tree Data JSON](src/test/family.json)

---

## Features

1. The Family Tree **automatically arranges** families based on with inner family advantages.
2. **Support for Complex Couples** - Handle complex family structures such as divorces, shared kids, and other intricate relationships.
3. **Maintained Generations** - Generations are visually maintained, providing a clear distinction between different family layers.
4. **Color-Coded Family Edges** - Each family edge is assigned a unique color, helping you distinguish between different branches of your family.
5. **Non-Colliding Edges with Offset** - To enhance the clarity of your family tree, edges are arranged to avoid collisions.
6. **Portrait Image support** - Include images to personalize your family tree.
7. Very configurable

## Installation

1. To install the library, use npm or pnpm:

```bash
npm i reactflow-family-tree
pnpm add reactflow-family-tree
```

## Usage

1. Here is a basic example of how to use the `reactflow-family-tree` component:

```tsx
import FamilyTree from 'reactflow-family-tree'
import { RawFamilyMember, buildFamilyAndRelations, RawFamilyRelation } from 'reactflow-family-tree'
const App = () => {
  const familyData = {
    familyMembers: [
      {
        id: '1',
        data: {
          title: 'John Doe',
          titleBgColor: 'rgb(0, 0, 128)',
          titleTextColor: 'white',
          subtitles: ['Born: January 15, 1970'],
          sex: 'M',
          badges: [{ label: 'Father', bgColor: 'rgb(218, 165, 32)', textColor: 'white' }],
        },
      },
      {
        id: '2',
        data: {
          title: 'Jane Smith',
          titleBgColor: 'rgb(128, 0, 32)',
          titleTextColor: 'white',
          subtitles: ['Born: March 22, 1972'],
          sex: 'F',
          badges: [{ label: 'Mother', bgColor: 'rgb(218, 165, 32)', textColor: 'white' }],
        },
      },
      {
        id: '3',
        data: {
          title: 'Alice Doe',
          titleBgColor: 'rgb(128, 0, 32)',
          titleTextColor: 'white',
          subtitles: ['Born: June 5, 1995'],
          sex: 'F',
          badges: [{ label: 'Daughter', bgColor: 'rgb(218, 165, 32)', textColor: 'white' }],
        },
      },
      {
        id: '4',
        data: {
          title: 'Bob Doe',
          titleBgColor: 'rgb(0, 0, 128)',
          titleTextColor: 'white',
          subtitles: ['Born: August 12, 1997'],
          sex: 'M',
          badges: [{ label: 'Son', bgColor: 'rgb(218, 165, 32)', textColor: 'white' }],
        },
      },
    ],
    familyRelations: [
      {
        relationType: 'Partner',
        prettyType: 'Spouse',
        fromId: '1',
        toId: '2',
        isInnerFamily: true,
      },
      {
        relationType: 'Parent',
        prettyType: 'Father',
        fromId: '1',
        toId: '3',
        isInnerFamily: true,
      },
      {
        relationType: 'Parent',
        prettyType: 'Mother',
        fromId: '2',
        toId: '3',
        isInnerFamily: true,
      },
      {
        relationType: 'Parent',
        prettyType: 'Father',
        fromId: '1',
        toId: '4',
        isInnerFamily: true,
      },
      {
        relationType: 'Parent',
        prettyType: 'Mother',
        fromId: '2',
        toId: '4',
        isInnerFamily: true,
      },
      {
        relationType: 'Sibling',
        prettyType: 'Sister',
        fromId: '3',
        toId: '4',
        isInnerFamily: true,
      },
    ],
  }
  // Prepare the data
  const [familyMembersRecord, familyRelationsRecord] = buildFamilyAndRelations(
    familyData.familyMembers as RawFamilyMember[],
    familyData.familyRelations as RawFamilyRelation[],
  )
  const rootMember = familyMembersRecord['4']
  return (
    <FamilyTree familyMembers={familyMembersRecord} familyRelations={familyRelationsRecord} rootMember={rootMember} />
  )
}

export default App
```

## Getting Started for Development

1. Clone the repository:

```bash
git clone https://github.com/harrykhh/react-flow-family-tree.git
```

2. Install dependencies:

```bash
cd family-tree-react-flow
pnpm install
```

Start the development server (using vite):

```bash
pnpm dev
```

## Contributing

If you find issues or have suggestions for improvements, please open an issue or submit a pull request. Your contributions are highly valued!

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

Happy family tree mapping! 🌳
