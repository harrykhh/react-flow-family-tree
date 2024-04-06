import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { FamilyTree, FamilyTreeProps } from '.'
import { ReactFlowProvider } from 'reactflow'
import { RawFamilyMember, buildFamilyAndRelations, RawFamilyRelation } from './utils'
import 'reactflow/dist/style.css'

import rawFamily from '../../tests/family1.json'

export default {
  title: 'FamilyTree/FamilyTree',
  component: FamilyTree,
} as Meta

// Prepare a Template component
const Template: StoryFn<FamilyTreeProps> = (args) => (
  <>
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlowProvider>
        <FamilyTree {...args} />
      </ReactFlowProvider>
    </div>
  </>
)

// Prepare the data
const [familyMembersRecord, familyRelationsRecord] = buildFamilyAndRelations(
  rawFamily.familyMembers as RawFamilyMember[],
  rawFamily.familyRelations as RawFamilyRelation[],
)
const rootMember = familyMembersRecord['0']

// Create a story for the default view
export const Default = Template.bind({})

Default.args = {
  familyMembers: familyMembersRecord,
  familyRelations: familyRelationsRecord,
  rootMember: rootMember,
}
