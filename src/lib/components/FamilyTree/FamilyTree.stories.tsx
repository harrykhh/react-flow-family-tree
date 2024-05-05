import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { FamilyTree, FamilyTreeProps } from '.'
import { RawFamilyMember, buildFamilyAndRelations, RawFamilyRelation } from '../utils'

import rawFamily from '../../../test/family1.json'

export default {
  title: 'Components/FamilyTree',
  component: FamilyTree,
  tags: ['autodocs'],
} as Meta

// Prepare a Template component
const Template: StoryFn<FamilyTreeProps> = (args) => <FamilyTree {...args} />

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
